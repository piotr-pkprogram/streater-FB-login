import React from 'react';
import TextButton from 'components/atoms/TextButton/TextButton';
import TextLink from 'components/atoms/TextLink/TextLink';

const SimpleLogin = () => (
  <div className="grid gap-4 w-max p-2 justify-items-center items-center">
    <p className="font-semibold text-lg">SMAKOSZ</p>
    <div>
      <TextButton isRouterLink to="/app/guest">
        SZYBKIE ŻARCIE
      </TextButton>
      <TextButton classNames="ml-2" isRouterLink to="/app/register">
        ZAREJESTRUJ
      </TextButton>
    </div>
    <p>
      <span>Masz już konto?</span>
      <TextLink className="ml-3 text-blue-400" isRouterLink to="/app/login">
        Zaloguj
      </TextLink>
    </p>
  </div>
);

export default SimpleLogin;
