import React, { useEffect, FC } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { myProjectsState } from './projects.state';
import ProjectsWrapper from './wrapper/projects-wrapper.component';

type Props = {};

const Projects: FC<Props> = () => {
  const setProjects = useSetRecoilState(myProjectsState);

  // Fetch Data
  useEffect(() => {
    (async function () {
      const result = await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URL}/projects`,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (result.status === 200) {
        setProjects(result.data);
      }
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <ProjectsWrapper />;
};

export default Projects;
