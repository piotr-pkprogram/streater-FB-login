// @ts-ignore
import styled from 'styled-components';

export const Wrapper = styled.div.attrs({
  className: 'grid grid-flow-col gap-5 w-full items-center border-gold border-2 border-solid p-3'
})`
  --tw-border-opacity: 0.2;
  grid-auto-columns: max-content auto max-content;
`;

export const Settings = styled.img.attrs({
  className: 'h-auto w-8 cursor-pointer hover:opacity-70 transition-opacity'
})``;
