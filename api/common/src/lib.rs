pub mod project;

use serde::{Deserialize, Serialize};
use serde_json::Value;
use std::collections::HashMap;

// #[derive(Debug, Clone, Serialize, Deserialize)]
// pub struct Response {
//     #[serde(rename = "isBase64Encoded")]
//     is_base64_encoded: bool,
//     #[serde(rename = "statusCode")]
//     status_code: u16,
//     header: HashMap<String, String>,
//     body: String,
// }

// pub struct LambdaResponseBuilder<T> {
//     status_code: u16,
//     header: HashMap<String, String>,
//     body: T,
// }

// impl<T> LambdaResponseBuilder<T>
// where
//     T: Serialize,
// {
//     pub fn new(body: T) -> Self {
//         let mut header = HashMap::new();
//         header.insert("Content-Type".to_string(), "application/json".to_string());
//         Self {
//             status_code: 200,
//             header,
//             body,
//         }
//     }

//     pub fn with_status(mut self, status_code: u16) -> Self {
//         self.status_code = status_code;
//         self
//     }

//     pub fn add_header(mut self, key: String, value: String) -> Self {
//         self.header.insert(key, value);
//         self
//     }

//     pub fn build(self) -> Response {
//         Response {
//             is_base64_encoded: false,
//             status_code: self.status_code,
//             header: self.header,
//             body: self.body,
//         }
//     }
// }
