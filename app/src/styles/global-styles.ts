import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme';

export default createGlobalStyle<{ theme: Theme }>`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
   }

   html {
     height: 100%;
   }

   body {
    line-height: 1.5;
    width: 100%;
    height: 100%;
    font-size: 16px;
    background: ${({ theme }) => theme.body};

    font-family: ${({ theme }) => theme.fonts.main};
   }
`;
