import React, { ReactNode } from 'react';
import { GoProject } from 'react-icons/go';
import { AiFillBug } from 'react-icons/ai';

export type Route = {
  path: string;
  exact: boolean;
  displayText: string;
  icon: ReactNode;
};

const routes: Route[] = [
  {
    path: 'projects',
    exact: true,
    displayText: 'Projects',
    icon: <GoProject />,
  },
  {
    path: 'bugs',
    exact: true,
    displayText: 'Bugs',
    icon: <AiFillBug />,
  },
];

export default routes;
