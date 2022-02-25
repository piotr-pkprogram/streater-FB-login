import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Wrapper, BackBtn, StyledForm, StyledSpan } from './LoginViewWrapper.styles';
import Logo from 'components/atoms/Logo/Logo';
import TextLink from 'components/atoms/TextLink/TextLink';
import back from 'assets/img/next.svg';
import { HandleSubmitForm } from 'types/FormTypes';
import IconButton from 'components/atoms/IconButton/IconButton';
import GoogleIcon from 'assets/img/google-icon.svg';
import FacebookIcon from 'assets/img/facebook-icon.svg';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

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
  const googleLogin = useRef<HTMLDivElement>(null);
  const facebookLogin = useRef<HTMLDivElement>(null);
  const [cookies, setCookie] = useCookies(['user-token']);
  const navigate = useNavigate();

  const responseFacebook = (response: Response) => {
    console.log(response);
  };

  const responseGoogle = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    // @ts-ignore
    const authData = res?.getAuthResponse();
    setCookie(
      'user-token',
      { id: authData.id_token, token: authData.access_token },
      {
        path: '/',
        expires: authData.expiers_in,
        secure: true
      }
    );

    navigate('/app/user-simple-dashboard');
  };

  useEffect(() => {
    if (loginLink !== 'foodtruck-login')
      ReactDOM.render(
        <FacebookLogin
          appId="481834246806215"
          fields="name,email,picture"
          render={(renderProps: { onClick: any; disabled: boolean | undefined }) => (
            <IconButton
              className="cursor-pointer"
              svg={FacebookIcon}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            />
          )}
          callback={responseFacebook}
        />,
        document.querySelector('.facebook-login')
      );
  }, [facebookLogin.current]);

  useEffect(() => {
    if (loginLink !== 'foodtruck-login')
      ReactDOM.render(
        <GoogleLogin
          clientId="281605504347-ql6i3m24ubq9pi3atsljkgi2d04atn2h.apps.googleusercontent.com"
          render={(renderProps) => (
            <IconButton
              className="cursor-pointer"
              svg={GoogleIcon}
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            />
          )}
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />,
        document.querySelector('.google-login')
      );
  }, [googleLogin.current]);

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
        {loginLink !== 'foodtruck-login' ? (
          <>
            <StyledSpan>Lub zaloguj się z</StyledSpan>
            <div className="flex justify-center gap-4 w-full mt-3">
              <div className="google-login" ref={googleLogin} />
              <div className="facebook-login" ref={facebookLogin} />
            </div>{' '}
          </>
        ) : (
          ''
        )}
      </StyledForm>
    </Wrapper>
  );
};

LoginViewWrapper.propTypes = {};

export default LoginViewWrapper;
