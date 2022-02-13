// @ts-ignore
import styled from 'styled-components';
import foodtruckImg from 'assets/img/foodTruckImg.jpg';
import IconButton from 'components/atoms/IconButton/IconButton';

export const ImageWrapper = styled.div.attrs({
  className: 'min-h-56 w-full no-repeat bg-center bg-cover'
})`
  background-image: url(${foodtruckImg});
`;

export const StyledIcon = styled(IconButton).attrs({
  className: 'right-4 top-4 fixed bg-lightBlack rounded-full'
})``;

export const FoodtruckWrapper = styled.div.attrs({
  className: 'w-full rounded-t-2xl p-2 grid relative bg-white z-20'
})``;
