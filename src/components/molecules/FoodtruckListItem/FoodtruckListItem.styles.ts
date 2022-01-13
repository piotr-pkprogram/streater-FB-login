// @ts-ignore
import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled(Link).attrs({
  className:
    'grid grid-flow-col justify-items-center items-center gap-4 border-t-lightBlack text-xs border-solid border-t-2 p-1 text-lightBlack m-2'
})`
  grid-auto-columns: max-content max-content auto;
`;
