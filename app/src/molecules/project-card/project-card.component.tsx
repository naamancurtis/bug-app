import React, { FC } from 'react';
import {
  ProjectCardWrapper,
  CardTitle,
  CardCode,
  CardDescription,
} from './project-card.styles';
import { Project } from '../../models/project';
import { useHistory } from 'react-router-dom';

type Props = {
  project: Project;
};

const ProjectCard: FC<Props> = ({ project }) => {
  const history = useHistory();

  const handleClick = () => {
    history.push(`project/${project.id}`);
  };

  return (
    <ProjectCardWrapper onClick={handleClick}>
      <CardTitle>{project.name}</CardTitle>
      <CardCode>{project.id}</CardCode>
      <CardDescription />
    </ProjectCardWrapper>
  );
};

export default ProjectCard;
