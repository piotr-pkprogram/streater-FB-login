import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ChooseLogin from 'views/ChooseLogin/ChooseLogin';
import Register from 'views/Register/Register';
import Login from 'views/Login/Login';
import FoodtruckerRegister from 'views/FoodtrackerRegister/FoodtruckerRegister';
import Guest from 'views/Guest/Guest';
import Contact from 'views/Contact/Contact';
import FoodtruckView from 'views/FoodtruckView/FoodtruckView';
import Reviews from 'views/FoodtruckView/Reviews';
import Events from 'views/Events/Events';
import EventView from 'views/EventView/EventView';
import { CookiesProvider } from 'react-cookie';
import SimpleUser from 'views/SimpleUser/SimpleUser';
import FoodtruckerUser from 'views/FoodtruckerUser/FoodtruckerUser';
import MyFoodtrucks from 'views/MyFoodtrucks/MyFoodtrucks';
import ProblemsContact from 'views/ProblemsContact/ProblemsContact';

const Root = () => {
  return (
    <CookiesProvider>
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
            <Route path="user-simple-dashboard" element={<SimpleUser />} />
            <Route path="foodtrucker-dashboard" element={<FoodtruckerUser />} />
            <Route path="contact" element={<Contact />} />
            <Route path="events" element={<Events />} />
            <Route path=":foodtruckLink" element={<FoodtruckView />} />
            <Route path=":foodtruckLink/reviews" element={<Reviews />} />
            <Route path="events/:eventLink" element={<EventView />} />
            <Route path="my-foodtrucks" element={<MyFoodtrucks />} />
            <Route path=":foodtruckLink/admin-edit/:panelName" element={<MyFoodtrucks />} />
            <Route path="contact-problems" element={<ProblemsContact />} />
          </Route>
        </Routes>
      </Router>
    </CookiesProvider>
  );
};

export default Root;
