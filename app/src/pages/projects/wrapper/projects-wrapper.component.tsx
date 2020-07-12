import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { myProjectsState } from '../projects.state';
import { Wrapper } from './projects-wrapper.styles';
import ProjectCard from '../../../molecules/project-card/project-card.component';
import { Project } from '../../../models/project';

type Props = {};

const ProjectsWrapper: FC<Props> = () => {
  const projects: Project[] = useRecoilValue(myProjectsState);

  return (
    <Wrapper>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </Wrapper>
  );
};

export default ProjectsWrapper;
