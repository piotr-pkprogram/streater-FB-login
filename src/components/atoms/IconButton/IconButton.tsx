import React from 'react';
import { Link } from 'react-router-dom';
import { BtnTypes } from 'types/BtnTypes';

type Props = {
  svg: string;
  type?: BtnTypes;
  to?: string;
  onClick?: any;
  className?: string;
  isRouterLink?: boolean;
  isExternalLink?: boolean;
  imgClassName?: string;
  children?: JSX.Element | string;
};

const IconButton = ({
  svg,
  type = BtnTypes.Button,
  to = '',
  isRouterLink,
  isExternalLink,
  onClick,
  className = '',
  imgClassName = '',
  children
}: Props) => {
  if (isRouterLink)
    return (
      <Link className={`hover:opacity-70 transition-opacity ${className}`} to={to}>
        <img className={imgClassName} src={svg} alt="" />
      </Link>
    );
  else if (isExternalLink)
    return (
      <a
        className={`hover:opacity-70 transition-opacity ${className}`}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className={imgClassName} src={svg} alt="" />
      </a>
    );
  else
    return (
      <button
        className={`hover:opacity-70 transition-opacity ${className}`}
        type={type}
        onClick={onClick}
      >
        <img className={imgClassName} src={svg} alt="" />
        {children}
      </button>
    );
};

export default IconButton;
