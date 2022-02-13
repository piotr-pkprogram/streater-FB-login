// @ts-ignore
import styled from 'styled-components';
import foodtruckImg from 'assets/img/foodTruckImg.jpg';

export const Wrapper = styled.div.attrs({
  className: 'p-3 grid gap-1 bg-lightBlack w-full'
})``;

export const DishWrapper = styled.div.attrs({
  className: 'grid grid-flow-col gap-2 items-center w-full'
})`
  grid-auto-columns: 50%;
`;

export const ImageWrapper = styled.div.attrs({
  className: 'min-h-56 w-full max-w-96 rounded-2xl no-repeat bg-center bg-cover'
})`
  background-image: url(${foodtruckImg});
`;
