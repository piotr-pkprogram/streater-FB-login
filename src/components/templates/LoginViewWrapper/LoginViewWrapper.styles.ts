// @ts-ignore
import styled from 'styled-components';
import bgLoginImage from 'assets/img/background-login-page.svg';
import IconButton from 'components/atoms/IconButton/IconButton';

export const Wrapper = styled.div.attrs({
  className:
    'h-full grid gap-2 justify-items-center max-w-full relative items-center content-center min-h-screen'
})`
  background-image: url(${() => bgLoginImage});
  background-size: auto 100%;
  background-position: 50%;
`;

export const BackBtn = styled(IconButton).attrs({ className: 'absolute top-3 left-3' })``;

export const StyledForm = styled.form.attrs({
  className: 'grid gap-2 p-1 w-full justify-center'
})``;

export const StyledSpan = styled.span.attrs({
  className:
    "mt-2 text-xs text-lightBlack font-bold flex justify-center items-center w-full relative before:content-[''] before:border-solid before:border-lightBlack before:border before:absolute before:left-0 after:content-[''] after:border-solid after:border-lightBlack after:border after:absolute after:right-0"
})`
  &:before,
  &:after {
    width: 65px;
  }
`;
