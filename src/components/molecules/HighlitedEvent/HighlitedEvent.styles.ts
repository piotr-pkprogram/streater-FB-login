// @ts-ignore
import styled from 'styled-components';

export const Event = styled.div.attrs({ className: 'grid w-full gap-y-2' })`
  max-width: 300px;
  grid-auto-columns: 20% 80%;
`;

export const DateWrapper = styled.div.attrs({
  className: 'bg-gold grid rounded-lg col-start-1 text-white w-max justify-items-center font-bold'
})`
  grid-auto-rows: max-content;
  height: 50px;
  width: 50px;
`;
