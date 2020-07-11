import React from 'react';
import useDarkMode from './hooks/use-theme.hooks';
import GlobalStyles from './styles/global-styles';
import { Themes, darkTheme, lightTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import Layout from './templates/layout.component';
import { Footer } from './templates/layout.styles';
import SideBar from './organisms/sidebar/sidebar.component';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';

const history = createBrowserHistory();

const App = () => {
  const [theme, toggleTheme, mountedComponent] = useDarkMode();
  const themeMode = theme === Themes.DARK ? darkTheme : lightTheme;

  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Router history={history}>
        <SideBar />
        <Layout children={<div />} />
      </Router>
      <Footer />
    </ThemeProvider>
  );
};

export default App;
