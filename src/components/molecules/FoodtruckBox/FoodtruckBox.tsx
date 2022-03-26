import React from 'react';
import { FoodtruckState } from 'types/Foodtrucktypes';
import evtImg from 'assets/img/events1.jpg';
import edit from 'assets/icons/edit.svg';
import StarRating from 'components/atoms/StarRating/StarRating';
import locationSVG from 'assets/icons/Icon-metro-location.svg';
import L from 'leaflet';
import { Wrapper } from './FoodtruckBox.styles';
import IconButton from 'components/atoms/IconButton/IconButton';

type Props = { foodtruck: FoodtruckState; onEditClick: () => void };

const FoodtruckBox = ({ foodtruck, onEditClick }: Props) => {
  const location = JSON.parse(localStorage.getItem('location') as string) || {
    lat: 52.232855,
    lng: 20.9211124
  };

  const from = L.marker(location).getLatLng();

  if (!foodtruck.urlName) foodtruck.urlName = foodtruck.id;

  const to = L.marker([
    foodtruck.location.coordinates.latitude,
    foodtruck.location.coordinates.longitude
  ]).getLatLng();

  return (
    <Wrapper>
      <img
        className="rounded-xl w-full"
        src={foodtruck.image ? foodtruck.image : evtImg}
        alt=""
        style={{ maxWidth: '150px' }}
      />
      <div className="grid gap-2">
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
      <IconButton
        imgClassName="cursor-pointer hover:opacity-70 transition-opacity w-6"
        svg={edit}
        onClick={onEditClick}
      />
    </Wrapper>
  );
};

export default FoodtruckBox;
