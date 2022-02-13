import React from 'react';
import { FoodtruckState } from 'types/Foodtrucktypes';
import StarRating from 'components/atoms/StarRating/StarRating';
import locationSVG from 'assets/img/black-location.svg';
import money from 'assets/img/money.svg';
import dish from 'assets/img/dish.jpg';
import { Wrapper } from './FoodtruckListItem.styles';
import L from 'leaflet';

type Props = {
  foodtruck: FoodtruckState;
};

const FoodtruckListItem = ({ foodtruck }: Props) => {
  const location = JSON.parse(localStorage.getItem('location') as string) || {
    lat: 52.232855,
    lng: 20.9211124
  };

  const from = L.marker(location).getLatLng();

  const to = L.marker([
    foodtruck.location.coordinates.latitude,
    foodtruck.location.coordinates.longitude
  ]).getLatLng();

  return (
    <Wrapper to={`/app/${foodtruck.id}`}>
      <img
        className="w-16 rounded-2xl"
        src={foodtruck.pictures[0] === 'string' ? dish : foodtruck.pictures[0]}
        alt=""
      />
      <div className="grid gap-1">
        <span className="text-base">{foodtruck.name}</span>
        <div className="flex flex-wrap gap-2 items-center">
          {`${foodtruck.rating}.0`}
          <StarRating rating={foodtruck.rating} readonly={true} />
        </div>
        <div className="flex flex-wrap gap-2 items-center text-base">
          <img className="w-4" src={locationSVG} alt="" />
          {`${(parseInt(from.distanceTo(to).toFixed(0)) / 1000).toFixed(1)} km`}
        </div>
      </div>
      <div className="justify-self-end mr-4 text-base grid justify-items-end">
        {foodtruck.menu.kitchenType[0] ? foodtruck.menu.kitchenType[0] : 'Tajska'}
        <img className="h-4" src={money} alt="" />
      </div>
    </Wrapper>
  );
};

export default FoodtruckListItem;
