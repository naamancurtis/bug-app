import styled from 'styled-components';
import tinycolor from 'tinycolor2';

export const TitleWrapper = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 1rem;
`;

export const Bugs = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5em 1em;
  grid-auto-rows: 30px;
  align-items: center;
  width: 100%;
  min-height: 30%;
  padding: 0.4em 0.3em;
  background-color: ${({ theme }) => {
    const color = tinycolor(theme.body).darken(5).toRgbString();
    return color;
  }};
`;
