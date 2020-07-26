import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { TitleWrapper } from './view.styles';
import { Project } from '../../../models/project';
import { H1Title } from '../../../atoms/typography/typography.component';
import { projectState } from '../../../state/project.state';

type Props = {};

const ProjectView: FC<Props> = () => {
  const project: Project = useRecoilValue(projectState);

  return (
    <>
      <TitleWrapper>
        <H1Title>{project.name}</H1Title>
      </TitleWrapper>
    </>
  );
};

export default ProjectView;
