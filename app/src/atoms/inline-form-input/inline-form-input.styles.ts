import styled, { css } from 'styled-components';
import tinycolor from 'tinycolor2';
import Select from 'react-select';

export const readonlyFormInputStyling = css`
  cursor: pointer;
  border-color: transparent;

  &:hover {
    box-shadow: inset 0 0 3px 1px
      ${({ theme }) => {
        const color = tinycolor(theme.primaryAccent)
          .brighten()
          .setAlpha(0.75)
          .toRgbString();
        return color;
      }};
  }
`;

export const baseFormInputStyling = css`
  grid-column: span 3;
  padding: 0.5em;
  border-radius: 5px;
  outline: none;
  cursor: text;
  font-size: inherit;
  border: solid 2px ${({ theme }) => theme.primaryAccent};
  background-color: ${({ theme }) => theme.body};
  box-shadow: inset 0 0 3px 3px
    ${({ theme }) => {
      const color = tinycolor(theme.body).darken(5).setAlpha(0.3).toRgbString();
      return color;
    }};
`;

export const combinedFormInputStyling = css`
  ${baseFormInputStyling};

  &:read-only {
    ${readonlyFormInputStyling};
  }
`;

export const FormGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  width: 100%;
  cursor: pointer;
  z-index: 1;
`;

export const FormLabel = styled.label`
  padding-right: 0.5em;
  cursor: inherit;
  font-size: inherit;
  font-weight: 600;
  grid-column: span 1;
`;

export const FormInput = styled.input`
  ${combinedFormInputStyling};
`;

export const FormTextArea = styled.textarea`
  ${combinedFormInputStyling};
`;

export const FormSelect = styled(Select)`
  border-radius: 5px;
  cursor: pointer;
  padding: 0;

  .select__control {
    ${baseFormInputStyling};
    padding: 0;

    &:hover {
      border-color: ${({ theme }) => theme.primaryAccent};
    }
  }

  &.readonly {
    .select__control {
      ${readonlyFormInputStyling};
    }
  }

  .select__indicator {
    cursor: pointer;
  }
`;
