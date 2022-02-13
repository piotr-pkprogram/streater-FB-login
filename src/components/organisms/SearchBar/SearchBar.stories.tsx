import React, { useEffect, useState } from 'react';
import SearchBar from './SearchBar';
import { SortModes, useFoodtrucks } from 'hooks/useFoodtrucks';
import { FoodtruckState } from 'types/Foodtrucktypes';
import { FilterProp } from 'views/Guest/Guest';
import { foodtruckExample } from 'data/foodtruck';

export default {
  title: 'components/organisms/SearchBar',
  component: SearchBar
};

const handleSearch = ({ inputValue }: { inputValue?: string }) => {};

const Template = (args: object) => {
  const [foodtrucks, setFoodtrucks] = useState<FoodtruckState[]>([]);
  const [filter, setFilter] = useState<FilterProp | null>();
  const { getFoodtrucks } = useFoodtrucks();

  useEffect(() => {
    (async () => {
      const foodtrucks = await getFoodtrucks();
      // @ts-ignore
      setFoodtrucks(foodtrucks);
    })();
  }, []);

  return (
    <SearchBar
      isMapVisible={false}
      switchListMapVisible={() => {}}
      handleSearch={handleSearch}
      foodtrucks={foodtrucks}
      setFilter={setFilter}
      SortMode={SortModes.CHOOSE}
      setSortMode={() => {}}
      currentFoodtruck={foodtruckExample}
      setCurrentFoodtruck={(foodtruck) => {}}
      {...args}
    />
  );
};

export const Default = Template.bind([]);
