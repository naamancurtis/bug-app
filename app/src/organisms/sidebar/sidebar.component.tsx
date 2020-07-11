import React, { FC } from 'react';
import {
  SideBarWrapper,
  SideBarBrand,
  SideBarMenu,
  BrandText,
} from './sidebar.styles';
import { AiFillBug } from 'react-icons/ai';

import routes from '../../data/routes';
import SideBarButton from '../../atoms/sidebar-button/sidebar-button.component';

type Props = {};

const SideBar: FC<Props> = () => {
  return (
    <SideBarWrapper>
      <SideBarBrand>
        <AiFillBug style={{ transform: 'rotate(30deg)' }} />
        <BrandText>Bug App </BrandText>
      </SideBarBrand>
      <SideBarMenu>
        {routes.map((route) => (
          <SideBarButton
            key={route.path}
            to={route.path}
            text={route.displayText}
            icon={route.icon}
          />
        ))}
      </SideBarMenu>
    </SideBarWrapper>
  );
};

export default SideBar;
