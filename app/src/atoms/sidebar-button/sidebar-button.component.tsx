import React, { FC } from 'react';
import { Link, Icon, ButtonLabel, Circle } from './sidebar-button.styles';

interface Props {
  text: string;
  icon: React.ReactNode;
  to: string;
}

const SideBarButton: FC<Props> = ({ text, icon, to }) => (
  <Link to={to}>
    <Circle>
      <Icon>{icon}</Icon>
      <ButtonLabel>{text}</ButtonLabel>
    </Circle>
  </Link>
);

export default SideBarButton;
