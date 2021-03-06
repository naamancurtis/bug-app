import React, { ReactNode } from 'react';
import { GoProject, GoRepo } from 'react-icons/go';
import { AiFillBug } from 'react-icons/ai';
import Projects from '../pages/projects/projects.component';
import Project from '../pages/project/project.component';
import EditProject from '../pages/edit-project/edit-project.component';

export type Route = {
  path: string;
  exact: boolean;
  displayText: string;
  component: ReactNode;
  icon?: ReactNode;
  displayInMenu?: boolean;
};

const routes: Route[] = [
  {
    path: '/project/:projectId',
    exact: true,
    displayText: 'Project',
    component: () => <Project />,
    displayInMenu: false,
  },
  {
    path: '/projects/new',
    exact: true,
    displayText: 'Project',
    component: () => <EditProject />,
    displayInMenu: false,
  },
  {
    path: '/projects',
    exact: true,
    displayText: 'My Projects',
    icon: <GoRepo />,
    component: () => <Projects />,
    displayInMenu: true,
  },
  {
    path: '/bugs',
    exact: true,
    displayText: 'My Bugs',
    icon: <AiFillBug />,
    component: () => <div>Bugs</div>,
    displayInMenu: true,
  },
  {
    path: '/kanban',
    exact: true,
    displayText: 'Kanban',
    icon: <GoProject />,
    component: () => <div>Kanban</div>,
    displayInMenu: true,
  },
  {
    path: '',
    exact: true,
    displayText: 'Home',
    icon: <GoRepo />,
    component: () => <div>Home</div>,
    displayInMenu: false,
  },
];

export default routes;
