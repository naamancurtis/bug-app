import React, { FC } from 'react';
import { Main, Wrapper, Footer } from './layout.styles';
import { Switch, Route } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <Wrapper>
      <Switch>
        <Route path="/">
          <Main>{children}</Main>
        </Route>
      </Switch>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
