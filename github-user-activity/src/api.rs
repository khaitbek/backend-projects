pub mod api {
    use reqwest::{
        header::{HeaderMap, HeaderValue},
        Client, Error as RequestError, Response,
    };
    use serde::de::DeserializeOwned;
    use std::error::Error;

    pub async fn get_user_info(username: &String) -> Result<Response, RequestError> {
        let client = get_client();
        let headers = get_headers();
        let endpoint = format!("https://api.github.com/users/{username}");
        let response = client
            .get(endpoint)
            .headers(headers)
            .send()
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

    pub async fn parse<Output>(response: Response) -> Result<Output, Box<dyn Error>>
    where
        Output: DeserializeOwned,
    {
        let text = response.text().await?;
        let out: Output = serde_json::from_str(&text.as_str())?;
        Ok(out)
    }
}
