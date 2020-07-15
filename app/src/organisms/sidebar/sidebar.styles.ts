import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SideBarWrapper = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  height: 100%;
  max-width: 15%;
  min-width: 250px;

  width: 100%;
  background-color: ${({ theme }) => theme.sidebar};
  display: flex;
  flex-direction: column;
  padding: 1em 1.5em;
`;

export const SideBarBrand = styled(Link)`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.sidebarText};
  font-weight: 800;
  display: flex;
  align-items: center;
  text-decoration: none;
  outline: none;
  padding-left: 0.25em;
`;

export const BrandText = styled.span`
  margin-left: 0.5rem;
`;

export const SideBarMenu = styled.div`
  display: inline-block;
  width: 100%;
`;
