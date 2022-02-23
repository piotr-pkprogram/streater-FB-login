import React, { useEffect, useState } from 'react';
import { Dish } from './FoodtruckView.styles';
import arrowDown from 'assets/img/arrowDown.svg';
import heart from 'assets/img/heart.svg';
import IconButton from 'components/atoms/IconButton/IconButton';
import { Title } from 'components/atoms/Title/Title';
import { useFoodtrucks } from 'hooks/useFoodtrucks';
import { useParams } from 'react-router-dom';
import { FoodtruckState } from 'types/Foodtrucktypes';
import StarRating from 'components/atoms/StarRating/StarRating';
import TextLink from 'components/atoms/TextLink/TextLink';
import locationSVG from 'assets/img/location.svg';
import foodtruckImg from 'assets/img/foodTruckImg.jpg';
import { useQuery } from 'hooks/useQuery';
import SimpleViewWrapper from 'components/templates/SimpleViewWrapper/SimpleViewWrapper';

const FoodtruckView = () => {
  const [currentFoodtruck, setCurrentFoodtruck] = useState<FoodtruckState>();
  const { getSingleFoodtruck } = useFoodtrucks();
  const { foodtruckLink } = useParams();
  const query = useQuery();

  useEffect(() => {
    (async () => {
      // @ts-ignore
      const foodtruck: FoodtruckState = await getSingleFoodtruck(foodtruckLink as string);
      if (!foodtruck.urlName) foodtruck.urlName = foodtruck.id;
      setCurrentFoodtruck(foodtruck);
    })();
  }, [foodtruckLink]);

  return (
    <SimpleViewWrapper img={currentFoodtruck?.image ? currentFoodtruck.image : foodtruckImg}>
      <IconButton
        imgClassName="h-4"
        className="absolute top-2 left-3"
        svg={arrowDown}
        isRouterLink
        to={`/app/guest?isMapVisible=${query.get('isMapVisible')}`}
      />
      <IconButton imgClassName="h-6" className="absolute top-2 right-3" svg={heart} />
      <div className="grid gap-1 p-3 w-full pt-20">
        <Title>{currentFoodtruck?.name}</Title>
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-lightBlack">{currentFoodtruck?.rating.toFixed(1)}</span>
          <StarRating
            rating={currentFoodtruck?.rating as number}
            ratingColor="#FFC92B"
            readonly={true}
          />
          <TextLink
            className="!text-lightBlack"
            isRouterLink
            to={`/app/${currentFoodtruck?.urlName}/reviews`}
          >
            Sprawdź opinie
          </TextLink>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <img className="h-5" src={locationSVG} alt="" />
          <span className="text-lightBlack text-lg">{`${currentFoodtruck?.location.address.street} ${currentFoodtruck?.location.address.houseNumber} ${currentFoodtruck?.location.address.city}`}</span>
        </div>
        <p className="text-lightBlack">{currentFoodtruck?.description}</p>
      </div>
      <div className="grid">
        {currentFoodtruck?.menu.dish.map((dish) => {
          return (
            <Dish key={dish.name}>
              <div className="grid gap-2 items-center">
                <span className="text-lg font-medium">{dish.name}</span>
                <p className="text-sm">{dish.description}</p>
                <span className="text-xl text-gold font-semibold">{dish.prize} zł</span>
              </div>
              {dish.image ? (
                <img className="rounded-xl h-24 w-24 max-w-none" src={dish.image} alt="" />
              ) : (
                ''
              )}
            </Dish>
          );
        })}
      </div>
    </SimpleViewWrapper>
  );
};

export default FoodtruckView;
