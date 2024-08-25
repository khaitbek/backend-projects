use std::io::Write;

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
    println!("Enter the task name");
    match std::io::stdin().read_line(&mut task_name) {
        Ok(_) => {
            if task_name.trim().len() > 0 {
                let mut rng = rand::thread_rng();
                let new_task = Task {
                    completed: false,
                    id: rng.gen::<i32>(),
                    title: task_name.trim().to_string(),
                };

                let new_task_to_json = serde_json::to_string(&new_task);

                match new_task_to_json {
                    Ok(task) => {
                        match std::fs::read_to_string("tasks.json") {
                            Ok(content) => {
                                let content_to_json: Result<Vec<Task>, serde_json::Error> =
                                    serde_json::from_str(&content);
                                match content_to_json {
                                    Ok(mut tasks) => {
                                        tasks.push(new_task);
                                        let tasks_to_json = serde_json::to_string(&tasks).unwrap();
                                        let mut file = std::fs::File::create("tasks.json").unwrap();
                                        file.write(tasks_to_json.as_bytes()).unwrap();
                                    }
                                    Err(err) => {
                                        println!("Error while converting the tasks.json file content to a vector of tasks: {}", err)
                                    }
                                }
                            }
                            Err(err) => {
                                println!("Error while reading the tasks.json file: {}", err)
                            }
                        }
                        println!("New task: {}", task)
                    }
                    Err(err) => println!("Error occured: {}", err),
                }
            }
        }
        Err(err) => {
            println!("Error: {}", err);
        }
    }
}

fn list_todo() {}

fn remove_todo() {}
