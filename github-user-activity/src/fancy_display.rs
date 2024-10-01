use colored::*;

enum Value {}

pub fn fancy_display(items: &[(&str, &str)]) {
    println!("{}", "============================".green());
    println!("{}", "      GitHub User Info      ".bold().blue());
    println!("{}", "============================".green());
    for (key, value) in items.into_iter() {
        println!("{}: {}", key.bold().cyan(), value);
    }
    println!("{}", "============================".green());
}
