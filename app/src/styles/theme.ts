export type ThemeFonts = {};
export enum Themes {
  DARK = 'dark',
  LIGHT = 'light',
}

export type Theme = {
  fonts: ThemeFonts;

  theme: Themes;
  body: string;
  text: string;

  error: string;
  success: string;
};

export const lightTheme: Theme = {
  fonts: {},

  theme: Themes.LIGHT,
  body: '',
  text: '',

  error: '',
  success: '',
};

export const darkTheme: Theme = {
  fonts: {},

  theme: Themes.DARK,
  body: '',
  text: '',

  error: '',
  success: '',
};
