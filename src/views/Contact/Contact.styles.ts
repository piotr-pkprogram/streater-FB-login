// @ts-ignore
import styled from 'styled-components';
import IconButton from 'components/atoms/IconButton/IconButton';

export const Wrapper = styled.div.attrs({
  className:
    'h-full grid justify-items-center items-center content-center min-h-screen max-w-full relative'
})``;

export const StyledForm = styled.form.attrs({
  className: 'grid gap-2 p-1 w-full justify-center mt-28'
})``;

export const StyledIcon = styled(IconButton).attrs({
  className: 'right-4 top-4 fixed bg-lightBlack rounded-full'
})``;
