import React, { forwardRef, useEffect, useState } from 'react';
import IconButton from 'components/atoms/IconButton/IconButton';
import backArrow from 'assets/icons/goldBackArrow.svg';
import { FoodtruckState } from 'types/Foodtrucktypes';
import evtImg from 'assets/img/events1.jpg';
import locationSVG from 'assets/icons/Icon-metro-location.svg';
import L from 'leaflet';
import StarRating from 'components/atoms/StarRating/StarRating';
import info from 'assets/icons/info.svg';
import menu from 'assets/icons/menu.svg';
import blackLocation from 'assets/icons/black-location.svg';
import image from 'assets/icons/image-icon.svg';
import calendar from 'assets/icons/calendar.svg';
import error from 'assets/icons/error.svg';
import { StyledIconBtn, Wrapper } from './CreateFoodtruckMenu.styles';
import { useParams } from 'react-router-dom';
import BasicInfo from 'views/AdminEdit/BasicInfo/BasicInfo';
import Localization from 'views/AdminEdit/Localization/Localization';

type Props = { foodtruck: FoodtruckState; onCloseClick: () => void };

const CreateFoodtruckMenu = forwardRef(({ foodtruck, onCloseClick }: Props, ref) => {
  const params = useParams();
  const [panelName, setPanelName] = useState<null | string>(null);

  const userLocation = JSON.parse(localStorage.getItem('location') as string) || {
    lat: 52.232855,
    lng: 20.9211124
  };

  const from = L.marker(userLocation).getLatLng();

  if (!foodtruck.urlName) foodtruck.urlName = foodtruck.id;

  const to = L.marker([
    foodtruck.location.coordinates.latitude,
    foodtruck.location.coordinates.longitude
  ]).getLatLng();

  useEffect(() => {
    if (!location.pathname.includes('my-foodtrucks')) {
      setPanelName(params.panelName as string);
    } else {
      setPanelName(null);
    }
  }, [params]);

  return (
    <Wrapper ref={ref}>
      <div className="flex gap-4">
        <IconButton
          className="h-max"
          imgClassName="w-5 -rotate-90"
          svg={backArrow}
          onClick={onCloseClick}
        />
        <div className="text-white grid sm3:grid-cols-2 items-center">
          <img
            className="rounded-xl w-full row-start-1 row-end-4 justify-self-center"
            src={foodtruck.image ? foodtruck.image : evtImg}
            alt=""
            style={{ maxWidth: '150px' }}
          />
          <p>{foodtruck.name}</p>
          <div className="flex flex-wrap gap-2 items-center text-gold">
            {`${foodtruck.rating}.0`}
            <StarRating rating={foodtruck.rating} readonly={true} ratingColor={'rgb(255 201 43)'} />
          </div>
          <div className="flex flex-wrap gap-2 items-center text-base">
            <img className="w-4" src={locationSVG} alt="" />
            {`${(parseInt(from.distanceTo(to).toFixed(0)) / 1000).toFixed(1)} km`}
          </div>
        </div>
      </div>
      {!panelName ? (
        <div className="grid grid-cols-3 grid-rows-2 justify-items-center items-center w-full gap-y-4">
          <StyledIconBtn
            svg={info}
            isRouterLink
            to={`/app/${foodtruck.urlName ? foodtruck.urlName : foodtruck.id}/admin-edit/info`}
          >
            OGÓLNE
          </StyledIconBtn>
          <StyledIconBtn
            svg={menu}
            isRouterLink
            to={`/app/${foodtruck.urlName ? foodtruck.urlName : foodtruck.id}/admin-edit/menu`}
          >
            MENU
          </StyledIconBtn>
          <StyledIconBtn
            svg={blackLocation}
            imgClassName="w-4"
            isRouterLink
            to={`/app/${foodtruck.urlName ? foodtruck.urlName : foodtruck.id}/admin-edit/location`}
          >
            LOKALIZACJA
          </StyledIconBtn>
          <StyledIconBtn
            svg={image}
            isRouterLink
            to={`/app/${foodtruck.urlName ? foodtruck.urlName : foodtruck.id}/admin-edit/image`}
          >
            ZDJĘCIE
          </StyledIconBtn>
          <StyledIconBtn
            svg={calendar}
            isRouterLink
            to={`/app/${foodtruck.urlName ? foodtruck.urlName : foodtruck.id}/admin-edit/events`}
          >
            UDZIAŁ W WYDARZENIU
          </StyledIconBtn>
          <StyledIconBtn
            svg={error}
            isRouterLink
            to={`/app/${foodtruck.urlName ? foodtruck.urlName : foodtruck.id}/admin-edit/problems`}
          >
            ZGŁOŚ PROBLEM
          </StyledIconBtn>
        </div>
      ) : panelName === 'info' ? (
        <BasicInfo />
      ) : panelName === 'location' ? (
        <Localization foodtruck={foodtruck} />
      ) : (
        ''
      )}
    </Wrapper>
  );
});

export default CreateFoodtruckMenu;
