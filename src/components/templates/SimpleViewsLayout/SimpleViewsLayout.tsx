import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import PhoneMenu from 'components/organisms/PhoneMenu/PhoneMenu';
import MenuLink from 'components/molecules/MenuLink/MenuLink';
import { StyledIcon } from 'views/Guest/Guest.styles';
import logo from 'assets/icons/icon.svg';
import { useCookies } from 'react-cookie';
import { UserData } from 'views/SimpleUser/SimpleUser';
import { foodtruckerMenuLinks } from 'data/foodtruckerMenuLinks';
import axios from 'axios';
import { notAuthMenuLinks } from 'data/notAuthMenuLinks';
import { userMenuLinks } from 'data/userMenuLinks';
import { GoogleLoginResponse } from 'react-google-login';
import { ReactFacebookLoginInfo } from 'types/FacebookTypes';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: JSX.Element[] | JSX.Element;
  portalChildren?: JSX.Element[] | JSX.Element;
};

const SimpleViewsLayout = ({ children, portalChildren }: Props) => {
  const body = document.querySelector('body');
  const [cookies, removeCookies] = useCookies(['user-token']);
  const [userData, setUserData] = useState<UserData>();
  const [menuLinks, setMenuLinks] = useState(notAuthMenuLinks);
  const [dashboard, setDashboard] = useState('/app/guest');
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('user-profile') as string) as
      | GoogleLoginResponse
      | ReactFacebookLoginInfo;
    if (cookies['user-token']) {
      (async () => {
        await axios
          .post('http://77.55.217.106:666/api/Auth/login', {
            Username:
              'getBasicProfile' in userInfo
                ? userInfo.getBasicProfile().getEmail()
                : userInfo.email,
            Password: '1793PK1757!&'
          })
          .then((res) => setUserData(res.data))
          .catch((err) => {
            console.log(err);
            removeCookies('user-token', cookies['user-token']);
            navigate('/app/guest');
          });
      })();
      if (cookies['user-token'].userType === 'simple-user') setMenuLinks(userMenuLinks);
      else if (cookies['user-token'].userType === 'foodtrucker') setMenuLinks(foodtruckerMenuLinks);
      setDashboard(
        cookies['user-token'].userType === 'foodtrucker'
          ? '/app/foodtrucker-dashboard'
          : cookies['user-token'].userType === 'simple-user'
          ? '/app/user-simple-dashboard'
          : '/app/guest'
      );
    }
  }, [cookies['user-token']]);

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <PhoneMenu userData={userData}>
            {menuLinks.map(({ id, to, text, svg }) => (
              <MenuLink key={id} to={to} text={text} svg={svg} />
            ))}
          </PhoneMenu>
          <StyledIcon svg={logo} isRouterLink to={dashboard} />
          {portalChildren}
        </>,
        body as HTMLBodyElement
      )}
      {children}
    </>
  );
};

export default SimpleViewsLayout;
