import React from 'react';
import Logo from 'components/atoms/Logo/Logo';
import SimpleLogin from 'components/molecules/SimpleLogin/SimpleLogin';
import FoodTruckerLogin from 'components/molecules/FoodTruckerLogin/FoodTruckerLogin';
import { Link } from 'react-router-dom';
import { Wrapper } from './ChooseLogin.styles';

const ChooseLogin = () => (
  <Wrapper>
    <Logo isBig />
    <span>Powiedz nam kim jesteś?</span>
    <SimpleLogin />
    <FoodTruckerLogin />
    <p className="text-center text-sm mt-2">
      <Link className="hover:opacity-70 transition-opacity" to="/regulamin">
        Regulamin
      </Link>{' '}
      |{' '}
      <Link className="hover:opacity-70 transition-opacity" to="/polityka-prywatnosci">
        Polityka Prywatności
      </Link>
    </p>
  </Wrapper>
);

export default ChooseLogin;
