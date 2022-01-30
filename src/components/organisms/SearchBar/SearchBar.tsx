import React, { useRef, useState } from 'react';
import {
  BurgerWrapper,
  SearchNav,
  SearchResults,
  SearchWrapper,
  Settings,
  StyledInput,
  Wrapper
} from './SearchBar.styles';
import IconButton from 'components/atoms/IconButton/IconButton';
import search from 'assets/img/search.svg';
import dark_search from 'assets/img/dark-search.svg';
import burger from 'assets/img/burger.svg';
import settings from 'assets/img/settings.svg';
import TextLink from 'components/atoms/TextLink/TextLink';
import { FoodtruckState } from 'types/Foodtrucktypes';
import SearchResultsListItem from 'components/molecules/SearchResultsListItem/SearchResultsListItem';
import { useCombobox } from 'downshift';
import { setLocation } from 'helpers/setLocation';
import { defaultMap } from 'components/organisms/FoodtrucksMap/FoodtrucksMap';
import SearchFilter from 'components/molecules/SearchFilter/SearchFilter';
import { FilterProp } from 'views/Guest/Guest';
import ReactDOM from 'react-dom';
import { SortModes } from 'hooks/useFoodtrucks';

type Props = {
  isMapVisible: boolean;
  switchListMapVisible: () => void;
  foodtrucks: FoodtruckState[];
  handleSearch: ({ inputValue }: { inputValue?: string }) => void;
  setFilter: (filter: FilterProp) => void;
  SortMode: SortModes;
  setSortMode: (mode: SortModes) => void;
};

const SearchBar = ({
  isMapVisible,
  switchListMapVisible,
  foodtrucks,
  handleSearch,
  setFilter,
  SortMode,
  setSortMode
}: Props) => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const filter = useRef<HTMLDivElement>(null);
  const burgerWrapper = useRef<HTMLDivElement>(null);

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
        burgerBtn.classList.add('-translate-y-24', 'bg-lightBlack');
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
        burgerBtn.classList.remove('-translate-y-24', 'bg-lightBlack');
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
            setLocation(location, defaultMap);
          }
        }
        return changes;
      }
    });

  return (
    <>
      <Wrapper>
        <SearchNav>
          <IconButton svg={search} onClick={handleOpen} />
        </SearchNav>
        <SearchWrapper {...getComboboxProps()} aria-label="searchWrapper">
          <TextLink className="text-white justify-self-start" onClick={switchListMapVisible}>
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
        <BurgerWrapper ref={burgerWrapper}>
          <IconButton svg={burger} onClick={handleClose} />
        </BurgerWrapper>
      </Wrapper>
      {ReactDOM.createPortal(
        <>
          <SearchFilter
            foodtrucks={foodtrucks || []}
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
