export type ThemeFonts = {
  main: string;
};

const themeFonts: ThemeFonts = {
  main: 'Lato, Helvetica, sans-serif',
};

export enum Themes {
  DARK = 'dark',
  LIGHT = 'light',
}

export type Theme = {
  fonts: ThemeFonts;

  theme: Themes;
  body: string;
  text: string;

  header: string;

  error: string;
  success: string;
};

export const lightTheme: Theme = {
  fonts: { ...themeFonts },

  theme: Themes.LIGHT,
  body: '#F9F9F9',
  text: '#292F36',

  header: 'blue',

  error: '',
  success: '',
};

export const darkTheme: Theme = {
  fonts: { ...themeFonts },

  theme: Themes.DARK,
  body: '',
  text: '',

  header: 'blue',

  error: '',
  success: '',
};
