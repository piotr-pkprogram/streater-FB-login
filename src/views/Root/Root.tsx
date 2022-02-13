import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChooseLogin from 'views/ChooseLogin/ChooseLogin';
import Register from 'views/Register/Register';
import Login from 'views/Login/Login';
import FoodtruckerRegister from 'views/FoodtrackerRegister/FoodtruckerRegister';
import Guest from 'views/Guest/Guest';
import Contact from 'views/Contact/Contact';
import FoodtruckView from 'views/FoodtruckView/FoodtruckView';

const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/app/guest" />} />
        <Route path="/app">
          <Route path="choose-login" element={<ChooseLogin />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="foodtruck-login" element={<Login />} />
          <Route path="foodtruck-register" element={<FoodtruckerRegister />} />
          <Route path="guest" element={<Guest />} />
          <Route path="contact" element={<Contact />} />
          <Route path=":foodtruckLink" element={<FoodtruckView />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Root;
