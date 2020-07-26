import { Bug } from "./bug";

export interface Project {
  id: string;
  name: string;
  members: string[];
  bugs: Bug[]
}

export function CreateProject() {
  const project: Project = {
    id: '',
    name: '',
    members: ['ROOT USER'],
    bugs: []
  };

  return project;
}
