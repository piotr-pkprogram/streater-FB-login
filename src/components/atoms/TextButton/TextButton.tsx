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
  to?: string;
  onClick?: any;
  isDark?: boolean;
  isExternalLink?: boolean;
  isRouterLink?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
};

const TextButton = ({
  classNames,
  type,
  to = '',
  onClick = () => {},
  isDark = false,
  isExternalLink,
  isRouterLink,
  children
}: Props) => {
  const className = `border-2 border-lightBlack p-2 text-sm xs:text-base hover:opacity-70 transition-opacity ${
    isDark ? 'bg-lightBlack text-white' : ''
  } ${classNames}`;

  if (isExternalLink)
    return (
      <a
        className={className}
        href={to}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  else if (isRouterLink)
    return (
      <Link className={className} to={to} onClick={onClick}>
        {children}
      </Link>
    );
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

TextButton.propTypes = {};

export default TextButton;
