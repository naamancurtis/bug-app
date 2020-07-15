import styled from 'styled-components';
import { pSBC } from '../../styles/utils';

export const FormGroup = styled.div`
  display: inline-flex;
  align-items: center;
  width: 100%;
  cursor: pointer;
  z-index: 1;
`;

export const FormLabel = styled.label`
  margin-right: 0.5em;
  cursor: inherit;
  font-size: inherit;
`;

export const FormInput = styled.input`
  padding: 0.5em;
  border-radius: 5px;
  flex-grow: 1;
  outline: none;
  cursor: text;
  font-size: inherit;
  border: solid 2px ${({ theme }) => pSBC(0.2, theme.primaryAccent)};

  &:read-only {
    cursor: pointer;
    border-color: transparent;

    &:hover {
      box-shadow: inset 0 0 3px 1px
        ${({ theme }) => {
          return pSBC(0.2, theme.primaryAccent);
        }};
    }
  }
`;
