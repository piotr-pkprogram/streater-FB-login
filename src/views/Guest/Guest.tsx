import React, { useEffect, useState } from 'react';
import SearchBar from 'components/organisms/SearchBar/SearchBar';
import { StyledIcon } from './Guest.styles';
import logo from 'assets/img/logo-white.svg';
import FoodtrucksList from 'components/organisms/FoodtrucksList/FoodtrucksList';
import ReactDOM from 'react-dom';
import PhoneMenu from 'components/organisms/PhoneMenu/PhoneMenu';
import { menuLinks } from 'data/menulinks';
import MenuLink from 'components/molecules/MenuLink/MenuLink';
import FoodtrucksMap from 'components/organisms/FoodtrucksMap/FoodtrucksMap';
import { FoodtruckState } from 'types/Foodtrucktypes';
import { FiltersTypes, SortModes, useFoodtrucks } from 'hooks/useFoodtrucks';

export type FilterProp = {
  type: FiltersTypes;
  value: string;
};

const Guest = () => {
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [foodtrucks, setFoodtrucks] = useState<FoodtruckState[]>([]);
  const [filter, setFilter] = useState<FilterProp>();
  const [SortMode, setSortMode] = useState<SortModes>(SortModes.CHOOSE);
  const { getFoodtrucks, getSearchingFoodtrucks, filterFoodtrucks, sortFoodtrucks } =
    useFoodtrucks();

  const body = document.querySelector('body') as HTMLBodyElement;

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
      const sortedFoodtrucks = sortFoodtrucks(matchingFoodtrucks, SortMode);
      setFoodtrucks(sortedFoodtrucks);
    } else if (foodtrucks) {
      // @ts-ignore
      const sortedFoodtrucks = sortFoodtrucks(foodtrucks, SortMode);
      setFoodtrucks(sortedFoodtrucks);
    }
  };

  useEffect(() => {
    (async () => {
      const foodtrucks = await getFoodtrucks();
      if (filter) {
        // @ts-ignore
        const matchingFoodtrucks = filterFoodtrucks(foodtrucks, filter.type, filter.value);
        const sortedFoodtrucks = sortFoodtrucks(matchingFoodtrucks, SortMode);
        setFoodtrucks(sortedFoodtrucks);
      } else {
        // @ts-ignore
        const sortedFoodtrucks = sortFoodtrucks(foodtrucks, SortMode);
        setFoodtrucks(sortedFoodtrucks);
      }
    })();
  }, [filter, SortMode]);

  return (
    <>
      {ReactDOM.createPortal(
        <>
          <PhoneMenu>
            {menuLinks.map(({ id, to, text, svg }) => (
              <MenuLink key={id} to={to} text={text} svg={svg} />
            ))}
          </PhoneMenu>
          <StyledIcon svg={logo} />
          <SearchBar
            isMapVisible={isMapVisible}
            switchListMapVisible={switchListMapVisible}
            foodtrucks={foodtrucks}
            handleSearch={handleChangeSearchInput}
            setFilter={setFilter}
            SortMode={SortMode}
            setSortMode={setSortMode}
          />
        </>,
        body
      )}
      {isMapVisible ? (
        <FoodtrucksMap foodtrucks={foodtrucks} />
      ) : (
        <FoodtrucksList foodtrucks={foodtrucks} />
      )}
    </>
  );
};

export default Guest;
