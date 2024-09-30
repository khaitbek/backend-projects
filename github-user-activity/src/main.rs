mod cli;

use crate::cli::cli::Cli as clap;

fn main() {
    println!("Hello, world!");
    let args = clap::new();
    println!("Your username is: {}", clap::get_username())
}
