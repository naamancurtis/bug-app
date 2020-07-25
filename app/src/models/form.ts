import { InputTypes } from '../atoms/inline-form-input/inline-form-input.types';
import { Project } from './project';

export type FormTypes = Project;

export type Form<M extends FormTypes> = {
  key: keyof M;
  labelText: string;
  type: InputTypes;
};
