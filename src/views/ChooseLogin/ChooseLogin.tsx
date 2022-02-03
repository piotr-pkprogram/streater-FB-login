import React from 'react';
import Logo from 'components/atoms/Logo/Logo';
import SimpleLogin from 'components/molecules/SimpleLogin/SimpleLogin';
import FoodTruckerLogin from 'components/molecules/FoodTruckerLogin/FoodTruckerLogin';
import { Wrapper } from './ChooseLogin.styles';
import TextLink from 'components/atoms/TextLink/TextLink';

const ChooseLogin = () => (
  <Wrapper>
    <Logo />
    <span className="py-18 font-semibold">Powiedz nam kim jesteś?</span>
    <SimpleLogin />
    <FoodTruckerLogin />
    <p className="text-center text-xs mt-32">
      Sprawdź{' '}
      <TextLink className="text-xs" isRouterLink to="/regulamin">
        Warunki użytkowania
      </TextLink>
      <br />i{' '}
      <TextLink className="text-xs" isRouterLink to="/polityka-prywatnosci">
        Polityka Prywatności
      </TextLink>
    </p>
  </Wrapper>
);

export default ChooseLogin;
