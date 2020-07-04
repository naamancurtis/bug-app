use dynomite::{dynamodb::AttributeValue, error::AttributeError, Attribute};
use serde::{Deserialize, Serialize};
use std::fmt;
use std::str;
use std::str::FromStr;

#[derive(Deserialize, Serialize, Debug, Clone, Copy)]
pub enum Status {
    Todo,
    InProgress,
    InReview,
    ReadyToDeploy,
    Deployed,
    Done,
}

impl Default for Status {
    fn default() -> Self {
        Self::Todo
    }
}

impl fmt::Display for Status {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        match *self {
            Status::Todo => write!(f, "Todo"),
            Status::InProgress => write!(f, "InProgress"),
            Status::InReview => write!(f, "InReview"),
            Status::ReadyToDeploy => write!(f, "ReadyToDeploy"),
            Status::Deployed => write!(f, "Deployed"),
            Status::Done => write!(f, "Done"),
        }
    }
}

impl str::FromStr for Status {
    type Err = AttributeError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s.to_lowercase().as_str() {
            "todo" => Ok(Status::Todo),
            "inprogress" => Ok(Status::InProgress),
            "inreview" => Ok(Status::InReview),
            "readytodeploy" => Ok(Status::ReadyToDeploy),
            "deployed" => Ok(Status::Deployed),
            "done" => Ok(Status::Done),
            _ => Err(AttributeError::InvalidType),
        }
    }
}

impl Attribute for Status {
    fn into_attr(self) -> AttributeValue {
        AttributeValue {
            s: Some(self.to_string()),
            ..AttributeValue::default()
        }
    }

    fn from_attr(value: AttributeValue) -> Result<Self, AttributeError> {
        if let Some(status_string) = value.s {
            return Ok(Status::from_str(status_string.as_str())?);
        }
        Err(AttributeError::InvalidType)
    }
}
