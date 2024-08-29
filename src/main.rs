use std::{
    fs::File,
    io::{BufReader, ErrorKind, Write},
};

use clap::Parser;
use rand::prelude::*;
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Parser, Debug)]
struct Cli {
    #[clap(subcommand)]
    command: Command,
}

#[derive(Debug, clap::Subcommand)]
enum Command {
    ADD,
    LIST {
        #[clap(short, long, action)]
        completed: Option<bool>,
    },
    REMOVE {
        #[clap(short, long, action)]
        completed: Option<bool>,
        #[clap(short, long, action)]
        id: Option<i32>,
    },
}

#[derive(Debug, Serialize, Deserialize)]
struct Task {
    id: i32,
    title: String,
    completed: Option<bool>,
}

static TASKS_FILE_NAME: &str = "tasks.json";

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Cli::parse();
    let command = &args.command;
    match command {
        Command::ADD => add_todo(),
        Command::LIST { completed } => list_tasks(completed.to_owned()),
        Command::REMOVE { completed, id } => remove_task(completed.to_owned(), id.to_owned()),
    };

    Ok(())
}

fn add_todo() {
    // get the todo name from the user using a prompt
    // and add it to the tasks.json file
    let mut task_name = String::new();

    while task_name.trim().len() == 0 {
        // get the todo name from the user
        println!("Enter the task name");
        std::io::stdin()
            .read_line(&mut task_name)
            .unwrap_or_else(|err| panic!("Error while reading the task name: {err:?}"));
    }

    // get all tasks from the json file
    let mut tasks = get_all_tasks();

    // create a new task
    let new_task = Task {
        completed: Some(false),
        id: generate_random_id(),
        title: task_name.trim().to_string(),
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
}

fn generate_random_id() -> i32 {
    let mut rng = rand::thread_rng();

    rng.gen::<i32>()
}

fn list_tasks(completed: Option<bool>) {
    let tasks: Vec<Task>;
    let display_message: String;
    match completed {
        Some(completed) => {
            tasks = get_all_tasks()
                .into_iter()
                .filter(|task| task.completed == Some(completed))
                .collect();
            display_message = format!(
                "You have {} {} tasks",
                tasks.len(),
                if completed {
                    "completed"
                } else {
                    "uncompleted"
                }
            )
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

fn remove_task(completed: Option<bool>, id: Option<i32>) {
    let tasks: Vec<Task>;
    let display_message: String;

    match completed {
        Some(completed) => {
            tasks = get_all_tasks()
                .into_iter()
                .filter(|task| task.completed != Some(completed))
                .collect();
            display_message = format!(
                "Removed tasks that are {}",
                if completed {
                    "completed"
                } else {
                    "not completed"
                }
            )
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
