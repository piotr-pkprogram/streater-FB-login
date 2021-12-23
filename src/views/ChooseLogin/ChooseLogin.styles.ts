// @ts-ignore
import styled from 'styled-components';
import bgLoginImage from 'assets/img/background-login-page.svg';

export const Wrapper = styled.div.attrs({
  className: 'h-full grid gap-2 justify-items-center content-center max-w-full relative'
})`
  background-image: url(${() => bgLoginImage});
  background-size: auto 100%;
  background-position: 50%;
`;
