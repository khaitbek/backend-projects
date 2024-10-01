pub mod api {
    use reqwest::{
        header::{HeaderMap, HeaderValue},
        Client, Error,
    };

    pub async fn get_user_info(username: &String) -> Result<String, Error> {
        let client = get_client();
        let headers = get_headers();
        let endpoint = format!("https://api.github.com/users/{username}");
        let response = client
            .get(endpoint)
            .headers(headers)
            .send()
            .await?
            .text()
            .await?;

        Ok(response)
    }

    fn get_client() -> Client {
        reqwest::Client::new()
    }

    fn get_headers() -> HeaderMap {
        let mut headers = HeaderMap::new();
        headers.append(
            "User-Agent",
            HeaderValue::from_str("github-activity-app").unwrap(),
        );
        headers
    }
}
