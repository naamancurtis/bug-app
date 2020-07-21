import React, { FC } from 'react';
import EditProjectWrapper from './wrapper/edit-project-wrapper.component';
import { Project } from '../../models/project';

type Props = {};

const EditProject: FC<Props> = ({}) => {
  const onSubmit = (project: Project): void => {};

  return <EditProjectWrapper onSubmit={onSubmit} />;
};

export default EditProject;
