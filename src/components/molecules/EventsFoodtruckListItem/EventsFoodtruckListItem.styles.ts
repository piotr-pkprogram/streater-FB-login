// @ts-ignore
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link).attrs({
  className:
    'grid grid-flow-col gap-3 w-full pb-4 pr-2 sm2:pr-6 border-gold border-b-2 mt-4 items-center'
})`
  @media (min-width: 470px) {
    grid-auto-columns: max-content;
  }
`;

export const EventImg = styled.img.attrs({ className: 'rounded-lg w-full hidden xsm:block' })`
  max-width: 152px;
  height: 91.19px;
`;
