import React from 'react';
import { Wrapper, BackBtn, StyledForm, StyledSpan } from './LoginViewWrapper.styles';
import Logo from 'components/atoms/Logo/Logo';
import TextLink from 'components/atoms/TextLink/TextLink';
import back from 'assets/img/next.svg';
import { HandleSubmitForm } from 'types/FormTypes';
import IconButton from 'components/atoms/IconButton/IconButton';
import GoogleIcon from 'assets/img/google-icon.svg';
import FacebookIcon from 'assets/img/facebook-icon.svg';

type Props = {
  title: string;
  loginLink: string;
  children: JSX.Element | JSX.Element[];
  handleSubmitForm?: HandleSubmitForm;
  className?: string;
  handleGoToBack?: any;
};

const LoginViewWrapper = ({
  title,
  handleSubmitForm,
  loginLink,
  className,
  children,
  handleGoToBack = () => history.back()
}: Props) => {
  return (
    <Wrapper className={className}>
      <BackBtn svg={back} onClick={handleGoToBack} />
      <Logo />
      <p className="font-bold text-2xl">{title}</p>
      <p className="text-center">
        <span>{title.includes('Logowanie') ? 'Nie masz jeszcze konta?' : 'Masz już konto?'}</span>
        <TextLink className="ml-2" isRouterLink to={`/app/${loginLink}`}>
          {title.includes('Logowanie') ? 'Zarejestruj się' : 'Zaloguj się'}
        </TextLink>
      </p>
      <StyledForm onSubmit={handleSubmitForm}>
        {children}
        <StyledSpan>Lub zaloguj się z</StyledSpan>
        <div className="flex justify-center gap-4 w-full mt-3">
          <IconButton svg={GoogleIcon} />
          <IconButton svg={FacebookIcon} />
        </div>
      </StyledForm>
    </Wrapper>
  );
};

LoginViewWrapper.propTypes = {};

export default LoginViewWrapper;
