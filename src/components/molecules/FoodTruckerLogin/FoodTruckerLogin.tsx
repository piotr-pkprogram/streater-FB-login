import React from 'react';
import TextButton from 'components/atoms/TextButton/TextButton';

const FoodTruckerLogin = () => (
  <div className="grid gap-4 w-max p-2 justify-items-center items-center">
    <p className="font-semibold text-lg">FOODTRUCKER</p>
    <div>
      <TextButton isRouterLink isDark to="/app/login">
        Zaloguj
      </TextButton>
      <TextButton classNames="ml-2" isRouterLink isDark to="/app/foodtracker-register">
        ZAREJESTRUJ
      </TextButton>
    </div>
  </div>
);

export default FoodTruckerLogin;
