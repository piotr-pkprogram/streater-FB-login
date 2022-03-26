// @ts-ignore
import styled from 'styled-components';
import { Input } from 'components/atoms/Input/Input';

export const StyledInput = styled(Input).attrs({
  className: '!bg-darkBlack text-gold w-full font-normal !px-3'
})`
  height: 48px;

  &#desc {
    height: auto;
    min-height: 217px;
  }

  &::placeholder {
    color: rgb(255 201 43);
  }
`;

export const SuggestItemsWrapper = styled.div.attrs({ className: 'overflow-auto grid gap-3' })`
  visibility: ${({ isVisible }: { isVisible: boolean }) => (isVisible ? 'visible' : 'hidden')};
  max-height: 100px;
`;
export const MapWrapper = styled.div.attrs({ className: 'grid gap-2' })`
  grid-template-rows: auto minmax(200px, 425px);
`;

export const Wrapper = styled.div.attrs({ className: 'text-white grid gap-3' })`
  grid-template-rows: auto minmax(0, 450px) auto auto;
`;
