use std::{
    fs::File,
    io::{BufReader, ErrorKind, Write},
};

use clap::Parser;
use rand::prelude::*;
use serde::{Deserialize, Serialize};
use serde_json;

#[derive(Parser)]
struct Cli {
    command: String,
    // add, list, remove
}

#[derive(Debug, Serialize, Deserialize)]
struct Task {
    id: i32,
    title: String,
    completed: bool,
}

static TASKS_FILE_NAME: &str = "tasks.json";

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = Cli::parse();
    let command = args.command;
    match command.as_str() {
        "add" => add_todo(),
        "list" => list_tasks(),
        "remove" => remove_task(),
        _ => panic!("Invalid command was provided!"),
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
        completed: false,
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

fn list_tasks() {
    let tasks = get_all_tasks();

    println!("You have {} tasks: ", tasks.len());

    for task in tasks {
        println!("{}", task.title)
    }
}

fn remove_task() {}

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
