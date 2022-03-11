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
import { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'types/FacebookTypes';
import axios from 'axios';

type Props = {
  title: string;
  loginLink: string;
  children: JSX.Element | JSX.Element[];
  handleSubmitForm?: HandleSubmitForm;
  className?: string;
  handleGoToBack?: any;
};

const LoginViewWrapper = ({ title, handleSubmitForm, loginLink, className, children }: Props) => {
  const googleLogin = useRef<HTMLDivElement>(null);
  const facebookLogin = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(['user-token']);
  const navigate = useNavigate();

  const responseFacebook = async (res: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    if ('accessToken' in res) {
      setCookie(
        'user-token',
        {
          id: res.id,
          token: res.accessToken,
          userType:
            loginLink === 'foodtruck-register' || loginLink === 'foodtruck-login'
              ? 'foodtrucker'
              : 'simple-user'
        },
        { path: '/', secure: true }
      );
    }
    // @ts-ignore
    const { userId, name, email, picture } = res;
    localStorage.setItem(
      'user-profile',
      JSON.stringify({ id: userId, name, email, picture: picture.data.url })
    );
    await axios
      .post('http://77.55.217.106:48391/api/Auth/register', {
        Username: email,
        Password: '1793PK1757!&',
        Name: name.split(' ')[0],
        SurName: name.split(' ')[1],
        Id: userId,
        ImageProfile: picture.data.url
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    if (loginLink === 'foodtruck-register' || loginLink === 'foodtruck-login')
      navigate('/app/foodtrucker-dashboard');
    else navigate('/app/user-simple-dashboard');
  };

  const responseGoogle = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    // @ts-ignore
    const authData = res?.getAuthResponse();
    setCookie(
      'user-token',
      {
        id: authData.id_token,
        token: authData.access_token,
        userType:
          loginLink === 'foodtruck-register' || loginLink === 'foodtruck-login'
            ? 'foodtrucker'
            : 'simple-user'
      },
      {
        path: '/',
        expires: authData.expiers_in,
        secure: true
      }
    );
    // @ts-ignore
    if ('getBasicProfile' in res) {
      try {
        localStorage.setItem('user-profile', JSON.stringify(res.getBasicProfile()));
        await axios
          .post('http://77.55.217.106:48391/api/Auth/register', {
            Username: res.getBasicProfile().getEmail(),
            Password: '1793PK1757!&',
            Name: res.getBasicProfile().getName(),
            SurName: res.getBasicProfile().getFamilyName(),
            Id: res.getBasicProfile().getId(),
            ImageProfile: res.getBasicProfile().getImageUrl()
          })
          .then((res) => console.log(res));
        if (loginLink === 'foodtruck-register' || loginLink === 'foodtruck-login')
          navigate('/app/foodtrucker-dashboard');
        else navigate('/app/user-simple-dashboard');
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
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
      <BackBtn svg={back} isRouterLink to={'/app/choose-login'} />
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
          <div className="google-login" ref={googleLogin} />
          <div className="facebook-login" ref={facebookLogin} />
        </div>{' '}
      </StyledForm>
    </Wrapper>
  );
};

LoginViewWrapper.propTypes = {};

export default LoginViewWrapper;
