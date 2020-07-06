import { useEffect, useState } from 'react';

export default () => {
  const [theme, setTheme] = useState('dark');
  const [mountedComponent, setMountedComponent] = useState(false);

  const setMode = (mode: 'light' | 'dark') => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = (): void => {
    if (theme === 'dark') {
      setMode('light');
      return;
    }
    setMode('dark');
  };

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme');
    if (!localTheme) {
      const lightModePreference =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: light)').matches;
      localTheme = lightModePreference ? 'light' : 'dark';
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
