export type Project = {
  id: string;
  name: string;
  members: string[];
};

export function CreateProject() {
  const project: Project = {
    id: '',
    name: '',
    members: ['ROOT USER'],
  };

  return project;
}
