import React, { FC, useEffect } from 'react';
import View from './view/view.component';
import ProjectAPI from '../../api/project.api';
import { Project } from '../../models/project';
import { useSetRecoilState } from 'recoil';
import { useParams } from 'react-router-dom';
import { projectState } from '../../state/project.state';
import { Priority } from '../../models/priority';
import { Status } from '../../models/status';

type Props = {};

const ProjectComponent: FC<Props> = () => {
  const setProject = useSetRecoilState(projectState);
  const { projectId } = useParams();

  // Fetch Data
  useEffect(() => {
    (async function () {
      // const project: Project = await ProjectAPI.getProject(projectId);
      // @Todo - delete the below
      const project: Project = {
        id: 'TEMP',
        name: 'Temp Project',
        members: [],
        bugs: [
          {
            projectId: 'TEMP',
            id: '1',
            name: 'Mean Bug',
            description: 'Desc',
            priority: Priority.MEDIUM,
            status: Status.TODO,
          },
        ],
      };
      setProject(project);
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <View />;
};

export default ProjectComponent;
