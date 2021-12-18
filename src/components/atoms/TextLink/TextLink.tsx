import React from 'react';
import { Link } from 'react-router-dom';

enum BtnTypes {
  Button = 'button',
  SUBMIT = 'submit',
  RESET = 'reset'
}

type Props = {
  classNames?: string;
  type?: BtnTypes;
  to: string;
  isExternalLink?: boolean;
  isRouterLink?: boolean;
  onClick?: any;
  children?: string;
};

const TextLink = ({
  classNames,
  type,
  to,
  isExternalLink,
  isRouterLink,
  onClick,
  children
}: Props) => {
  const className = `text-blue-400 font-semibold text-sm xs:text-base hover:opacity-70 transition-opacity ${classNames}`;

  if (isExternalLink)
    return (
      <a className={className} href={to} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  else if (isRouterLink)
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  else
    return (
      <button className={className} type={type} onClick={onClick}>
        {children}
      </button>
    );
};

export default TextLink;
