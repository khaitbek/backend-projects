mod api;
mod cli;
mod user;

use crate::api::api::get_user_info;
use crate::cli::cli::Cli as clap;

#[tokio::main]
async fn main() {
    let args = clap::new();
    let username = args.get_username();

    println!("Fetching info for the user: {username}");

    // fetch user data
    let response = get_user_info(&username).await;

    println!("Response is: {:?}", response);
    match response {
        Ok(res) => {

        },
        Err(err) => {
            panic!("Error fetching data for the user: {username}");
        }
    }
}
