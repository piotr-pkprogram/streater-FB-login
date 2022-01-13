import React from 'react';
import { FoodtruckState } from 'types/Foodtrucktypes';
import StarRating from 'components/atoms/StarRating/StarRating';
import locationSVG from 'assets/img/location.svg';
import money from 'assets/img/money.svg';
import dish from 'assets/img/dish.jpg';
import { Wrapper } from './FoodtruckListItem.styles';

type Props = {
  foodtruck: FoodtruckState;
};

const FoodtruckListItem = ({ foodtruck }: Props) => (
  <Wrapper to={`/api/foodtrucks/${foodtruck.name}`}>
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
      <div className="flex flex-wrap gap-2 items-center">
        <img className="w-4" src={locationSVG} alt="" />
        {foodtruck.location.address.city} ul.{foodtruck.location.address.street}{' '}
        {foodtruck.location.address.houseNumber}
      </div>
    </div>
    <div className="justify-self-end mr-4 text-base text-center">
      {foodtruck.menu.kitchenType[0].name ? foodtruck.menu.kitchenType[0].name : 'tajska'}
      <img className="h-4" src={money} alt="" />
    </div>
  </Wrapper>
);

export default FoodtruckListItem;
