import React, { FC } from 'react';
import { Wrapper, Footer } from './layout.styles';
import { Switch, Route } from 'react-router-dom';

import routes from '../data/routes';

type Props = {};

const Layout: FC<Props> = () => {
  return (
    <Wrapper>
      <Switch>
        {routes.map((route, _) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            children={route.component}
          />
        ))}
      </Switch>
      <Footer />
    </Wrapper>
  );
};

export default Layout;
