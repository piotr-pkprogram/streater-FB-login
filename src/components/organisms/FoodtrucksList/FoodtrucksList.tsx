import React, { useEffect, useState } from 'react';
import locationSVG from 'assets/icons/location.svg';
import FoodtruckListItem from 'components/molecules/FoodtruckListItem/FoodtruckListItem';
import { FoodtruckState } from 'types/Foodtrucktypes';

const FoodtrucksList = ({
  foodtrucks,
  isMapVisible
}: {
  foodtrucks: FoodtruckState[];
  isMapVisible: boolean;
}) => {
  const [city, setCity] = useState('');

  const getCityName = async () => {
    const location = JSON.parse(localStorage.getItem('location') as string) || {
      lat: 52.232855,
      lng: 20.9211124
    };

    try {
      const data = await fetch(
        `http://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}&zoom=18&addressdetails=1`
      ).then((data) => data.json());

      setCity(data.address.city);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      await getCityName();
    })();
  }, []);

  return (
    <div>
      <div className="grid justify-center grid-flow-col mt-4 items-center gap-1 mb-14">
        <img className="h-5" src={locationSVG} alt="" />{' '}
        <span className="ml-1 text-lg">{city}</span>
      </div>
      <div className="mb-28">
        {foodtrucks.map((foodtruck) => {
          return (
            <FoodtruckListItem
              isMapVisible={isMapVisible}
              key={foodtruck.id}
              foodtruck={foodtruck}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FoodtrucksList;
