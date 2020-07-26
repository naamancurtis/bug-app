import { atom } from 'recoil';
import { Project, CreateProject } from '../models/project';

export const projectState = atom<Project>({
  key: 'projectState',
  default: CreateProject(),
});

