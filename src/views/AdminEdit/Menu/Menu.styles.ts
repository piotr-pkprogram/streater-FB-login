// @ts-ignore
import styled from 'styled-components';

export const AddDishes = styled.div.attrs({
  className:
    'w-full flex-wrap flex gap-2 items-center justify-center bg-gold text-black font-medium p-5 xs:p-10 xsm:px-1/12 cursor-pointer hover:opacity-70 transition-opacity rounded-md max-w-screen'
})`
  max-width: 385px;
`;

export const AddCategory = styled.div.attrs({
  className:
    'w-full flex flex-wrap items-center gap-6 justify-center bg-gold text-black cursor-pointer hover:opacity-70 transition-opacity rounded-sm max-w-screen p-3 mb-2'
})`
  max-width: 365px;
`;

export const Warning = styled.div.attrs({
  className: 'relative bg-gold text-black pt-7 pl-6 pb-4 pr-4 rounded-sm'
})``;
