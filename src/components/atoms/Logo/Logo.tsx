import React from 'react';
import logo from 'assets/img/logo.svg';

const Logo = () => {
  return (
    <div className="grid gap-2 justify-items-center items-center h-min w-max mt-3">
      <img src={logo} alt="Logo Streaters" />
    </div>
  );
};

Logo.propTypes = {};

export default Logo;
