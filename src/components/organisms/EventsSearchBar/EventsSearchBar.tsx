import React from 'react';
import { Wrapper } from './EventsSearchBar.styles';
import searchBlack from 'assets/icons/search-black.svg';

const EventsSearchBar = ({ isSubmitEvents }: { isSubmitEvents?: boolean }) => {
  return isSubmitEvents ? (
    <Wrapper className={'bg-white'}>
      <img className="w-8 h-8" src={searchBlack} alt="" />
      <input
        type="text"
        className="text-xl font-medium text-black placeholder:text-black focus:outline-none w-full"
        placeholder="Szukaj"
      />
    </Wrapper>
  ) : (
    <Wrapper>
      <img className="w-8 h-8" src={searchBlack} alt="" />
      <input
        type="text"
        className="text-xl font-medium placeholder:text-black focus:outline-none w-full"
        placeholder="Szukaj"
      />
      <svg
        className={'h-auto w-8 cursor-pointer hover:opacity-70 transition-opacity'}
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="24.195"
        viewBox="0 0 29 24.195"
      >
        <g id="Icon_feather-menu" data-name="Icon feather-menu" transform="translate(-3.5 -5.805)">
          <path
            id="Path_4"
            data-name="Path 4"
            d="M4.5,18h27"
            fill="none"
            stroke="#ffc92b"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <path
            id="Path_5"
            data-name="Path 5"
            d="M4.5,9h27"
            fill="none"
            stroke="#ffc92b"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <path
            id="Path_6"
            data-name="Path 6"
            d="M4.5,27h27"
            fill="none"
            stroke="#ffc92b"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
          <circle
            id="Ellipse_3"
            data-name="Ellipse 3"
            cx="3"
            cy="3"
            r="3"
            transform="translate(5.837 5.805)"
            fill="#ffc92b"
          />
          <circle
            id="Ellipse_4"
            data-name="Ellipse 4"
            cx="3"
            cy="3"
            r="3"
            transform="translate(15 15)"
            fill="#ffc92b"
          />
          <circle
            id="Ellipse_5"
            data-name="Ellipse 5"
            cx="3"
            cy="3"
            r="3"
            transform="translate(23.837 24)"
            fill="#ffc92b"
          />
        </g>
      </svg>
    </Wrapper>
  );
};

export default EventsSearchBar;
