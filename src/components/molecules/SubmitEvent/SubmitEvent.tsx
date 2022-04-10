import React from 'react';
import { FoodtruckEvent } from 'types/FoodtruckEventsTypes';
import eventImg from 'assets/icons/Rectangle 60.jpg';
import { getMonthName } from 'helpers/getMonthName';
import { getWeekDay } from 'helpers/getWeekDay';
import grayLocation from 'assets/icons/gray-location.png';
import { Wrapper } from '../EventListItem/EventListItem.styles';

type Props = {
  event: FoodtruckEvent;
  className?: string;
  onClick?: (e?: Event) => void;
};

const SubmitEvent = ({ event, className = '', onClick }: Props) => {
  if (!event.urlName || event.urlName === 'string') event.urlName = event.id;

  return (
    <Wrapper
      as={'div'}
      className={`cursor-pointer hover:opacity-70 transition-opacity ${className}`}
      onClick={onClick}
    >
      <img
        className={'rounded-md'}
        src={event.image && event.image !== 'string' ? event.image : eventImg}
        alt=""
        width={76}
        height={76}
      />
      <div className="grid gap-1 items-center row-start-1">
        <span className="text-lg font-semibold">{event.name}</span>
        <span>
          {getWeekDay(event.date.getDay())?.slice(0, event.date.getDay() === 0 ? 5 : 3)}{' '}
          {event.date.getDate()} {getMonthName(event.date.getMonth())?.slice(0, 3)}
        </span>
        <div className="flex gap-1 items-center text-gray-400 font-semibold text-xs">
          <img src={grayLocation} alt="" />
          <span>
            {event.location.address.city}, {event.location.address.street}
          </span>
        </div>
      </div>
    </Wrapper>
  );
};

export default SubmitEvent;
