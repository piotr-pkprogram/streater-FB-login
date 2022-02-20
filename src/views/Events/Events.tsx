import React from 'react';
import ReactDOM from 'react-dom';
import PhoneMenu from 'components/organisms/PhoneMenu/PhoneMenu';
import { menuLinks } from 'data/menulinks';
import MenuLink from 'components/molecules/MenuLink/MenuLink';
import { StyledIcon } from 'views/Guest/Guest.styles';
import logo from 'assets/img/icon.svg';
import { Title } from 'components/atoms/Title/Title';
import { Wrapper } from './Events.styles';
import EventsSearchBar from 'components/organisms/EventsSearchBar/EventsSearchBar';

const Events = () => {
  const body = document.querySelector('body') as HTMLBodyElement;

  return (
    <>
      {ReactDOM.createPortal(
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
      <Wrapper>
        <Title className="font-semibold">Wydarzenia</Title>
        <EventsSearchBar />
        <div>
          <span className="text-xl font-medium">Wyróżnione</span>
          <div></div>
        </div>
        <div>
          <span className="text-xl font-medium">Nadchodzące wydarzenia</span>
          <div></div>
        </div>
      </Wrapper>
    </>
  );
};

export default Events;
