import styled from 'styled-components';
import BasicButton from '../../atoms/button/button.component';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Button = styled(BasicButton)`
  margin-top: 2rem;
`;
