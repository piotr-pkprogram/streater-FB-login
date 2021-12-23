import React from 'react';
import 'src/assets/styles/tailwind.css';
import { BrowserRouter as Router } from 'react-router-dom';

// @ts-ignore
const Layout = ({ children }) => {
  return (
    <Router>
      <div className="px-20 py-10">{children}</div>
    </Router>
  );
};

export default Layout;
