use chrono::prelude::*;
use clap::{Parser, ValueEnum};
use core::fmt;
use rand::prelude::*;
use serde::{Deserialize, Serialize};
use serde_json;
use std::{
    fs::File,
    io::{BufReader,  ErrorKind, Write},
};

#[derive(Parser, Debug)]
struct Cli {
    #[clap(subcommand)]
    command: Command,
}

#[derive(Debug, clap::Subcommand)]
enum Command {
    ADD {
        title: String,
    },
    LIST {
        #[clap(short, long, action)]
        status: Option<Status>,
    },
    REMOVE {
        #[clap(short, long, action)]
        status: Option<Status>,
        #[clap(short, long, action)]
        id: Option<u32>,
    },
    UPDATE {
        #[clap(short, long, action)]
        status: Option<Status>,

        #[clap(short, long, action)]
        title: Option<String>,

        id: u32,
    },
}

#[derive(Debug, Serialize, Deserialize, Clone)]
struct Task {
    id: u32,
    title: String,
    status: Status,
    created_at: String,
    updated_at: Option<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone, ValueEnum, PartialEq)]
enum Status {
    InProgress,
    TODO,
    DONE,
}
impl fmt::Display for Status {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        let str = match self {
            Status::DONE => "done",
            Status::InProgress => "in progress",
            Status::TODO => "todo",
        };

        write!(f, "{}", str.to_string())
    }
}

static TASKS_FILE_NAME: &str = "tasks.json";

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Cli::parse();
    let command = &args.command;
    match command {
        Command::ADD { title } => add_task(title),
        Command::LIST { status } => list_tasks(status.to_owned()),
        Command::REMOVE { status, id } => remove_task(status.to_owned(), id.to_owned()),
        Command::UPDATE { status, title, id } => {
            update_task(status.to_owned(), title.to_owned(), id.to_owned())
        }
    };

    Ok(())
}

fn update_task(status: Option<Status>, title: Option<String>, id: u32) {
    let tasks = get_all_tasks().into_iter();
    let task = tasks.clone().find(|task| task.id == id).unwrap();
    let mut tasks: Vec<Task> = tasks.filter(|task| task.id != id).collect();
    let new_task = Task {
        id: task.clone().id,
        created_at: task.clone().created_at,
        status: if let Some(status) = status {
            status
        } else {
            task.clone().status
        },
        title: if let Some(title) = title {
            title
        } else {
            task.clone().title
        },
        updated_at: Some(get_current_date()),
    };
    tasks.push(new_task);
    let json = serde_json::to_string(&tasks)
        .unwrap_or_else(|err| panic!("Error while converting tasks to json: {err:?}"));
    let mut file = read_tasks_file(true);
    file.write(json.as_bytes()).unwrap_or_else(|err| {
        panic!("Error while writing tasks json to the {TASKS_FILE_NAME} file: {err:?}")
    });
}

// fn find_task_by_id(tasks: &Vec<Task>, id: u32) -> Result<&Task, std::io::Error> {
//     match tasks.into_iter().find(|task| task.id == id) {
//         Some(task) => Ok(task),
//         None => Err(Error::new(
//             ErrorKind::NotFound,
//             "Couldn't find a task with the given id: {id}",
//         )),
//     }
// }

fn add_task(title: &String) {
    // get all tasks from the json file
    let mut tasks = get_all_tasks();

    // create a new task
    let new_task = Task {
        id: generate_random_id(),
        title: title.trim().to_string(),
        created_at: get_current_date(),
        status: Status::TODO,
        updated_at: None,
    };

    // add the task to the todos vector
    tasks.push(new_task);

    // convert the todos vector to json
    let tasks = serde_json::to_string(&tasks)
        .unwrap_or_else(|err| panic!("Error while converting the tasks vector to JSON: {err:?}"));

    // get the json file in write mode
    let mut file = read_tasks_file(true);

    // write the tasks vector as a JSON to the json file
    file.write(tasks.as_bytes()).unwrap_or_else(|err| {
        panic!(
            "Error while writing the tasks vector content to the {TASKS_FILE_NAME} file: {err:?}"
        )
    });
    println!("Successfully added!");
}

fn generate_random_id() -> u32 {
    let mut rng = rand::thread_rng();

    rng.gen::<u32>()
}

fn list_tasks(status: Option<Status>) {
    let tasks: Vec<Task>;
    let display_message: String;

    match status {
        Some(status) => {
            tasks = get_all_tasks()
                .into_iter()
                .filter(|task| task.status == status)
                .collect();
            display_message = format!("You have {} {} tasks", tasks.len(), status)
        }
        _ => {
            tasks = get_all_tasks();
            display_message = format!("You have {} tasks", tasks.len())
        }
    }

    println!("{display_message}");

    for task in tasks {
        println!("{}", task.title)
    }
}

fn remove_task(status: Option<Status>, id: Option<u32>) {
    let tasks: Vec<Task>;
    let display_message: String;

    match status {
        Some(status) => {
            tasks = get_all_tasks()
                .into_iter()
                .filter(|task| task.status != status)
                .collect();
            display_message = format!("Removed tasks that are {}", status)
        }
        _ => match id {
            Some(task_id) => {
                tasks = get_all_tasks()
                    .into_iter()
                    .filter(|task| task.id != task_id)
                    .collect();
                display_message = format!("Removed 1 task with the id of: {task_id}");
            }
            _ => {
                tasks = vec![];
                display_message = format!("Removed all tasks");
            }
        },
    }

    let json = serde_json::to_string(&tasks)
        .unwrap_or_else(|err| panic!("Error while converting tasks to json: {err:?}"));
    let mut file = read_tasks_file(true);
    file.write(json.as_bytes()).unwrap_or_else(|err| {
        panic!("Error while writing tasks json to the {TASKS_FILE_NAME} file: {err:?}")
    });

    println!("{display_message}");
}

fn get_all_tasks() -> Vec<Task> {
    let file = read_tasks_file(false);

    let reader = BufReader::new(file);

    let tasks: Vec<Task> = serde_json::from_reader(reader).unwrap_or_else(|err| {
        panic!(
            "Error while converting the contents of the {TASKS_FILE_NAME} file into JSON: {err:?}"
        )
    });

    tasks
}

fn read_tasks_file(should_open_in_write_mode: bool) -> File {
    let file: File;

    if should_open_in_write_mode {
        file = File::create(TASKS_FILE_NAME).unwrap_or_else(|err| {
            panic!("Error while reading the contents of the {TASKS_FILE_NAME} file: {err:?}")
        });
    } else {
        file = File::open(TASKS_FILE_NAME).unwrap_or_else(|err| {
            if err.kind() == ErrorKind::NotFound {
                File::create(TASKS_FILE_NAME).unwrap_or_else(|err| {
                    panic!("Error while creating the {TASKS_FILE_NAME} file: {err:?}")
                })
            } else {
                panic!("Error while opening the {TASKS_FILE_NAME} file: {err:?}")
            }
        })
    }

    file
}

fn get_current_date() -> String {
    Utc::now().format("%Y-%m-%d").to_string()
}
