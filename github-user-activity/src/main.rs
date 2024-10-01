mod api;
mod cli;
mod fancy_display;
mod fancy_image;
mod user;

use api::api::parse;
use fancy_display::fancy_display;
use fancy_image::{convert_to_ascii, fetch_image_from_url};
use user::user::User;

use crate::api::api::get_user_info;
use crate::cli::cli::Cli as clap;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args = clap::new();
    let username = args.get_username();

    let response = get_user_info(&username).await?;
    let user = parse::<User>(response).await?;

    // // Fetch the image
    // let img = fetch_image_from_url(&user.get_profile_img())?;

    // // Convert the image to ASCII (choose a width to control the output size)
    // let ascii_art = convert_to_ascii(img, 100);

    // println!("{}", ascii_art);

    fancy_display(&[
        ("Username", user.get_login()),
        ("Name", user.get_name()),
        ("Public Repos", &user.get_public_repos_count().to_string()),
        ("Followers", &user.get_followers_count().to_string()),
        ("Following", &user.get_following_count().to_string()),
        ("Location", user.get_location()),
    ]);

    Ok(())
}
