import React from 'react';
import { Event, DateWrapper } from './HighlitedEvent.styles';
import { FoodtruckEvent } from 'types/FoodtruckEventsTypes';
import evtImg from 'assets/img/events1.jpg';
import grayLocation from 'assets/img/gray-location.png';
import { getMonthName } from 'helpers/getMonthName';
import { Link } from 'react-router-dom';

const HighlitedEvent = ({ event }: { event: FoodtruckEvent }) => {
  if (!event.urlName || event.urlName === 'string') event.urlName = event.id;

  return (
    <Link to={`/app/events/${event.urlName}`}>
      <Event>
        <img
          className="col-1/2 rounded-md"
          src={event.image && event.image !== 'string' ? event.image : evtImg}
          alt=""
        />
        <DateWrapper>
          {event.date.getDate()}
          <br />
          <span>{getMonthName(event.date.getMonth())?.slice(0, 3)}</span>
        </DateWrapper>
        <span className="col-start-2 row-start-2 text-lg">{event.name}</span>
        <div className="col-start-2 flex gap-1 items-center text-gray-400 font-semibold text-xs">
          <img src={grayLocation} alt="" />
          <span>
            {event.location.address.city}, {event.location.address.street}
          </span>
        </div>
      </Event>
    </Link>
  );
};

export default HighlitedEvent;
