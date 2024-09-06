use clap::Parser;

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
        status: Option<task::status::Status>,
    },
    REMOVE {
        #[clap(short, long, action)]
        status: Option<task::status::Status>,
        #[clap(short, long, action)]
        id: Option<u32>,
    },
    UPDATE {
        #[clap(short, long, action)]
        status: Option<task::status::Status>,

        #[clap(short, long, action)]
        title: Option<String>,

        id: u32,
    },
}

mod task {
    use serde::{Deserialize, Serialize};
    use status::Status;
    use std::fs::File;
    use std::io::{BufReader, Write};

    static TASKS_FILE_NAME: &str = "tasks.json";

    #[derive(Debug, Serialize, Deserialize, Clone)]
    pub struct Task {
        id: u32,
        title: String,
        status: status::Status,
        created_at: String,
        updated_at: Option<String>,
    }

    pub fn new(title: &String) {
        // get all tasks from the json file
        let mut tasks = get_from_file();

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
        let tasks = serde_json::to_string(&tasks).unwrap_or_else(|err| {
            panic!("Error while converting the tasks vector to JSON: {err:?}")
        });

        // get the json file in write mode
        let mut file = get_file(true);

        // write the tasks vector as a JSON to the json file
        file.write(tasks.as_bytes()).unwrap_or_else(|err| {
            panic!(
                "Error while writing the tasks vector content to the {TASKS_FILE_NAME} file: {err:?}"
            )
        });
        println!("Successfully added!");
    }

    pub fn list(status: Option<Status>) {
        let tasks: Vec<Task>;
        let display_message: String;

        match status {
            Some(status) => {
                tasks = get_from_file()
                    .into_iter()
                    .filter(|task| task.status == status)
                    .collect();
                display_message = format!("You have {} {} tasks", tasks.len(), status)
            }
            _ => {
                tasks = get_from_file();
                display_message = format!("You have {} tasks", tasks.len())
            }
        }

        println!("{display_message}");

        for task in tasks {
            println!("{}", task.title)
        }
    }

    pub fn update(status: Option<status::Status>, title: Option<String>, id: u32) {
        let tasks = get_from_file().into_iter();
        let task = match tasks.clone().find(|task| task.id == id) {
            Some(task) => task,
            None => panic!("Couldn't find a task with the given id: {id}"),
        };
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
        let mut file = get_file(true);
        file.write(json.as_bytes()).unwrap_or_else(|err| {
            panic!("Error while writing tasks json to the {TASKS_FILE_NAME} file: {err:?}")
        });
    }

    pub fn remove_task(status: Option<Status>, id: Option<u32>) {
        let tasks: Vec<Task>;
        let display_message: String;

        match status {
            Some(status) => {
                tasks = get_from_file()
                    .into_iter()
                    .filter(|task| task.status != status)
                    .collect();
                display_message = format!("Removed tasks that are {}", status)
            }
            _ => match id {
                Some(task_id) => {
                    tasks = get_from_file()
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
        let mut file = get_file(true);
        file.write(json.as_bytes()).unwrap_or_else(|err| {
            panic!("Error while writing tasks json to the {TASKS_FILE_NAME} file: {err:?}")
        });

        println!("{display_message}");
    }

    fn generate_random_id() -> u32 {
        crate::randid::new()
    }

    fn get_current_date() -> String {
        crate::date::now()
    }

    fn get_from_file() -> Vec<Task> {
        let file_content = read_file_content(false);
        let tasks: Vec<Task> = serde_json::from_reader(file_content).unwrap_or_else(|err| {
            panic!("Couldn't convert the contents of the file to a vector of tasks: {err:?}")
        });

        tasks
    }

    fn read_file_content(should_open_in_write_mode: bool) -> BufReader<File> {
        let file = get_file(should_open_in_write_mode);

        let reader = BufReader::new(file);

        reader
    }

    fn get_file(should_open_in_write_mode: bool) -> File {
        let file: File;

        if should_open_in_write_mode {
            file = File::create(TASKS_FILE_NAME)
                .unwrap_or_else(|err| panic!("Failed to open the file: {err:?}"))
        } else {
            file = File::open(TASKS_FILE_NAME)
                .unwrap_or_else(|err| panic!("Failed to open the file: {err:?}"))
        }

        file
    }

    pub mod status {
        use clap::ValueEnum;
        use core::fmt;
        use serde::{Deserialize, Serialize};

        #[derive(Debug, Serialize, Deserialize, Clone, ValueEnum, PartialEq)]
        pub enum Status {
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
    }
}

mod date {
    use chrono::prelude::*;

    pub fn now() -> String {
        Utc::now().format("%Y-%m-%d").to_string()
    }
}

mod randid {
    use rand::prelude::*;
    pub fn new() -> u32 {
        let mut rng = rand::thread_rng();
        rng.gen::<u32>()
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Cli::parse();
    let command = &args.command;
    match command {
        Command::ADD { title } => task::new(title),
        Command::LIST { status } => task::list(status.to_owned()),
        Command::REMOVE { status, id } => task::remove_task(status.to_owned(), id.to_owned()),
        Command::UPDATE { status, title, id } => {
            task::update(status.to_owned(), title.to_owned(), id.to_owned())
        }
    };

    Ok(())
}
