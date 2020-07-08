import React, { FC } from 'react';
import { Main, SideBar, Footer, Wrapper } from './layout.styles';

type Props = {
  sidebar: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ sidebar, footer, children }) => {
  return (
    <Wrapper>
      <SideBar>{sidebar}</SideBar>
      <Main>{children}</Main>
      <Footer>{footer}</Footer>
    </Wrapper>
  );
};

export default Layout;
