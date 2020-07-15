import { atom } from 'recoil';
import { Project } from '../../models/project';

export const myProjectsState = atom<Project[]>({
  key: 'myProjectsState',
  default: [],
});
