import React, { useState } from 'react';
import SearchBar from 'components/organisms/SearchBar/SearchBar';
import { StyledIcon } from './Guest.styles';
import logo from 'assets/img/logo-white.svg';
import FoodtrucksList from 'components/organisms/FoodtrucksList/FoodtrucksList';
import ReactDOM from 'react-dom';
import PhoneMenu from 'components/organisms/PhoneMenu/PhoneMenu';
import { menuLinks } from 'data/menulinks';
import MenuLink from 'components/molecules/MenuLink/MenuLink';
import FoodtrucksMap from 'components/organisms/FoodtrucksMap/FoodtrucksMap';

const Guest = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);
  const body = document.querySelector('body') as HTMLBodyElement;

  const switchListMapVisible = () => {
    if (isMapVisible) {
      setIsMapVisible(false);
    } else {
      setIsMapVisible(true);
    }
  };

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <PhoneMenu>
            {menuLinks.map(({ id, to, text, svg }) => (
              <MenuLink key={id} to={to} text={text} svg={svg} />
            ))}
          </PhoneMenu>
          <StyledIcon svg={logo} />
          <SearchBar isMapVisible={isMapVisible} switchListMapVisible={switchListMapVisible} />
        </>,
        body
      )}
      {isMapVisible ? <FoodtrucksMap /> : <FoodtrucksList />}
    </>
  );
};

export default Guest;
