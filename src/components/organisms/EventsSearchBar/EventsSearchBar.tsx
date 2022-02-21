import React from 'react';
import { Wrapper, Settings } from './EventsSearchBar.styles';
import searchBlack from 'assets/img/search-black.svg';
import settings from 'assets/img/settings.svg';

const EventsSearchBar = () => (
  <Wrapper>
    <img className="w-8 h-8" src={searchBlack} alt="" />
    <input
      type="text"
      className="text-xl font-medium placeholder:text-black focus:outline-none w-full"
      placeholder="Szukaj"
    />
    <Settings src={settings} alt="" />
  </Wrapper>
);

export default EventsSearchBar;
