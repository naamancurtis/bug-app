import styled from 'styled-components';
import Select from 'react-select';
import {
  baseFormInputStyling,
  readonlyFormInputStyling,
} from '../inline-form-input/inline-form-input.styles';

export const FormSelect = styled(Select)`
  ${baseFormInputStyling};
  padding: 0;
`;

export const ReadOnlyText = styled.div`
  ${baseFormInputStyling};
  ${readonlyFormInputStyling};
`;
