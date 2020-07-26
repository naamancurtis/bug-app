import React, { useEffect, FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { projectsOverViewState } from '../../state/projects.state';
import View from './view/view.component';
import ProjectAPI from '../../api/project.api';
import { Project } from '../../models/project';

type Props = {};

const Projects: FC<Props> = () => {
  const setProjects = useSetRecoilState(projectsOverViewState);

  // Fetch Data
  useEffect(() => {
    (async function () {
      const projects: Project[] = await ProjectAPI.getProjects();
      setProjects(projects);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <View />;
};

export default Projects;
