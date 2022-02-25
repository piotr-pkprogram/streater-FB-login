import React from 'react';
import Dashboard from 'views/Dashboard/Dashboard';
import { notAuthMenuLinks } from 'data/notAuthMenuLinks';

const Guest = () => {
  return <Dashboard menuLinks={notAuthMenuLinks} />;
};

export default Guest;
