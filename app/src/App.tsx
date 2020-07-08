import React from 'react';
import useDarkMode from './hooks/use-theme.hooks';
import GlobalStyles from './styles/global-styles';
import { Themes, darkTheme, lightTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import Layout from './templates/layout.component';
import setupFontAwesome from './setup-font-awesome';
import { Footer } from './templates/layout.styles';
import SideBar from './organisms/sidebar/sidebar.component';

setupFontAwesome();

const App = () => {
  const [theme, toggleTheme, mountedComponent] = useDarkMode();
  const themeMode = theme === Themes.DARK ? darkTheme : lightTheme;

  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Layout sidebar={<SideBar />} footer={<Footer />} children={<div />} />
    </ThemeProvider>
  );
};

export default App;
