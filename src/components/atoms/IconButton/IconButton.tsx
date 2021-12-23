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
};

const IconButton = ({
  svg,
  type = BtnTypes.Button,
  to = '',
  isRouterLink,
  onClick,
  className = ''
}: Props) => {
  if (isRouterLink)
    return (
      <Link className={`w-max h-auto hover:opacity-70 transition-opacity ${className}`} to={to}>
        <img src={svg} alt="" />
      </Link>
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

IconButton.propTypes = {
  img: PropTypes.string
};

export default IconButton;
