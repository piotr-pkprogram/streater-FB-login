import React, { ForwardedRef, forwardRef } from 'react';
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
  disabled?: boolean;
  children?: JSX.Element | string;
};

const IconButton = forwardRef(
  (
    {
      svg,
      type = BtnTypes.Button,
      to = '',
      isRouterLink,
      isExternalLink,
      onClick,
      className = '',
      imgClassName = '',
      disabled,
      children
    }: Props,
    ref: ForwardedRef<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (isRouterLink)
      return (
        <Link
          className={`hover:opacity-70 transition-opacity ${className}`}
          to={to}
          ref={ref as ForwardedRef<HTMLAnchorElement>}
        >
          <img className={imgClassName} src={svg} alt="" />
          <span>{children}</span>
        </Link>
      );
    else if (isExternalLink)
      return (
        <a
          className={`hover:opacity-70 transition-opacity ${className}`}
          href={to}
          target="_blank"
          rel="noopener noreferrer"
          ref={ref as ForwardedRef<HTMLAnchorElement>}
        >
          <img className={imgClassName} src={svg} alt="" />
          <span>{children}</span>
        </a>
      );
    else
      return (
        <button
          className={`hover:opacity-70 transition-opacity ${className}`}
          type={type}
          onClick={onClick}
          disabled={disabled}
          ref={ref as ForwardedRef<HTMLButtonElement>}
        >
          <img className={imgClassName} src={svg} alt="" />
          <span>{children}</span>
        </button>
      );
  }
);

export default IconButton;
