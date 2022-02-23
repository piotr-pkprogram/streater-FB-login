import React from 'react';
import { FoodtruckEvent } from 'types/FoodtruckEventsTypes';
import eventImg from 'assets/img/Rectangle 60.jpg';
import { getMonthName } from 'helpers/getMonthName';
import { getWeekDay } from 'helpers/getWeekDay';
import grayLocation from 'assets/img/gray-location.png';
import { Wrapper } from './EventListItem.styles';

const EventListItem = ({ event }: { event: FoodtruckEvent }) => {
  if (!event.urlName || event.urlName === 'string') event.urlName = event.id;

  return (
    <Wrapper to={`/app/events/${event.urlName}`}>
      <img
        src={event.image && event.image !== 'string' ? event.image : eventImg}
        alt=""
        width={76}
        height={76}
      />
      <div className="grid gap-1 items-center">
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

export default EventListItem;
