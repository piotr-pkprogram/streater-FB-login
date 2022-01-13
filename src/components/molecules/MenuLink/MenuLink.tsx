import React from 'react';
import { StyledNavLink } from './MenuLink.styles';

type Props = {
  to: string;
  text: string;
  svg: string;
};

const MenuLink = ({ to, text, svg }: Props) => (
  <StyledNavLink to={to}>
    <img src={svg} alt="" />
    <span>{text}</span>
  </StyledNavLink>
);

export default MenuLink;
