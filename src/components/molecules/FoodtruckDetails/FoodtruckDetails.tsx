import React, { ForwardedRef, forwardRef } from 'react';
import {
  Wrapper,
  DishWrapper,
  ImageWrapper
} from 'components/molecules/FoodtruckDetails/FoodtruckDetails.styles';
import { FoodtruckState } from 'types/Foodtrucktypes';
import StarRating from 'components/atoms/StarRating/StarRating';
import dishIcon from 'assets/icons/dishIcon.svg';
import locationSVG from 'assets/icons/location.svg';
import L from 'leaflet';

const FoodtruckDetails = forwardRef(
  ({ foodtruck }: { foodtruck: FoodtruckState }, ref: ForwardedRef<HTMLDivElement>) => {
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
      <div
        className="absolute bottom-0 grid justify-items-center z-40 w-full bg-lightBlack shadow-lg translate-y-full"
        ref={ref}
      >
        <Wrapper>
          <span className="text-lg font-semibold text-white">{foodtruck.name}</span>
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-gold">{foodtruck.rating.toFixed(1)}</span>
            <StarRating rating={foodtruck.rating} ratingColor="#FFC92B" readonly={true} />
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <img src={dishIcon} className="hidden xs:block" alt="" />
            <span className="text-white font-semibold text-sm xs:text-base">
              {foodtruck.menu.kitchenType.join(', ')}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <img src={locationSVG} alt="" />
            <span className="text-white font-semibold text-base">{`${(
              parseInt(from.distanceTo(to).toFixed(0)) / 1000
            ).toFixed(1)} km`}</span>
          </div>
          <div className="grid gap-2 items-center">
            <span className="text-lg text-white">Polecane dania:</span>
            {foodtruck.menu.dish.map((dish, index) => {
              if (1 >= index)
                return (
                  <DishWrapper key={index}>
                    <span className="text-base font-semibold text-white w-max">{dish.name}</span>
                    <span className="text-base text-gold justify-self-end">{dish.prize} zł</span>
                  </DishWrapper>
                );
            })}
          </div>
        </Wrapper>
        <ImageWrapper />
      </div>
    );
  }
);

export default FoodtruckDetails;
