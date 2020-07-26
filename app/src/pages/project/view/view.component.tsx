import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { TitleWrapper, Bugs } from './view.styles';
import { Project } from '../../../models/project';
import { H1Title } from '../../../atoms/typography/typography.component';
import { projectState } from '../../../state/project.state';
import BugBar from '../../../molecules/bug-bar/bug-bar.component';

type Props = {};

const ProjectView: FC<Props> = () => {
  const project: Project = useRecoilValue(projectState);

  return (
    <>
      <TitleWrapper>
        <H1Title>{project.name}</H1Title>
      </TitleWrapper>
      <Bugs>
        {project.bugs.map((bug) => (
          <BugBar key={bug.id} bug={bug} />
        ))}
      </Bugs>
    </>
  );
};

export default ProjectView;
