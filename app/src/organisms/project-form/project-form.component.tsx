import React, { FC } from 'react';
import { Wrapper, Button } from './project-form.styles';
import { Project } from '../../models/project';
import FormInput from '../../atoms/inline-form-input/inline-form-input.component';
import { InputTypes } from '../../atoms/inline-form-input/inline-form-input.types';
import { Form } from '../../models/form';
import { ButtonIcons } from '../../atoms/button/button.component';

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

type Props = {
  project: Project;
  submitForm: () => void;
  updateProject: (key: keyof Project, value: any) => void;
};

type ProjectValue = Project[keyof Project];

const ProjectForm: FC<Props> = ({ project, submitForm, updateProject }) => {
  const getValue = (key: keyof Project): ProjectValue => {
    return project[key];
  };

  return (
    <Wrapper>
      {form.map((control) => (
        <FormInput
          key={control.key}
          inputKey={control.key}
          labelText={control.labelText}
          type={control.type}
          formValue={getValue(control.key)}
          updateProperty={updateProject}
        />
      ))}
      <Button
        text="Create new project!"
        icon={ButtonIcons.PLUS}
        onClick={submitForm}
      />
    </Wrapper>
  );
};

export default ProjectForm;
