import React, { useEffect, useState } from 'react';
import { FoodtruckState } from 'types/Foodtrucktypes';
import { FiltersTypes, SortModes, useFoodtrucks } from 'hooks/useFoodtrucks';
import { foodtruckExample } from 'data/foodtruck';
import { useQuery } from 'hooks/useQuery';
import SearchBar from 'components/organisms/SearchBar/SearchBar';
import FoodtrucksMap from 'components/organisms/FoodtrucksMap/FoodtrucksMap';
import FoodtrucksList from 'components/organisms/FoodtrucksList/FoodtrucksList';
import SimpleViewsLayout from 'components/templates/SimpleViewsLayout/SimpleViewsLayout';

export type FilterProp = {
  type: FiltersTypes;
  value: string | string[];
};

const Dashboard = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [foodtrucks, setFoodtrucks] = useState<FoodtruckState[]>([]);
  const [filter, setFilter] = useState<FilterProp | null>();
  const [SortMode, setSortMode] = useState<SortModes>(SortModes.CHOOSE);
  const [currentFoodtruck, setCurrentFoodtruck] = useState<FoodtruckState>(foodtruckExample);
  const { getFoodtrucks, getSearchingFoodtrucks, filterFoodtrucks, sortFoodtrucks } =
    useFoodtrucks();
  const query = useQuery();

  const switchListMapVisible = () => {
    if (isMapVisible) {
      setIsMapVisible(false);
    } else {
      setIsMapVisible(true);
    }
  };

  const handleChangeSearchInput = async ({ inputValue }: { inputValue?: string }) => {
    const foodtrucks = await getSearchingFoodtrucks(inputValue?.trim());

    if (foodtrucks && filter) {
      // @ts-ignore
      const matchingFoodtrucks = filterFoodtrucks(foodtrucks, filter.type, filter.value);
      const sortedFoodtrucks = sortFoodtrucks(matchingFoodtrucks as FoodtruckState[], SortMode);
      setFoodtrucks(sortedFoodtrucks);
    } else if (foodtrucks) {
      // @ts-ignore
      const sortedFoodtrucks = sortFoodtrucks(foodtrucks, SortMode);
      setFoodtrucks(sortedFoodtrucks);
    }
  };

  useEffect(() => {
    (async () => {
      setIsMapVisible(query.get('isMapVisible') !== 'false');
      const foodtrucks = await getFoodtrucks();
      if (filter) {
        // @ts-ignore
        const matchingFoodtrucks = filterFoodtrucks(foodtrucks, filter.type, filter.value);
        const sortedFoodtrucks = sortFoodtrucks(matchingFoodtrucks as FoodtruckState[], SortMode);
        setFoodtrucks(sortedFoodtrucks);
      } else {
        // @ts-ignore
        const sortedFoodtrucks = sortFoodtrucks(foodtrucks, SortMode);
        setFoodtrucks(sortedFoodtrucks);
      }
    })();
  }, [filter, SortMode]);

  return (
    <SimpleViewsLayout
      portalChildren={
        <SearchBar
          isMapVisible={isMapVisible}
          switchListMapVisible={switchListMapVisible}
          foodtrucks={foodtrucks}
          handleSearch={handleChangeSearchInput}
          setFilter={setFilter}
          SortMode={SortMode}
          setSortMode={setSortMode}
          currentFoodtruck={currentFoodtruck}
          setCurrentFoodtruck={setCurrentFoodtruck}
        />
      }
    >
      {isMapVisible ? (
        <FoodtrucksMap setCurrentFoodtruck={setCurrentFoodtruck} foodtrucks={foodtrucks} />
      ) : (
        <FoodtrucksList isMapVisible={isMapVisible} foodtrucks={foodtrucks} />
      )}
    </SimpleViewsLayout>
  );
};

export default Dashboard;
