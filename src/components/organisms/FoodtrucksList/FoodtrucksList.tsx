import React from 'react';
import { useGetFoodtrucksQuery } from 'store/api/foodtrucks';
import locationSVG from 'assets/img/location.svg';
import { Title } from 'components/atoms/Title/Title';
import FoodtruckListItem from 'components/molecules/FoodtruckListItem/FoodtruckListItem';

const FoodtrucksList = () => {
  const { data, isLoading } = useGetFoodtrucksQuery();

  return (
    <div>
      <div className="grid justify-center grid-flow-col mt-4 items-center gap-1 mb-14">
        <img className="h-5" src={locationSVG} alt="" />
        <span className="text-lg">Rzeszów</span>
      </div>
      {isLoading ? (
        <Title>Loading...</Title>
      ) : (
        <div className="mb-28">
          {data?.map((foodtruck) => {
            return <FoodtruckListItem key={foodtruck.id} foodtruck={foodtruck} />;
          })}
        </div>
      )}
    </div>
  );
};

export default FoodtrucksList;
