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

  primaryAccent: string;

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

  primaryAccent: '#494C9B',

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
