import React, { FC } from 'react';
import { Main, Header, Footer, Wrapper } from './layout.styles';

type Props = {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ header, footer, children }) => {
  return (
    <Wrapper>
      <Header>{header}</Header>
      <Main>{children}</Main>
      <Footer>{footer}</Footer>
    </Wrapper>
  );
};

export default Layout;
