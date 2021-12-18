import React from 'react';
import logo from 'assets/img/logo.svg';

const Logo = () => (
  <div className="grid gap-2 justify-items-center items-center h-min w-max">
    <img src={logo} alt="Logo Streaters" />
    <p className="font-bold">LOGO</p>
  </div>
);

Logo.propTypes = {};

export default Logo;
