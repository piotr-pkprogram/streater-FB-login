import React, { useRef, useState } from 'react';
import { Wrapper, BurgerWrapper, SearchWrapper, StyledInput, SearchNav } from './SearchBar.styles';
import IconButton from 'components/atoms/IconButton/IconButton';
import search from 'assets/img/search.svg';
import dark_search from 'assets/img/dark-search.svg';
import burger from 'assets/img/burger.svg';
import TextLink from 'components/atoms/TextLink/TextLink';

const SearchBar = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const searchWrapper = useRef<HTMLDivElement>(null);
  const burgerWrapper = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    if (!isOpenSearch) {
      const searchBar = searchWrapper.current as HTMLDivElement;
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
      const searchBar = searchWrapper.current as HTMLDivElement;
      const burgerBtn = burgerWrapper.current as HTMLDivElement;

      searchBar.classList.add('animate-top_to_down');
      burgerBtn.classList.add('animate-burger_back');

      setTimeout(() => {
        searchBar.classList.remove('translate-y-0');
        burgerBtn.classList.remove('-translate-y-24', 'bg-lightBlack');
        searchBar.classList.add('translate-y-full');
        searchBar.classList.remove('animate-top_to_down');
        burgerBtn.classList.remove('animate-burger_back');
        setIsOpenSearch(false);
      }, 500);
    }
  };

  return (
    <Wrapper>
      <SearchNav>
        <IconButton svg={search} onClick={handleOpen} />
      </SearchNav>
      <SearchWrapper ref={searchWrapper}>
        <TextLink classNames="text-white justify-self-start">Zmień widok na listę</TextLink>
        <img src={dark_search} alt="" className="absolute bottom-5 left-6" />
        <StyledInput placeholder="Szukaj" />
      </SearchWrapper>
      <BurgerWrapper ref={burgerWrapper}>
        <IconButton svg={burger} onClick={handleClose} />
      </BurgerWrapper>
    </Wrapper>
  );
};

export default SearchBar;
