pub mod user {
    use serde::{Deserialize, Serialize};
    #[derive(Debug, Deserialize, Serialize)]
    pub struct User {
        name: String,
        location: Option<String>,
        followers: u128,
        following: u128,
        created_at: String,
        login: String,
        avatar_url: String,
        id: u128,
        public_repos: u32,
    }

    impl User {
        pub fn new(user: User) -> User {
            User {
                created_at: user.created_at,
                followers: user.followers,
                following: user.following,
                id: user.id,
                location: user.location,
                login: user.login,
                name: user.name,
                public_repos: user.public_repos,
                avatar_url: user.avatar_url
            }
        }

        pub fn get_id(&self) -> u128 {
            self.id
        }

        pub fn get_profile_img(&self) -> &String {
            &self.avatar_url
        }

        pub fn get_name(&self) -> &String {
            &self.name
        }

        pub fn get_login(&self) -> &String {
            &self.login
        }

        pub fn get_location(&self) -> String {
            match &self.location {
                Some(location) => {
                    location.clone()
                }
                _ => {
                    String::from("Unknown")
                }
            }
        }

        pub fn get_created_date(&self) -> &String {
            &self.created_at
        }

        pub fn get_followers_count(&self) -> u128 {
            self.followers
        }
        pub fn get_following_count(&self) -> u128 {
            self.following
        }

        pub fn get_public_repos_count(&self) -> u32 {
            self.public_repos
        }
    }
}
