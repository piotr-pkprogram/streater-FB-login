import React from 'react';
import PropTypes from 'prop-types';
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
};

const IconButton = ({
  svg,
  type = BtnTypes.Button,
  to = '',
  isRouterLink,
  isExternalLink,
  onClick,
  className = ''
}: Props) => {
  if (isRouterLink)
    return (
      <Link className={`w-max h-auto hover:opacity-70 transition-opacity ${className}`} to={to}>
        <img src={svg} alt="" />
      </Link>
    );
  else if (isExternalLink)
    return (
      <a
        className={`w-max h-auto hover:opacity-70 transition-opacity ${className}`}
        href={to}
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={svg} alt="" />
      </a>
    );
  else
    return (
      <button
        className={`w-max h-auto hover:opacity-70 transition-opacity ${className}`}
        type={type}
        onClick={onClick}
      >
        <img src={svg} alt="" />
      </button>
    );
};

export default IconButton;
