// @ts-ignore
import styled from 'styled-components';

export const Wrapper = styled.div.attrs({
  className:
    'bg-lightBlack grid grid-flow-col gap-2 w-max text-white p-3 border-t-2 border-darkBlack'
})`
  max-width: 385px;
`;

export const SpicyWrapper = styled.p.attrs({ className: 'grid grid-flow-col w-full gap-4' })`
  grid-template-columns: max-content auto;
`;

export const PrizeWrapper = styled.p.attrs({ className: 'grid grid-flow-col w-full gap-4' })``;
