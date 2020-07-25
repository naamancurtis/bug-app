import React, { useEffect, FC } from 'react';
import { useSetRecoilState } from 'recoil';
import { myProjectsState } from './projects.state';
import ProjectsWrapper from './wrapper/projects-wrapper.component';
import ProjectAPI from '../../api/project.api';
import { Project } from '../../models/project';

type Props = {};

const Projects: FC<Props> = () => {
  const setProjects = useSetRecoilState(myProjectsState);

  // Fetch Data
  useEffect(() => {
    (async function () {
      const projects: Project[] = await ProjectAPI.getProjects();
      setProjects(projects);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <ProjectsWrapper />;
};

export default Projects;
