import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { myProjectsState } from '../projects.state';
import { CardWrapper, TitleWrapper } from './projects-wrapper.styles';
import ProjectCard from '../../../molecules/project-card/project-card.component';
import { Project } from '../../../models/project';
import { H1Title } from '../../../atoms/typography/typography.component';
import Button from '../../../atoms/button/button.component';

type Props = {};

const ProjectsWrapper: FC<Props> = () => {
  const projects: Project[] = useRecoilValue(myProjectsState);

  return (
    <>
      <TitleWrapper>
        <H1Title>My Projects</H1Title>
        <Button text="Create Project" icon="plus" />
      </TitleWrapper>
      <CardWrapper>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </CardWrapper>
    </>
  );
};

export default ProjectsWrapper;
