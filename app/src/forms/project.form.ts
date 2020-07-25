import { InputTypes } from '../atoms/inline-form-input/inline-form-input.types';
import { Form } from '../models/form';
import { Project } from '../models/project';

const form: Form<Project>[] = [
  {
    key: 'name',
    labelText: 'Project Name',
    type: InputTypes.TEXT,
  },
  {
    key: 'id',
    labelText: 'Project ID',
    type: InputTypes.TEXT,
  },
];

export default form;
