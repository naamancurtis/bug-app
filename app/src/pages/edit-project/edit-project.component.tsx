import React, { FC } from 'react';
import View from './view/view.component';
import ProjectAPI from '../../api/project.api';
import { Project } from '../../models/project';
import { useHistory } from 'react-router-dom';

type Props = {};

const EditProject: FC<Props> = () => {
  const history = useHistory();

  const onSubmit = async (project: Project): Promise<void> => {
    const newProject = await ProjectAPI.createNewProject(project);
    history.push(`project/${newProject.id}`);
  };

  return <View onSubmit={onSubmit} />;
};

export default EditProject;
