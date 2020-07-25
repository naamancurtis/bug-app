import React, { FC, useState } from 'react';
import { CreateProject, Project } from '../../../models/project';
import { H1Title } from '../../../atoms/typography/typography.component';
import { TitleWrapper, FormWrapper } from './edit-project-wrapper.styles';
import Form from '../../../organisms/form/form.component';
import ProjectForm from '../../../forms/project.form';

type Props = {
  onSubmit(project: Project): void;
};

const EditProjectWrapper: FC<Props> = ({ onSubmit }) => {
  const [project, setProject] = useState<Project>(CreateProject());

  const updateProject = (key: keyof Project, value: any): void => {
    setProject({
      ...project,
      [key]: value,
    });
  };

  const submitForm = () => {
    onSubmit(project);
  };

  return (
    <>
      <TitleWrapper>
        <H1Title>Create New Project</H1Title>
      </TitleWrapper>
      <FormWrapper>
        <Form
          data={project}
          form={ProjectForm}
          submitForm={submitForm}
          updateForm={updateProject}
          showButton={true}
        />
      </FormWrapper>
    </>
  );
};

export default EditProjectWrapper;
