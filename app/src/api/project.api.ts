import { HttpClient } from './http-client-base.abstract';
import { Project } from '../models/project';
import { AxiosPromise } from 'axios';

export enum UpdateProject {
  AddProjectMember = 'AddProjectMember',
  RemoveProjectMember = 'RemoveProjectMember',
}

type ProjectUpdateObject<T> = {
  update: {
    [key: string]: T;
  };
};

class ProjectApi extends HttpClient {
  public constructor() {
    super(process.env.REACT_APP_API_URL!);
  }

  public createNewProject = (project: Project): AxiosPromise<Project> => {
    return this.client.post<Project>('/projects', project);
  };

  public getProject = (projectId: string): AxiosPromise<Project> => {
    return this.client.get<Project>(`/projects/${projectId}`);
  };

  public getProjects = (): AxiosPromise<Project[]> => {
    return this.client.get<Project[]>('/projects');
  };

  public updateProject<T>(
    projectId: string,
    updateType: UpdateProject,
    updateValue: T,
  ): AxiosPromise<Project> {
    const updateObject: ProjectUpdateObject<T> = {
      update: {
        [updateType]: updateValue,
      },
    };
    return this.client.put(`/projects/${projectId}`, updateObject);
  }

  public deleteProject = (projectId: string): AxiosPromise<void> => {
    return this.client.delete(`/projects/${projectId}`);
  };
}

const instance = new ProjectApi();
Object.freeze(instance);

export default instance;
