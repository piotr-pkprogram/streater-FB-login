import React, { useEffect, useState } from 'react';
import { Title } from 'components/atoms/Title/Title';
import { Wrapper } from './Events.styles';
import EventsSearchBar from 'components/organisms/EventsSearchBar/EventsSearchBar';
import { useFoodtruckEvents } from 'hooks/useFoodtruckEvents';
import HighlitedEvent from 'components/molecules/HighlitedEvent/HighlitedEvent';
import { FoodtruckEvent } from 'types/FoodtruckEventsTypes';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import EventListItem from 'components/molecules/EventListItem/EventListItem';
import SimpleViewsLayout from 'components/templates/SimpleViewsLayout/SimpleViewsLayout';

const Events = () => {
  const { getAllFoodtruckEvents } = useFoodtruckEvents();
  const [foodtruckEvents, setFoodtruckEvents] = useState([]);

  useEffect(() => {
    (async () => {
      const events = await getAllFoodtruckEvents();
      setFoodtruckEvents(events);
    })();
  }, []);

  return (
    <SimpleViewsLayout>
      <Wrapper>
        <Title className="font-semibold">Wydarzenia</Title>
        <EventsSearchBar />
        <div>
          <span className="text-xl font-medium">Wyróżnione</span>
          <div className="mt-4">
            {foodtruckEvents.length > 0 ? (
              <Splide
                className="cursor-grab"
                options={{
                  type: 'slider',
                  arrows: false,
                  width: 300,
                  perPage: 1,
                  autoplay: true,
                  interval: 1000,
                  rewind: true,
                  pauseOnHover: true,
                  pauseOnFocus: true,
                  gap: '1rem',
                  pagination: false,
                  drag: true,
                  lazyLoad: 'nearby',
                  keyboard: true,
                  preloadPages: 1
                }}
              >
                {foodtruckEvents.map((event: FoodtruckEvent) => (
                  <SplideSlide key={event.id}>
                    <HighlitedEvent event={event} />
                  </SplideSlide>
                ))}
              </Splide>
            ) : (
              ''
            )}
          </div>
        </div>
        <div>
          <span className="text-xl font-medium">Nadchodzące wydarzenia</span>
          <div className="mt-4">
            {foodtruckEvents.length > 0
              ? foodtruckEvents.map((event: FoodtruckEvent) => (
                  <EventListItem event={event} key={event.id} />
                ))
              : ''}
          </div>
        </div>
      </Wrapper>
    </SimpleViewsLayout>
  );
};

export default Events;
