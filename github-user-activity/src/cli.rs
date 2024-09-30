pub mod cli {
    use clap::Parser;

    #[derive(Parser, Debug)]
    pub struct Cli {
        username: String,
    }

    impl Cli {
        pub fn new() -> Cli {
            self::Cli::parse()
        }

        pub fn get_username() -> String {
            self::Cli::new().username
        }
    }
}
