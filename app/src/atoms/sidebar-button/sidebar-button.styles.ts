import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

const transition = css`
  transition: all 0.5s ease-in-out;
`;

export const Link = styled(NavLink)`
  position: relative;
  display: inline-block;
  cursor: pointer;
  outline: none;
  border: 0;
  vertical-align: middle;
  text-decoration: none;
  background: transparent;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
`;

export const Circle = styled.span`
  position: relative;
  display: block;
  margin: 0;
  width: 3rem;
  height: 3rem;
  background: ${({ theme }) => theme.body};
  border-radius: 1.625rem;
  ${transition};

  ${Link}:hover & {
    width: 100%;
  }
`;

export const Icon = styled.span`
  position: relative;
  left: 14px;
  top: 11px;
  color: ${({ theme }) => theme.sidebar};
  font-size: 20px;
  margin-top: 3px;
`;

export const ButtonLabel = styled.span`
  transition: all 0.5s ease-in-out 0.2s;
  position: absolute;
  top: -3px;
  left: 2rem;
  right: 0;
  bottom: 0;
  padding: 0.75rem 0;
  margin: 0 0 0 1.85rem;
  color: ${({ theme }) => theme.body};
  font-weight: 700;
  line-height: 1.6;
  text-transform: uppercase;
  font-size: 1.2em;
  white-space: nowrap;

  ${Link}:hover & {
    color: ${({ theme }) => theme.sidebar};
  }
`;
