import React from 'react';
import { StyledBtn } from './TextLink.styles';
import { Link } from 'react-router-dom';

enum BtnTypes {
  Button = 'button',
  SUBMIT = 'submit',
  RESET = 'reset'
}

type Props = {
  className?: string;
  type?: BtnTypes;
  to?: string;
  isExternalLink?: boolean;
  isRouterLink?: boolean;
  onClick?: any;
  children?: JSX.Element[] | string | string[];
};

const TextLink = ({
  className = '',
  type,
  to = '',
  isExternalLink,
  isRouterLink,
  onClick,
  children
}: Props) => {
  if (isExternalLink)
    return (
      <StyledBtn as="a" className={className} href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </StyledBtn>
    );
  else if (isRouterLink)
    return (
      <StyledBtn as={Link} className={className} to={to}>
        {children}
      </StyledBtn>
    );
  else
    return (
      <StyledBtn className={className} type={type} onClick={onClick}>
        {children}
      </StyledBtn>
    );
};

export default TextLink;
