import React, { ChangeEvent, forwardRef, useState } from 'react';
import {
  FilterType,
  StyledSwitch,
  FilterWrapper,
  Wrapper,
  StyledLink
} from './SearchFilter.styles';
import { FiltersTypes, kitchens, SortModes } from 'hooks/useFoodtrucks';
import Checkbox from 'components/atoms/Checkbox/Checkbox';
import { FilterProp } from 'views/Dashboard/Dashboard';
import IconButton from 'components/atoms/IconButton/IconButton';
import back from 'assets/img/next.svg';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

type Props = {
  setFilter: (filter: FilterProp | null) => void;
  setVisible: (isVisible: boolean) => void;
  SortMode: SortModes;
  setSortMode: (mode: SortModes) => void;
};

const SearchFilter = forwardRef(({ setFilter, setVisible, SortMode, setSortMode }: Props, ref) => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isSortVisible, setSortVisible] = useState(false);
  const [isSwitchCheck, setIsSwitchCheck] = useState(false);

  const switchFilterVisible = () => {
    setFilterVisible(!isFilterVisible);
  };

  const switchSortVisible = () => {
    setSortVisible(!isSortVisible);
  };

  const onSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsSwitchCheck(e.target.checked);
    setFilter({
      type: FiltersTypes.closeOpen,
      value: isSwitchCheck ? 'close' : 'open'
    });
  };

  const handleSelectChange = (evt: SelectChangeEvent) => {
    setSortMode(evt.target.value as SortModes);
  };

  return (
    <Wrapper ref={ref}>
      <IconButton
        svg={back}
        className={'rotate-180 scale-150 absolute top-3 left-2 w-8'}
        onClick={setVisible}
      />
      <StyledLink className="mt-10" onClick={switchFilterVisible}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="24"
          height="24"
          x="0"
          y="0"
          viewBox="0 0 368.167 368.167"
          className=""
        >
          <g>
            <g xmlns="http://www.w3.org/2000/svg">
              <g>
                <g>
                  <path
                    d="M248.084,96.684h12c4.4,0,8-3.6,8-8c0-4.4-3.6-8-8-8h-12c-4.4,0-8,3.6-8,8C240.084,93.084,243.684,96.684,248.084,96.684     z"
                    fill="#3c3c3c"
                    data-original="#000000"
                    className=""
                  />
                  <path
                    d="M366.484,25.484c-2.8-5.6-8.4-8.8-14.4-8.8h-336c-6,0-11.6,3.6-14.4,8.8c-2.8,5.6-2,12,1.6,16.8l141.2,177.6v115.6     c0,6,3.2,11.2,8.4,14c2.4,1.2,4.8,2,7.6,2c3.2,0,6.4-0.8,9.2-2.8l44.4-30.8c6.4-4.8,10-12,10-19.6v-78.8l140.8-177.2     C368.484,37.484,369.284,31.084,366.484,25.484z M209.684,211.884c-0.8,1.2-1.6,2.8-1.6,4.8v81.2c0,2.8-1.2,5.2-3.2,6.8     l-44.4,30.8v-118.8c0-2.8-1.2-5.2-3.2-6.4l-90.4-113.6h145.2c4.4,0,8-3.6,8-8c0-4.4-3.6-8-8-8h-156c-0.4,0-1.2,0-1.6,0l-38.4-48     h336L209.684,211.884z"
                    fill="#3c3c3c"
                    data-original="#000000"
                    className=""
                  />
                </g>
              </g>
            </g>
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
          </g>
        </svg>
        <span>Filtruj</span>
      </StyledLink>
      {isFilterVisible ? (
        <FilterWrapper>
          <div>
            <FilterType htmlFor={FiltersTypes.closeOpen}>Otwarte Teraz</FilterType>
            <StyledSwitch
              checked={isSwitchCheck}
              onChange={onSwitchChange}
              id={FiltersTypes.closeOpen}
            />
          </div>
          <div>
            <FilterType as="span" className="!cursor-auto">
              Rodzaje Kuchni
            </FilterType>
            <ul className="ml-3">
              {kitchens.map((kitchen, i) => {
                return (
                  <li key={i}>
                    <Checkbox
                      label={kitchen.replaceAll('_', ' ')}
                      opt={`${kitchen}`.toLowerCase()}
                      setFilter={setFilter}
                      index={i}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </FilterWrapper>
      ) : (
        ''
      )}
      <StyledLink onClick={switchSortVisible}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          width="24"
          height="24"
          x="0"
          y="0"
          viewBox="0 0 489.4 489.4"
        >
          <g>
            <g xmlns="http://www.w3.org/2000/svg">
              <g>
                <path
                  d="M370.2,468.9c0,6.8,5.5,12.3,12.3,12.3s12.3-5.5,12.3-12.3V50.1l73.6,73.6c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6    c4.8-4.8,4.8-12.5,0-17.3l-94.5-94.5c-4.6-4.6-12.7-4.6-17.3,0l-94.5,94.5c-4.8,4.8-4.8,12.5,0,17.3c4.8,4.8,12.5,4.8,17.3,0    l73.6-73.6v418.8H370.2z"
                  fill="#757575"
                  data-original="#000000"
                />
                <path
                  d="M209.9,365.7c-4.8-4.8-12.5-4.8-17.3,0L119,439.3V20.5c0-6.8-5.5-12.3-12.3-12.3s-12.3,5.5-12.3,12.3v418.8l-73.5-73.6    c-4.8-4.8-12.5-4.8-17.3,0s-4.8,12.5,0,17.3l94.5,94.5c2.4,2.4,5.5,3.6,8.7,3.6s6.3-1.2,8.7-3.6L210,383    C214.6,378.3,214.6,370.5,209.9,365.7z"
                  fill="#757575"
                  data-original="#000000"
                />
              </g>
            </g>
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
            <g xmlns="http://www.w3.org/2000/svg" />
          </g>
        </svg>
        <span>Sortuj</span>
      </StyledLink>
      {isSortVisible ? (
        <FilterWrapper>
          <FormControl fullWidth>
            <InputLabel id={SortModes.CHOOSE}>Wybierz</InputLabel>
            <Select
              labelId={SortModes.CHOOSE}
              id={SortModes.CHOOSE}
              value={SortMode}
              label={SortModes.CHOOSE}
              onChange={handleSelectChange}
              className="min-w-36"
            >
              <MenuItem value={SortModes.DISTANCE}>{SortModes.DISTANCE}</MenuItem>
              <MenuItem value={SortModes.RATES}>{SortModes.RATES}</MenuItem>
              <MenuItem value={SortModes.FAVOURITE}>{SortModes.FAVOURITE}</MenuItem>
              <MenuItem value={SortModes.AMOUT_OF_RATES}>{SortModes.AMOUT_OF_RATES}</MenuItem>
            </Select>
          </FormControl>
        </FilterWrapper>
      ) : (
        ''
      )}
    </Wrapper>
  );
});

SearchFilter.propTypes = {};

export default SearchFilter;
