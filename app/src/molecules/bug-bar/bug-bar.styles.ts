import styled from 'styled-components';
import tinycolor from 'tinycolor2';

// React router Link
export const Wrapper = styled.div`
  width: 100%;
  padding: 0.3em;
  border-radius: 5px;
  display: inline-grid;
  grid-template-columns: 2fr 4fr 2fr 0.6fr 1fr;
  background-color: ${({ theme }) => {
    const color = tinycolor(theme.body).darken(2).toRgbString();
    return color;
  }};
  border: 1px solid
    ${({ theme }) => {
      const color = tinycolor(theme.body).lighten(1).toRgbString();
      return color;
    }};
  box-shadow: 3px 3px 4px 1px rgba(0, 0, 0, 0.1);

  &:hover {
    cursor: pointer;
    box-shadow: 3px 3px 4px 1px rgba(0, 0, 0, 0.2);
  }
`;

export const ID = styled.span``;

export const Name = styled.span`
  white-space; nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Assigned = styled.span``;

export const PriorityWrapper = styled.span``;
export const StatusWrapper = styled.span`
  font-size: 0.8em;
  padding: 0.2em;
  border-radius: 8px;
  font-variant: small-caps;
  font-weight: 900;
  text-align: center;
  background-color: ${({ theme }) => {
    const color = tinycolor(theme.body).darken(5).toRgbString();
    return color;
  }};
`;
