pub mod user {
    struct User {
        name: String,
        location: String,
        public_repositories: u32,
        followers: u128,
        following: u128,
        created_at: String,
        login: String,
        id: u128,
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
                public_repositories: user.public_repositories,
            }
        }

        pub fn get_name(self) -> String {
            self.name
        }

        pub fn get_location(self) -> String {
            self.location
        }

        pub fn get_created_date(self) -> String {
            self.created_at
        }

        pub fn get_repositories_count(self) -> u32 {
            self.public_repositories
        }
        pub fn get_followers_count(self) -> u128 {
            self.followers
        }
        pub fn get_following_count(self) -> u128 {
            self.following
        }
    }
}
