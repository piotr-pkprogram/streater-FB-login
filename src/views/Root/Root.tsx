import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChooseLogin from 'views/ChooseLogin/ChooseLogin';
import Register from 'views/Register/Register';
import Login from 'views/Login/Login';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/app/choose-login" />} />
        <Route path="/app">
          <Route path="choose-login" element={<ChooseLogin />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Root;
