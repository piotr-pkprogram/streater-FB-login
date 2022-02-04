import React from 'react';
import TextButton from 'components/atoms/TextButton/TextButton';

const FoodTruckerLogin = () => (
  <div className="grid gap-2 w-max p-2 justify-items-center items-center self-start">
    <p className="font-semibold text-lg">FOODTRUCKER</p>
    <div className="grid gap-2 xs:gap-0 xs:block">
      <TextButton classNames="w-36" isRouterLink isDark to="/app/foodtruck-login">
        Zaloguj
      </TextButton>
      <TextButton classNames="xs:ml-2 w-36" isRouterLink isDark to="/app/foodtruck-register">
        ZAREJESTRUJ
      </TextButton>
    </div>
  </div>
);

export default FoodTruckerLogin;
