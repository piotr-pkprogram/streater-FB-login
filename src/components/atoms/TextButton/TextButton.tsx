import React from 'react';
import { Link } from 'react-router-dom';
import { BtnTypes } from 'types/BtnTypes';

type Props = {
  classNames?: string;
  type?: BtnTypes;
  to?: string;
  onClick?: any;
  isDark?: boolean;
  isExternalLink?: boolean;
  isRouterLink?: boolean;
  children?: JSX.Element | JSX.Element[] | string;
  disabled?: boolean;
  id?: string;
};

const TextButton = ({
  classNames = '',
  type = BtnTypes.Button,
  to = '',
  onClick = () => {},
  isDark = false,
  isExternalLink,
  isRouterLink,
  children,
  disabled,
  id = ''
}: Props) => {
  const className = `inline-block border-2 border-lightBlack text-center p-2 text-sm xs:text-base hover:opacity-70 transition-opacity disabled:opacity-70 ${
    isDark ? 'bg-lightBlack text-white' : ''
  } ${classNames}`;

  if (isExternalLink)
    return (
      <a
        id={id}
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
      <Link id={id} className={className} to={to} onClick={onClick}>
        {children}
      </Link>
    );
  return (
    <button id={id} className={className} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

TextButton.propTypes = {};

export default TextButton;
