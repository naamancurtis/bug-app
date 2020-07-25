import React, { FC } from 'react';
import EditProjectWrapper from './wrapper/edit-project-wrapper.component';
import ProjectAPI from '../../api/project.api';
import { Project } from '../../models/project';

type Props = {};

const EditProject: FC<Props> = ({}) => {
  const onSubmit = async (project: Project): Promise<void> => {
    const newProject = await ProjectAPI.createNewProject(project);
    console.log(newProject);
  };

  return <EditProjectWrapper onSubmit={onSubmit} />;
};

export default EditProject;
