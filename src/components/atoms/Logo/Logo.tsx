import React from 'react';
import logo from 'assets/img/logo.svg';

type Props = {
  isBig?: boolean;
};

const Logo = ({ isBig }: Props) => {
  const imageSize = isBig ? '' : 'w-14';

  return (
    <div className="grid gap-2 justify-items-center items-center h-min w-max mt-3">
      <img className={imageSize} src={logo} alt="Logo Streaters" />
      <p className="font-bold">STREATERS</p>
    </div>
  );
};

Logo.propTypes = {};

export default Logo;
