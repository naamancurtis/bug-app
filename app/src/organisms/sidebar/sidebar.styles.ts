import styled from 'styled-components';

export const SideBarWrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${({ theme }) => theme.header};
  display: flex;
  flex-direction: column;
  padding: 1em 1.5em;
`;

export const SideBarBrand = styled.div``;

export const SideBarMenu = styled.div`
  display: inline-block;
`;
