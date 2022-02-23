// @ts-ignore
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link).attrs({
  className: 'grid grid-flow-col gap-2 w-full pb-4 pr-6 border-gold border-b mt-4'
})`
  grid-auto-columns: max-content;
`;
