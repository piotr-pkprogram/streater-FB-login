import React, { useEffect, useState } from 'react';
import { FoodtruckState } from 'types/Foodtrucktypes';
import { useFoodtrucks } from 'hooks/useFoodtrucks';
import { useParams } from 'react-router-dom';
import { Dish } from 'views/FoodtruckView/FoodtruckView.styles';
import IconButton from 'components/atoms/IconButton/IconButton';
import arrowDown from 'assets/img/arrowDown.svg';
import StarRating from 'components/atoms/StarRating/StarRating';
import foodtruckImg from 'assets/img/foodTruckImg.jpg';
import SimpleViewWrapper from 'components/templates/SimpleViewWrapper/SimpleViewWrapper';

const Reviews = () => {
  const [currentFoodtruck, setCurrentFoodtruck] = useState<FoodtruckState>();
  const { getSingleFoodtruck } = useFoodtrucks();
  const { foodtruckLink } = useParams();

  useEffect(() => {
    (async () => {
      const foodtruck = await getSingleFoodtruck(foodtruckLink as string);
      setCurrentFoodtruck(foodtruck as FoodtruckState);
    })();
  }, [foodtruckLink]);

  return (
    <SimpleViewWrapper img={currentFoodtruck?.image ? currentFoodtruck.image : foodtruckImg}>
      <IconButton
        imgClassName="h-4 rotate-90"
        className="absolute top-4 left-2 flex flex-wrap gap-1 items-center"
        svg={arrowDown}
        isRouterLink
        to={`/app/${foodtruckLink}`}
      >
        <span className="text-lg text-lightBlack">{currentFoodtruck?.name}</span>
      </IconButton>
      <div className="pt-10">
        {currentFoodtruck?.comments.map((comment) => (
          <Dish key={comment.additionDate}>
            <div className="grid gap-2 items-center">
              <span className="text-lg font-medium">{comment.title}</span>
              <p className="text-sm">{comment.body}</p>
              <div className="grid xsm:grid-flow-col gap-2 items-center xsm:justify-items-end">
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
      </div>
    </SimpleViewWrapper>
  );
};

export default Reviews;
