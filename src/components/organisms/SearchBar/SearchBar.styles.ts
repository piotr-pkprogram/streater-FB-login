// @ts-ignore
import styled from 'styled-components';
import { Input } from 'components/atoms/Input/Input';

export const Wrapper = styled.div.attrs({
  className: 'fixed bottom-0 w-full'
})``;

export const SearchWrapper = styled.div.attrs({
  className:
    'bg-lightBlack w-full py-2 px-3 grid grid-flow-col gap-2 absolute z-10 bottom-0 translate-y-full'
})``;

export const SearchNav = styled.div.attrs({
  className: 'bg-lightBlack w-full py-2 px-3 grid grid-flow-col gap-2 rounded-t-3xl'
})``;

export const BurgerWrapper = styled.div.attrs({
  className: 'absolute z-20 right-0 top-1 py-2 px-5 rounded-t-3xl'
})``;

export const StyledInput = styled(Input).attrs({
  className: 'row-start-2 pl-14'
})``;
