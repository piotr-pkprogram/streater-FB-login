import React from 'react';
import { FoodtruckEvent } from 'types/FoodtruckEventsTypes';
import eventImg from 'assets/img/Rectangle 60.jpg';
import { getMonthName } from 'helpers/getMonthName';
import { getWeekDay } from 'helpers/getWeekDay';
import grayLocation from 'assets/img/gray-location.png';
import { Link } from 'react-router-dom';

const EventListItem = ({ event }: { event: FoodtruckEvent }) => {
  if (!event.urlName || event.urlName === 'string') event.urlName = event.id;

  return (
    <Link
      to={`/app/events/${event.urlName}`}
      className="grid grid-flow-col gap-2 w-max pb-4 pr-6 border-gold border-b mt-4"
    >
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
    </Link>
  );
};

export default EventListItem;
