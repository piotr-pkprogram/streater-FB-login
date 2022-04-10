// @ts-ignore
import styled from 'styled-components';

export const Wrapper = styled.div.attrs({
  className:
    'fixed left-0 top-0 h-screen w-screen xs:w-76 z-30 grid grid-flow-col -translate-x-full max-w-screen'
})`
  grid-template-columns: auto max-content;
`;

export const MenuWrapper = styled.menu.attrs({
  className: 'bg-lightBlack h-full w-full shadow-2xl grid px-4'
})``;
