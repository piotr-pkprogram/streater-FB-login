import React from 'react';
import TextButton from 'components/atoms/TextButton/TextButton';
import TextLink from 'components/atoms/TextLink/TextLink';

const SimpleLogin = () => (
  <div className="grid gap-2 w-max p-2 justify-items-center items-center">
    <p className="font-semibold text-lg">SMAKOSZ</p>
    <div className="grid gap-2 xs:gap-0 xs:block">
      <TextButton classNames="w-36" isRouterLink to="/app/guest">
        SZYBKIE ŻARCIE
      </TextButton>
      <TextButton classNames="xs:ml-2 w-36" isRouterLink to="/app/register">
        ZAREJESTRUJ
      </TextButton>
    </div>
    <p>
      <span>Masz już konto?</span>
      <TextLink className="ml-2" isRouterLink to="/app/login">
        Zaloguj
      </TextLink>
    </p>
  </div>
);

export default SimpleLogin;
