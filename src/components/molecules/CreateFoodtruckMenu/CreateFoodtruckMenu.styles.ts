// @ts-ignore
import styled from 'styled-components';
import IconButton from 'components/atoms/IconButton/IconButton';

export const Wrapper = styled.div.attrs({
  className:
    'grid gap-8 bg-lightBlack p-8 w-full max-w-screen justify-center items-center rounded-t-3xl fixed bottom-0 translate-y-full z-20'
})`
  height: 570px;
  grid-auto-rows: max-content;
  transition: height 300ms ease;
`;

export const StyledIconBtn = styled(IconButton).attrs({
  className:
    'bg-gold grid justify-items-center items-center text-center text-xs font-medium sm3:rounded-sm w-full h-full sm3:p-2'
})`
  max-width: 98px;
  max-height: 98px;
`;
