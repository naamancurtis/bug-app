use dynomite::Item;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;

#[derive(Deserialize, Serialize, Debug, Clone, Default, Item)]
pub struct Project {
    #[dynomite(partition_key)]
    pub id: String,
    pub name: String,
    pub members: HashSet<String>,
}

impl Project {
    pub fn new(id: String, name: String) -> Self {
        let mut members = HashSet::new();
        // Todo - Need to add in whoever created this project when integrated with cognito
        // This is to do with the fact that DynamoDB can't have an empty string set.
        members.insert("Root User".to_string());
        Self {
            id,
            name,
            members,
            ..Project::default()
        }
    }
}

#[derive(Deserialize, Serialize, Debug, Clone, Default, Item)]
pub struct ProjectIdentifierWrapper {
    #[dynomite(partition_key)]
    pub id: String,
}

impl ProjectIdentifierWrapper {
    pub fn new(id: String) -> Self {
        Self { id }
    }
}
