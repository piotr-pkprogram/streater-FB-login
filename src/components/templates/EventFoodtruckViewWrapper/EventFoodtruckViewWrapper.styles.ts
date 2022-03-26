//@ts-ignore
import styled from 'styled-components';
import IconButton from 'components/atoms/IconButton/IconButton';

export const Wrapper = styled.div.attrs({
  className: 'absolute top-48 w-full rounded-t-2xl p-2 bg-white z-20'
})``;

export const ImageWrapper = styled.div.attrs({
  className: 'min-h-56 w-full no-repeat bg-center bg-cover'
})``;

export const StyledIcon = styled(IconButton).attrs({
  className: 'right-4 top-4 fixed bg-lightBlack rounded-full '
})``;
