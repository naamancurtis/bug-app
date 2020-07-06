import 'styled-components';
import { Theme } from '../styles/theme';

declare module 'styled-components' {
  export type DefaultTheme = Theme;
}
