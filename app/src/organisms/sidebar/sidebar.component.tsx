import React, { FC } from 'react';
import { SideBarWrapper, SideBarBrand, SideBarMenu } from './sidebar.styles';

type Props = {};

const SideBar: FC<Props> = () => {
  return (
    <SideBarWrapper>
      <SideBarBrand>Bug App</SideBarBrand>
      <SideBarMenu>Temp </SideBarMenu>
    </SideBarWrapper>
  );
};

export default SideBar;
