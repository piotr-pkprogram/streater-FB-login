// @ts-ignore
import styled from 'styled-components';

export const Wrapper = styled.div.attrs({
  className: 'fixed left-0 top-0 h-screen w-72 z-20 grid grid-flow-col -translate-x-full'
})`
  grid-template-columns: auto max-content;
`;

export const MenuWrapper = styled.menu.attrs({
  className: 'bg-lightBlack h-full w-full shadow-2xl grid px-4'
})``;
