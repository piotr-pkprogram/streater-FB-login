import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import PhoneMenu from 'components/organisms/PhoneMenu/PhoneMenu';
import { menuLinks } from 'data/menulinks';
import MenuLink from 'components/molecules/MenuLink/MenuLink';
import { StyledIcon, ImageWrapper, FoodtruckWrapper, Dish } from './FoodtruckView.styles';
import logo from 'assets/img/icon.svg';
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
import dishImg from 'assets/img/dishImg.png';
import { useQuery } from 'hooks/useQuery';

const FoodtruckView = () => {
  const [currentFoodtruck, setCurrentFoodtruck] = useState<FoodtruckState>();
  const { getSingleFoodtruck } = useFoodtrucks();
  const { foodtruckLink } = useParams();
  const query = useQuery();

  const body = document.querySelector('body') as HTMLBodyElement;

  useEffect(() => {
    (async () => {
      const foodtruck = await getSingleFoodtruck(foodtruckLink as string);
      setCurrentFoodtruck(foodtruck);
    })();
  }, [foodtruckLink]);

  return (
    <>
      {createPortal(
        <>
          <PhoneMenu>
            {menuLinks.map(({ id, to, text, svg }) => (
              <MenuLink key={id} to={to} text={text} svg={svg} />
            ))}
          </PhoneMenu>
          <StyledIcon svg={logo} isRouterLink to="/" />
        </>,
        body
      )}
      <ImageWrapper />
      <FoodtruckWrapper>
        <IconButton
          imgClassName="h-4"
          className="absolute top-2 left-3"
          svg={arrowDown}
          isRouterLink
          to={`/app/guest?isMapVisible=${query.get('isMapVisible')}`}
        />
        <IconButton imgClassName="h-6" className="absolute top-2 right-3" svg={heart} />
        <div className="grid gap-1 p-3 w-full">
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
              to={`/app/${currentFoodtruck?.name.toLowerCase().replaceAll(' ', '-')}/reviews`}
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
                <img className="rounded-xl h-24 w-24 max-w-none" src={dishImg} alt="" />
              </Dish>
            );
          })}
        </div>
      </FoodtruckWrapper>
    </>
  );
};

export default FoodtruckView;
