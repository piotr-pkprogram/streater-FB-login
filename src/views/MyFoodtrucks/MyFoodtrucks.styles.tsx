// @ts-ignore
import styled from 'styled-components';
import myFoodtrucksBg from 'assets/icons/my-foodtrucks-bg.svg';

export const Wrapper = styled.div.attrs({
  className: 'w-full min-h-screen relative pt-24 grid justify-items-center gap-4'
})`
  grid-auto-rows: max-content;
`;

export const Foodtrucks = styled.div.attrs({
  className: 'bg-no-repeat bg-center w-full'
})`
  background-image: url(${myFoodtrucksBg});
  height: 77.49px;
`;

export const AddFoodTrucks = styled.div.attrs({
  className:
    'w-full flex-wrap flex gap-2 items-center justify-center bg-lightBlack text-white font-medium p-5 xs:p-10 xsm:px-1/12 cursor-pointer hover:opacity-70 transition-opacity rounded-md max-w-screen'
})``;
