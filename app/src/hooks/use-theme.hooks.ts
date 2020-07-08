import { useEffect, useState } from 'react';
import { Themes } from '../styles/theme';

const useDarkMode = () => {
  const [theme, setTheme] = useState('dark');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode: Themes) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = (): void => {
    if (theme === 'dark') {
      setMode(Themes.LIGHT);
      return;
    }
    setMode(Themes.DARK);
  };

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme');
    if (!localTheme) {
      const lightModePreference = window?.matchMedia(
        '(prefers-color-scheme: light)',
      ).matches;
      localTheme = lightModePreference ? Themes.LIGHT : Themes.DARK;
    }
    setTheme(localTheme);
    setMountedComponent(true);
  }, []);

  return [theme, themeToggler, mountedComponent] as [
    string,
    () => void,
    boolean,
  ];
};

export default useDarkMode;
