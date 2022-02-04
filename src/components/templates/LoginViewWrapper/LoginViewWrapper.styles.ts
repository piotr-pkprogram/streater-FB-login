// @ts-ignore
import styled from 'styled-components';
import IconButton from 'components/atoms/IconButton/IconButton';

export const Wrapper = styled.div.attrs({
  className:
    'h-full grid gap-2 justify-items-center max-w-full relative items-center content-center min-h-screen'
})``;

export const BackBtn = styled(IconButton).attrs({
  className: 'absolute top-3 left-0 rotate-180 w-14'
})``;

export const StyledForm = styled.form.attrs({
  className: 'grid gap-2 p-1 w-full justify-center'
})``;

export const StyledSpan = styled.span.attrs({
  className:
    "mt-2 text-xs text-lightBlack font-semibold flex justify-center items-center w-full relative xxs:before:content-[''] xxs:before:border-solid xxs:before:border-gold xxs:before:border xxs:before:absolute xxs:before:left-0 xxs:after:content-[''] xxs:after:border-solid xxs:after:border-gold xxs:after:border xxs:after:absolute xxs:after:right-0"
})`
  &:before,
  &:after {
    width: 65px;
  }
`;
