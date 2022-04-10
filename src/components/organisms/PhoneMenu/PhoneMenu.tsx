import React, { useRef, useState } from 'react';
import { Wrapper, MenuWrapper } from './PhoneMenu.styles';
import IconButton from 'components/atoms/IconButton/IconButton';
import close from 'assets/icons/close2.svg';
import logo from 'assets/icons/icon.svg';
import facebook from 'assets/icons/facebook.svg';
import twitter from 'assets/icons/twitter.svg';
import instagram from 'assets/icons/instagram.svg';
import burgerMenu from 'assets/icons/burgerMenu.svg';
import { useCookies } from 'react-cookie';

type Props = {
  children: JSX.Element | JSX.Element[];
  userData?: {
    name: string;
    token: string;
    email: string;
  };
};

const PhoneMenu = ({ children, userData }: Props) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuWrapper = useRef<HTMLDivElement>(null);
  const [cookies] = useCookies(['user-token']);

  const handleOpen = () => {
    if (!isOpenMenu) {
      const searchBar = menuWrapper.current as HTMLDivElement;
      searchBar.classList.add('animate-left_to_right');

      setTimeout(() => {
        searchBar.classList.remove('-translate-x-full');
        searchBar.classList.remove('animate-left_to_right');
        setIsOpenMenu(true);
      }, 800);
    }
  };

  const handleClose = () => {
    if (isOpenMenu) {
      const searchBar = menuWrapper.current as HTMLDivElement;
      searchBar.classList.add('animate-right_to_left');

      setTimeout(() => {
        searchBar.classList.add('-translate-x-full');
        searchBar.classList.remove('animate-right_to_left');
        setIsOpenMenu(false);
      }, 800);
    }
  };

  return (
    <>
      <IconButton
        className="fixed z-10 bg-lightBlack rounded-3xl h-max py-3 px-2 top-5 left-4 shadow-2xl"
        svg={burgerMenu}
        onClick={handleOpen}
      />
      <Wrapper ref={menuWrapper}>
        <MenuWrapper style={{ gridAutoRows: userData ? '170px auto' : '' }}>
          {userData ? (
            <div className="ml-2 grid grid-rows-2 h-full text-white items-center">
              <p className="font-semibold text-xl">Cześć {userData.name}!</p>
              <span className="self-start">
                {cookies['user-token'].userType === 'simple-user'
                  ? 'Na co masz ochotę? :)'
                  : 'Jesteś Foodtruckerem'}
              </span>
            </div>
          ) : (
            ''
          )}
          <nav className={`ml-2 ${userData ? '' : 'self-center'} grid gap-2 h-max`}>{children}</nav>
          <div className="flex flex-wrap gap-1 xs:gap-2 xs:p-2 items-center h-min self-end mb-20">
            <IconButton svg={facebook} isExternalLink />
            <IconButton svg={twitter} isExternalLink />
            <IconButton svg={instagram} isExternalLink />
            <IconButton svg={logo} isRouterLink to="/" />
          </div>
        </MenuWrapper>
        <IconButton
          className="h-max p-3 bg-lightBlack rounded-tr-3xl rounded-br-3xl"
          svg={close}
          onClick={handleClose}
        />
      </Wrapper>
    </>
  );
};

export default PhoneMenu;
