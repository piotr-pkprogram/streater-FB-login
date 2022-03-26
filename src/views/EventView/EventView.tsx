import React, { useEffect, useState } from 'react';
import EventFoodtruckViewWrapper from 'components/templates/EventFoodtruckViewWrapper/EventFoodtruckViewWrapper';
import eventImg from 'assets/img/eventImg.jpg';
import { useFoodtruckEvents } from 'hooks/useFoodtruckEvents';
import { FoodtruckEvent } from 'types/FoodtruckEventsTypes';
import { useParams } from 'react-router-dom';
import IconButton from 'components/atoms/IconButton/IconButton';
import arrowDown from 'assets/icons/arrowDown.svg';
import { Title } from 'components/atoms/Title/Title';
import { Wrapper, LocationImg, StyledMapContainer } from './EventView.styles';
import location from 'assets/icons/Icon-metro-location.svg';
import { Marker, TileLayer } from 'react-leaflet';
import dotMaker from 'assets/icons/dotIcon.svg';
import L from 'leaflet';
import { FoodtruckState } from 'types/Foodtrucktypes';
import { useFoodtrucks } from 'hooks/useFoodtrucks';
import EventsFoodtruckListItem from 'components/molecules/EventsFoodtruckListItem/EventsFoodtruckListItem';
import TextLink from 'components/atoms/TextLink/TextLink';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import HighlitedEvent from 'components/molecules/HighlitedEvent/HighlitedEvent';

const markerIcon = L.icon({
  iconUrl: dotMaker,
  iconSize: [16, 16]
});

const EventView = () => {
  const [currentEvent, setCurrentEvent] = useState<FoodtruckEvent>();
  const [foodtrucks, setFoodtrucks] = useState<FoodtruckState[]>([]);
  const [foodtruckEvents, setFoodtruckEvents] = useState<FoodtruckEvent[]>([]);
  const [isMore, setIsMore] = useState<boolean>(false);
  const { eventLink } = useParams();
  const { getSingleEvent, getAllFoodtruckEvents } = useFoodtruckEvents();
  const { getFoodtrucks } = useFoodtrucks();

  useEffect(() => {
    (async () => {
      //@ts-ignore
      const event: FoodtruckEvent = await getSingleEvent(eventLink as string);
      if (event.urlName && event.urlName !== 'string') event.urlName = event.id;
      setCurrentEvent(event);

      const foodtrucks = await getFoodtrucks();

      const newFoodtrucks = foodtrucks.filter((foodtruck: FoodtruckState) =>
        currentEvent?.foodTrucksIds.includes(foodtruck.id)
      );
      setFoodtrucks(newFoodtrucks);

      const foodtruckEvents = await getAllFoodtruckEvents();
      setFoodtruckEvents(foodtruckEvents);
    })();
  }, []);

  const handleShowMore = () => {
    const hideFoodtrucks = document.querySelectorAll('.hide-event-foodtruck');

    hideFoodtrucks.forEach((foodtruck) => {
      foodtruck.classList.remove('!hidden', 'hide-event-foodtruck');
    });
    setIsMore(true);
  };

  return (
    <EventFoodtruckViewWrapper
      img={currentEvent?.image && currentEvent.image !== 'string' ? currentEvent.image : eventImg}
    >
      <Wrapper>
        <IconButton imgClassName="h-4" svg={arrowDown} onClick={() => history.back()} />
        <Title>{currentEvent?.name}</Title>
      </Wrapper>
      <div className="grid gap-10 p-3 w-full pt-24">
        <div>
          <span className="text-xl font-medium mb-2">Opis</span>
          <p>{currentEvent?.description}</p>
        </div>
        <div className="flex flex-wrap gap-1 items-center font-medium text-sm">
          <LocationImg src={location} alt="" />
          <span>
            {currentEvent?.location.address.city}, {currentEvent?.location.address.street}
          </span>
          {currentEvent ? (
            <StyledMapContainer
              center={{
                lat: currentEvent?.location.coordinates.latitude as number,
                lng: currentEvent?.location.coordinates.longitude as number
              }}
              zoom={14}
            >
              <Marker
                position={{
                  lat: currentEvent?.location.coordinates.latitude as number,
                  lng: currentEvent?.location.coordinates.longitude as number
                }}
                icon={markerIcon}
              />
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />
            </StyledMapContainer>
          ) : (
            ''
          )}
        </div>
        <div className="grid gap-2 items-center">
          <span className="font-semibold text-base">Lista Obecności</span>
          {foodtrucks.length > 0
            ? foodtrucks.map((foodtruck, index) => (
                <EventsFoodtruckListItem
                  className={`${index > 5 ? '!hidden hide-event-foodtruck' : ''}`}
                  key={foodtruck.id}
                  foodtruck={foodtruck}
                />
              ))
            : ''}
          {!isMore ? (
            <TextLink
              className="grid grid-flow-col py-4 items-center justify-items-start font-medium"
              onClick={handleShowMore}
            >
              <span>Pokaż więcej foodtrucków</span>
              <img className="justify-self-end" src={arrowDown} alt="" />
            </TextLink>
          ) : (
            ''
          )}
        </div>
        <div>
          <span className="text-xl font-semibold">Sprawdź też:</span>
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
      </div>
    </EventFoodtruckViewWrapper>
  );
};

export default EventView;
