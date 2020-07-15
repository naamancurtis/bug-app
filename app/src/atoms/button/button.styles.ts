import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  width: max-content;
  font-size: 1.2em;
  border-radius: 15px;
  padding: 0.5em;
  background-color: ${({ theme }) => theme.primaryAccent};
  color: ${({ theme }) => theme.body};
  outline: none;
  border: none;
  cursor: pointer;
`;

export const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.span`
  margin-left: 0.5rem;
`;
