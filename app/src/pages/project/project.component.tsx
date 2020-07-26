import React, { FC, useEffect } from 'react';
import View from './view/view.component';
import ProjectAPI from '../../api/project.api';
import { Project } from '../../models/project';
import { useSetRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { projectState } from '../../state/project.state';

type Props = {};

const ProjectComponent: FC<Props> = () => {
  const setProject = useSetRecoilState(projectState);
  const { projectId } = useParams();

  // Fetch Data
  useEffect(() => {
    (async function () {
      const project: Project = await ProjectAPI.getProject(projectId);
      setProject(project);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <View />;
};

export default ProjectComponent;
