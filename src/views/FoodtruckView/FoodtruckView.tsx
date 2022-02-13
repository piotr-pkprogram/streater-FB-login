import React from 'react';
import { createPortal } from 'react-dom';
import PhoneMenu from 'components/organisms/PhoneMenu/PhoneMenu';
import { menuLinks } from 'data/menulinks';
import MenuLink from 'components/molecules/MenuLink/MenuLink';
import { StyledIcon, ImageWrapper, FoodtruckWrapper } from './FoodtruckView.styles';
import logo from 'assets/img/icon.svg';
import arrowDown from 'assets/img/arrowDown.svg';
import heart from 'assets/img/heart.svg';
import IconButton from 'components/atoms/IconButton/IconButton';
import { Title } from 'components/atoms/Title/Title';
import { useLocation } from 'react-router-dom';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const FoodtruckView = () => {
  const body = document.querySelector('body') as HTMLBodyElement;

  return (
    <>
      {createPortal(
        <>
          <PhoneMenu>
            {menuLinks.map(({ id, to, text, svg }) => (
              <MenuLink key={id} to={to} text={text} svg={svg} />
            ))}
          </PhoneMenu>
          <StyledIcon svg={logo} isRouterLink to="/" />
        </>,
        body
      )}
      <ImageWrapper />
      <FoodtruckWrapper>
        <IconButton className="absolute top-2 left-2" svg={arrowDown} />
        <IconButton className="absolute top-2 right-2" svg={heart} />
        <Title></Title>
      </FoodtruckWrapper>
    </>
  );
};

export default FoodtruckView;
