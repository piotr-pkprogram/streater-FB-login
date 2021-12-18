import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from 'views/LoginPage/Login';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/app/login" />} />
        <Route path="/app/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default Root;
