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

  sidebar: string;
  sidebarText: string;

  primaryButton: string;
  primaryButtonText: string;

  error: string;
  success: string;
};

export const lightTheme: Theme = {
  fonts: { ...themeFonts },

  theme: Themes.LIGHT,
  body: '#F8F9FA',
  text: '#292F36',

  sidebar: '#494C9B',
  sidebarText: '#90F6A1',

  primaryButton: '#494C9B',

  // primaryButton: '#DAD4F7',
  primaryButtonText: '#F8F9FA',
  // primaryButtonText: '#2C3F55',

  error: '',
  success: '',
};

export const darkTheme = lightTheme;

// export const darkTheme: Theme = {
//   fonts: { ...themeFonts },

//   theme: Themes.DARK,
//   body: '',
//   text: '',

//   header: 'blue',
//   headerText: '',

//   error: '',
//   success: '',
// };
