import React, { useEffect, useState } from 'react';
import { FoodtruckState } from 'types/Foodtrucktypes';
import { useFoodtrucks } from 'hooks/useFoodtrucks';
import { useParams } from 'react-router-dom';
import { useQuery } from 'hooks/useQuery';
import { createPortal } from 'react-dom';
import PhoneMenu from 'components/organisms/PhoneMenu/PhoneMenu';
import { menuLinks } from 'data/menulinks';
import MenuLink from 'components/molecules/MenuLink/MenuLink';
import {
  Dish,
  FoodtruckWrapper,
  ImageWrapper,
  StyledIcon
} from 'views/FoodtruckView/FoodtruckView.styles';
import logo from 'assets/img/icon.svg';
import IconButton from 'components/atoms/IconButton/IconButton';
import arrowDown from 'assets/img/arrowDown.svg';
import { comment } from 'postcss';
import dishImg from 'assets/img/dishImg.png';
import StarRating from 'components/atoms/StarRating/StarRating';
import TextLink from 'components/atoms/TextLink/TextLink';

const Reviews = () => {
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
      <FoodtruckWrapper className="!pt-16">
        <IconButton
          imgClassName="h-4 rotate-90"
          className="absolute top-4 left-2 flex flex-wrap gap-1 items-center"
          svg={arrowDown}
          onClick={() => history.back()}
        >
          <span className="text-lg text-lightBlack">{currentFoodtruck?.name}</span>
        </IconButton>
        {currentFoodtruck?.comments.map((comment) => (
          <Dish key={comment.additionDate}>
            <div className="grid gap-2 items-center">
              <span className="text-lg font-medium">{comment.title}</span>
              <p className="text-sm">{comment.body}</p>
              <div className="grid grid-flow-col gap-2 items-center justify-items-end">
                <span className="font-semibold text-lightBlack justify-self-start">
                  {comment.author}
                </span>
                <div className="flex flex-wrap gap-2">
                  <span className="text-lightBlack">{currentFoodtruck?.rating.toFixed(1)}</span>
                  <StarRating rating={comment.rating} ratingColor="#FFC92B" readonly={true} />
                </div>
              </div>
            </div>
          </Dish>
        ))}
      </FoodtruckWrapper>
    </>
  );
};

export default Reviews;
