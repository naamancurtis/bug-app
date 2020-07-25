import { HttpClient } from './http-client-base.abstract';
import { Project } from '../models/project';

class ProjectApi extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_URL!);
  }

  public createNewProject = (project: Project) => {
    return this.client.post<Project>('/projects', project);
  };

  public getProjects = () => {
    return this.client.get<Project[]>('/projects');
  };
}

const instance = new ProjectApi();
Object.freeze(instance);

export default instance;
