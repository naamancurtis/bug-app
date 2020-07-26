import { atom } from 'recoil';
import { Project } from '../models/project';

export const projectsOverViewState = atom<Project[]>({
  key: 'projectsOverviewState',
  default: [],
});
