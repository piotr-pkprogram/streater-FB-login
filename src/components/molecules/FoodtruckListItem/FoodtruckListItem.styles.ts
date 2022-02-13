// @ts-ignore
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link).attrs({
  className:
    'grid grid-flow-col justify-items-center items-center gap-4 border-lightBlack text-xs border-solid border-t-2 last:pb-2 last:border-b-2 p-1 text-lightBlack m-2'
})`
  grid-auto-columns: max-content max-content auto;
`;

export const KitchenWrapper = styled.div.attrs({
  className: 'row-start-2 col-1/2 justify-self-start mr-4 text-base grid justify-items-start'
})`
  @media (min-width: 425px) {
    grid-row-start: 1;
    justify-self: end;
    justify-items: end;
    grid-column: 3;
  }
`;
