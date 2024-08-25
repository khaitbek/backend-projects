use std::{
    fs::File,
    io::{BufReader, Write},
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
        "list" => list_todo(),
        "remove" => remove_todo(),
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

    let mut tasks_file = File::create(TASKS_FILE_NAME)
        .unwrap_or_else(|err| panic!("Error while reading the {TASKS_FILE_NAME} file: {err:?}"));

    tasks_file.write(tasks.as_bytes()).unwrap_or_else(|err| {
        panic!(
            "Error while writing the tasks vector content to the {TASKS_FILE_NAME} file: {err:?}"
        )
    });
}

fn generate_random_id() -> i32 {
    let mut rng = rand::thread_rng();

    rng.gen::<i32>()
}

fn list_todo() {}

fn remove_todo() {}

fn get_all_tasks() -> Vec<Task> {
    let tasks_file = File::open(TASKS_FILE_NAME)
        .unwrap_or_else(|err| panic!("Error while reading the {TASKS_FILE_NAME} file: {err:?}"));

    let reader = BufReader::new(tasks_file);

    let tasks: Vec<Task> = serde_json::from_reader(reader).unwrap_or_else(|err| {
        panic!(
            "Error while converting the contents of the {TASKS_FILE_NAME} file into JSON: {err:?}"
        )
    });

    tasks
}
