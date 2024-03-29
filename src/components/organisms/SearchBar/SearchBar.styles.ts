// @ts-ignore
import styled from 'styled-components';
import { Input } from 'components/atoms/Input/Input';

export const Wrapper = styled.div.attrs({
  className: 'fixed bottom-0 w-full'
})``;

export const SearchWrapper = styled.div.attrs({
  className:
    'bg-lightBlack w-full py-2 px-3 grid grid-flow-col gap-2 absolute z-30 bottom-0 translate-y-full'
})``;

export const SearchNav = styled.div.attrs({
  className: 'bg-lightBlack w-full py-2 px-3 grid grid-flow-col gap-2 rounded-t-3xl'
})``;

export const BurgerWrapper = styled.div.attrs({
  className: 'absolute z-20 right-0 top-1 py-2 px-5 rounded-t-3xl bg-lightBlack'
})``;

export const BackWrapper = styled.div.attrs({
  className: `absolute hidden opacity-0 z-20 left-0 bg-lightBlack flex items-center -top-97 rounded-t-2xl`
})`
  padding: 13.5px 24.9px;
`;

export const StyledInput = styled(Input).attrs({
  className: 'row-start-2 pl-14'
})``;

export const SearchResults = styled.div.attrs({
  className: 'absolute bg-white shadow-md bottom-32 rounded-lg min-w-72 left-5'
})`
  visibility: ${({ isVisible }: { isVisible: boolean }) => (isVisible ? 'visible' : 'hidden')};
`;

export const Settings = styled.img.attrs({
  className: 'absolute bottom-7 right-8 cursor-pointer hover:opacity-70 transition-opacity'
})``;
