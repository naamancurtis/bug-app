import React from 'react';
import { Main } from './app.styles';
import useDarkMode from './hooks/use-theme.hook';
import GlobalStyles from './styles/global-styles';
import { Themes, darkTheme, lightTheme } from './styles/theme';
import { ThemeProvider } from 'styled-components';
import Layout from './templates/layout.component';

const App = () => {
  const [theme, toggleTheme, mountedComponent] = useDarkMode();
  const themeMode = theme === Themes.DARK ? darkTheme : lightTheme;

  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <Layout />
    </ThemeProvider>
  );
};

export default App;
