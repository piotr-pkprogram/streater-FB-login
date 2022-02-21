import React, { useEffect, useRef, useState } from 'react';
import {
  BurgerWrapper,
  SearchNav,
  SearchResults,
  SearchWrapper,
  Settings,
  StyledInput,
  Wrapper,
  BackWrapper
} from './SearchBar.styles';
import IconButton from 'components/atoms/IconButton/IconButton';
import search from 'assets/img/search.svg';
import dark_search from 'assets/img/dark-search.svg';
import burger from 'assets/img/burger.svg';
import settings from 'assets/img/settings.svg';
import backArrow from 'assets/img/goldBackArrow.svg';
import TextLink from 'components/atoms/TextLink/TextLink';
import { FoodtruckState } from 'types/Foodtrucktypes';
import SearchResultsListItem from 'components/molecules/SearchResultsListItem/SearchResultsListItem';
import { useCombobox } from 'downshift';
import { defaultMap } from 'components/organisms/FoodtrucksMap/FoodtrucksMap';
import SearchFilter from 'components/molecules/SearchFilter/SearchFilter';
import { FilterProp } from 'views/Guest/Guest';
import ReactDOM from 'react-dom';
import { SortModes } from 'hooks/useFoodtrucks';
import FoodtruckDetails from 'components/molecules/FoodtruckDetails/FoodtruckDetails';
import { foodtruckExample } from 'data/foodtruck';

type Props = {
  isMapVisible: boolean;
  switchListMapVisible: () => void;
  foodtrucks: FoodtruckState[];
  handleSearch: ({ inputValue }: { inputValue?: string }) => void;
  setFilter: (filter: FilterProp | null) => void;
  SortMode: SortModes;
  setSortMode: (mode: SortModes) => void;
  currentFoodtruck: FoodtruckState;
  setCurrentFoodtruck: (foodtruck: FoodtruckState) => void;
};

const SearchBar = ({
  isMapVisible,
  switchListMapVisible,
  foodtrucks,
  handleSearch,
  setFilter,
  SortMode,
  setSortMode,
  currentFoodtruck,
  setCurrentFoodtruck
}: Props) => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const filter = useRef<HTMLDivElement>(null);
  const burgerWrapper = useRef<HTMLDivElement>(null);
  const details = useRef<HTMLDivElement>(null);
  const backWrapper = useRef<HTMLDivElement>(null);

  const body = document.querySelector('body') as HTMLBodyElement;

  const handleOpen = () => {
    if (!isOpenSearch) {
      const searchBar = document.querySelector('[aria-label*="searchWrapper"]') as HTMLDivElement;
      const burgerBtn = burgerWrapper.current as HTMLDivElement;

      searchBar.classList.add('animate-down_to_top');
      burgerBtn.classList.add('animate-burger_move');

      setTimeout(() => {
        searchBar.classList.remove('translate-y-full');
        searchBar.classList.add('translate-y-0');
        burgerBtn.classList.add('-translate-y-26');
        searchBar.classList.remove('animate-down_to_top');
        burgerBtn.classList.remove('animate-burger_move');
        setIsOpenSearch(true);
      }, 700);
    }
  };

  const handleClose = () => {
    if (isOpenSearch) {
      const searchBar = document.querySelector('[aria-label*="searchWrapper"]') as HTMLDivElement;
      const burgerBtn = burgerWrapper.current as HTMLDivElement;

      searchBar.classList.add('animate-top_to_down');
      burgerBtn.classList.add('animate-burger_back');

      setTimeout(() => {
        searchBar.classList.remove('translate-y-0');
        searchBar.classList.add('translate-y-full');
        burgerBtn.classList.remove('-translate-y-26');
        searchBar.classList.remove('animate-top_to_down');
        burgerBtn.classList.remove('animate-burger_back');
        setIsOpenSearch(false);
      }, 500);
    }
  };

  const handleSettingsVisible = () => {
    if (isSettingsVisible) {
      filter.current?.classList.remove('translate-y-0');
      filter.current?.classList.add('animate-top_to_down_filter');

      setTimeout(() => {
        filter.current?.classList.add('translate-y-full');
        filter.current?.classList.remove('animate-top_to_down_filter');
        setIsSettingsVisible(false);
      }, 500);
    } else {
      setIsSettingsVisible(true);
      filter.current?.classList.remove('translate-y-full');
      filter.current?.classList.add('animate-down_to_top_filter');

      setTimeout(() => {
        filter.current?.classList.add('translate-y-0');
        filter.current?.classList.remove('animate-down_to_top_filter');
      }, 500);
    }
  };

  const { isOpen, getMenuProps, getInputProps, getComboboxProps, highlightedIndex, getItemProps } =
    useCombobox({
      items: foodtrucks || [],
      onInputValueChange: handleSearch,
      stateReducer(state, { type, changes }) {
        if (
          type === useCombobox.stateChangeTypes.InputKeyDownEnter ||
          type === useCombobox.stateChangeTypes.ItemClick
        ) {
          const foodtruck = changes.selectedItem as FoodtruckState;
          if (changes.selectedItem) {
            changes.inputValue = `${foodtruck.searchingValue} ${foodtruck.cityCountryOrDistrict}`;
            const location = {
              lat: foodtruck.location.coordinates.latitude,
              lng: foodtruck.location.coordinates.longitude
            };
            defaultMap.flyTo(location);
          }
        }
        return changes;
      }
    });

  useEffect(() => {
    if (currentFoodtruck.name !== 'Nazwa foodtrucka') {
      const detailsWrapper = details.current as HTMLDivElement;
      const burgerBtn = burgerWrapper.current as HTMLDivElement;
      const backBtn = backWrapper.current as HTMLDivElement;

      if (!detailsWrapper.classList.contains('exist')) detailsWrapper.classList.add('exist');

      if (currentFoodtruck.menu.dish.length > 1) backBtn.style.top = '-27.5rem';
      else backBtn.style.top = '-25.5rem';
      backBtn.classList.remove('hidden');
      detailsWrapper.classList.add('animate-down_to_top');
      if (currentFoodtruck.menu.dish.length > 1) burgerBtn.classList.add('animate-burger_move3');
      else burgerBtn.classList.add('animate-burger_move2');
      backBtn.classList.add('animate-appear');
      setTimeout(() => {
        detailsWrapper.classList.remove('translate-y-full');
        backBtn.classList.remove('opacity-0');
        backBtn.classList.remove('animate-hidden');
        detailsWrapper.classList.add('translate-y-0');
        burgerBtn.classList.remove('-translate-y-26');
        backBtn.classList.add('opacity-1');
        if (currentFoodtruck.menu.dish.length > 1) burgerBtn.classList.add('-translate-y-100');
        else burgerBtn.classList.add('-translate-y-98');
        detailsWrapper.classList.remove('animate-down_to_top');
        if (currentFoodtruck.menu.dish.length > 1)
          burgerBtn.classList.remove('animate-burger_move3');
        else burgerBtn.classList.remove('animate-burger_move2');
        backBtn.classList.remove('animate-appear');
      }, 400);
    } else {
      const detailsWrapper = details.current as HTMLDivElement;
      const burgerBtn = burgerWrapper.current as HTMLDivElement;
      const backBtn = backWrapper.current as HTMLDivElement;

      if (detailsWrapper.classList.contains('exist')) {
        detailsWrapper.classList.add('animate-top_to_down');
        if (isOpenSearch) burgerBtn.classList.add('animate-burger_back2');
        else burgerBtn.classList.add('animate-burger_back');
        backBtn.classList.add('animate-hidden');
        setTimeout(() => {
          backBtn.classList.remove('opacity-1');
          backBtn.classList.remove('animate-appear');
          backBtn.classList.remove('animate-hidden');
          detailsWrapper.classList.remove('translate-y-0');
          detailsWrapper.classList.add('translate-y-full');
          backBtn.classList.add('opacity-0');
          backBtn.classList.add('hidden');
          if (currentFoodtruck.menu.dish.length > 1) burgerBtn.classList.remove('-translate-y-100');
          burgerBtn.classList.remove('-translate-y-98');
          if (isOpenSearch) burgerBtn.classList.add('-translate-y-26');
          else burgerBtn.classList.add('translate-y-0');
          detailsWrapper.classList.remove('animate-top_to_down');
          if (isOpenSearch) burgerBtn.classList.remove('animate-burger_back2');
          else burgerBtn.classList.remove('animate-burger_back');
        }, 400);
      }
    }
  }, [currentFoodtruck]);

  return (
    <>
      <Wrapper>
        <SearchNav>
          <IconButton svg={search} onClick={handleOpen} />
        </SearchNav>
        <SearchWrapper {...getComboboxProps()} aria-label="searchWrapper">
          <TextLink className="text-gold justify-self-start" onClick={switchListMapVisible}>
            Zmień widok na {isMapVisible ? 'listę' : 'mapę'}
          </TextLink>
          <img src={dark_search} alt="" className="absolute bottom-5 left-6" />
          <Settings src={settings} alt="" onClick={handleSettingsVisible} />
          <StyledInput placeholder="Szukaj" {...getInputProps()} aria-label="searchInput" />
          <SearchResults
            isVisible={isOpen && isMapVisible && foodtrucks.length > 0}
            {...getMenuProps()}
          >
            {isOpen && foodtrucks
              ? foodtrucks.map((foodtruck, index) => (
                  <SearchResultsListItem
                    key={foodtruck.id}
                    textValue={foodtruck.searchingValue}
                    city={foodtruck.cityCountryOrDistrict}
                    highlighted={highlightedIndex === index}
                    {...getItemProps({ item: foodtruck, index })}
                  />
                ))
              : ''}
          </SearchResults>
        </SearchWrapper>
        <BackWrapper ref={backWrapper}>
          <IconButton svg={backArrow} onClick={() => setCurrentFoodtruck(foodtruckExample)} />
        </BackWrapper>
        <BurgerWrapper ref={burgerWrapper}>
          <IconButton
            svg={burger}
            onClick={handleClose}
            isRouterLink={currentFoodtruck.name !== 'Nazwa foodtrucka'}
            to={`/app/${currentFoodtruck.urlName}?isMapVisible=${isMapVisible}`}
          />
        </BurgerWrapper>
        <FoodtruckDetails foodtruck={currentFoodtruck as FoodtruckState} ref={details} />
      </Wrapper>
      {ReactDOM.createPortal(
        <>
          <SearchFilter
            setFilter={setFilter}
            setVisible={handleSettingsVisible}
            SortMode={SortMode}
            setSortMode={setSortMode}
            ref={filter}
          />
        </>,
        body
      )}
    </>
  );
};

export default SearchBar;
