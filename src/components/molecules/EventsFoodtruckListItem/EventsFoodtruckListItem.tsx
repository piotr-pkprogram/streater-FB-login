import React from 'react';
import { FoodtruckState } from 'types/Foodtrucktypes';
import eventImg from 'assets/img/eventImg.jpg';
import StarRating from 'components/atoms/StarRating/StarRating';
import { Wrapper, EventImg } from './EventsFoodtruckListItem.styles';

type Props = {
  foodtruck: FoodtruckState;
  className?: string;
};

const EventsFoodtruckListItem = ({ foodtruck, className = '' }: Props) => {
  if (!foodtruck.urlName || foodtruck.urlName === 'string') foodtruck.urlName = foodtruck.id;

  return (
    <Wrapper className={className} to={`/app/${foodtruck.urlName}`}>
      <EventImg className="rounded-lg" src={foodtruck.image ? foodtruck.image : eventImg} alt="" />
      <div className="grid items-center">
        <span className="text-base font-medium">{foodtruck.name}</span>
        <p className="text-sm xs:text-base">{foodtruck.menu.kitchenType.join(', ')}</p>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-gold">{foodtruck.rating.toFixed(1)}</span>
          <StarRating rating={foodtruck.rating} ratingColor="#FFC92B" readonly={true} />
        </div>
      </div>
    </Wrapper>
  );
};

export default EventsFoodtruckListItem;
