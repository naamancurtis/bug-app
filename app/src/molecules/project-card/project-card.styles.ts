import styled from 'styled-components';

export const ProjectCardWrapper = styled.div`
  width: 300px;
  padding: 0.75em;
  margin: 1em;
  border-radius: 15px;
  border: 2px solid ${({ theme }) => theme.primaryAccent};
  cursor: pointer;
`;

export const CardTitle = styled.h3``;

export const CardCode = styled.h5`
  text-transform: uppercase;
  text-align: right;
`;

export const CardDescription = styled.p``;
