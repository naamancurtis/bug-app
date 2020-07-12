import React, { ReactNode } from 'react';
import { GoProject, GoRepo } from 'react-icons/go';
import { AiFillBug } from 'react-icons/ai';

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
    path: '/projects',
    exact: true,
    displayText: 'My Projects',
    icon: <GoRepo />,
    component: () => <div>Projects</div>,
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
