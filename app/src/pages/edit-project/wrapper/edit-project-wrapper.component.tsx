import React, { FC, useState } from 'react';
import { CreateProject, Project } from '../../../models/project';
import { H1Title } from '../../../atoms/typography/typography.component';
import { TitleWrapper, FormWrapper } from './edit-project-wrapper.styles';
import ProjectForm from '../../../organisms/project-form/project-form.component';

type Props = {
  onSubmit(project: Project): void;
};

const EditProjectWrapper: FC<Props> = ({ onSubmit }) => {
  const [project, setProject] = useState(CreateProject());

  const updateProject = (key: keyof Project, value: any): void => {
    console.log(key, value);
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
        <ProjectForm
          project={project}
          submitForm={submitForm}
          updateProject={updateProject}
        />
      </FormWrapper>
    </>
  );
};

export default EditProjectWrapper;
