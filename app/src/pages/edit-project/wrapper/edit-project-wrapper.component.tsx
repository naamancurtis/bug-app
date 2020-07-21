import React, { FC, useState } from 'react';
import { CreateProject, Project } from '../../../models/project';
import { H1Title } from '../../../atoms/typography/typography.component';
import { TitleWrapper } from './edit-project-wrapper.styles';
import ProjectForm from '../../../organisms/project-form/project-form.component';

type Props = {
  onSubmit(project: Project): void;
};

const EditProjectWrapper: FC<Props> = ({ onSubmit }) => {
  const [project, setProject] = useState(CreateProject());

  return (
    <>
      <TitleWrapper>
        <H1Title>Create New Project</H1Title>
      </TitleWrapper>
      <ProjectForm project={project} />
    </>
  );
};

export default EditProjectWrapper;
