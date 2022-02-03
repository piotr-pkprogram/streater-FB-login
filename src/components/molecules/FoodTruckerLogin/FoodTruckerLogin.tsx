import React from 'react';
import TextButton from 'components/atoms/TextButton/TextButton';

const FoodTruckerLogin = () => (
  <div className="grid gap-2 w-max p-2 justify-items-center items-center self-start">
    <p className="font-semibold text-lg">FOODTRUCKER</p>
    <div>
      <TextButton classNames="w-32" isRouterLink isDark to="/app/foodtruck-login">
        Zaloguj
      </TextButton>
      <TextButton classNames="ml-2 w-32" isRouterLink isDark to="/app/foodtruck-register">
        ZAREJESTRUJ
      </TextButton>
    </div>
  </div>
);

export default FoodTruckerLogin;
