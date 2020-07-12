import React from 'react';
import useDarkMode from './hooks/use-theme.hooks';
import GlobalStyles from './styles/global-styles';
import { Themes, darkTheme, lightTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import Layout from './templates/layout.component';
import SideBar from './organisms/sidebar/sidebar.component';
import { BrowserRouter } from 'react-router-dom';
import { AppWrapper } from './app.styles';

const App = () => {
  const [theme, toggleTheme, mountedComponent] = useDarkMode();
  const themeMode = theme === Themes.DARK ? darkTheme : lightTheme;

  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <BrowserRouter>
        <AppWrapper>
          <SideBar />
          <Layout children={<div />} />
        </AppWrapper>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
