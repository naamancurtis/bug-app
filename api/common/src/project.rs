use dynomite::{FromAttributes, Item};
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Serialize, Debug, Clone, Default, Item)]
pub struct Project {
    #[dynomite(partition_key)]
    #[dynomite(rename = "projectId")]
    #[serde(rename = "projectId")]
    pub project_id: String,
    #[dynomite(sort_key)]
    #[dynomite(rename = "bugId")]
    #[serde(rename = "bugId")]
    pub bug_id: u32,
    pub name: String,
}

#[derive(Deserialize, Serialize, Debug, Clone, Default)]
pub struct CreateNewProjectRequest {
    #[serde(rename = "projectId")]
    pub project_id: String,
    pub name: String,
}

impl From<CreateNewProjectRequest> for Project {
    fn from(p: CreateNewProjectRequest) -> Project {
        Project {
            project_id: p.project_id,
            bug_id: 0,
            name: p.name,
        }
    }
}
