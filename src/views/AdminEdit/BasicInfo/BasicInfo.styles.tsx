// @ts-ignore
import styled from 'styled-components';
import { Input } from 'components/atoms/Input/Input';

export const StyledForm = styled.form.attrs({
  className: 'grid gap-2 p-1 w-full text-white font-medium grid-cols-2 items-center'
})`
  grid-template-columns: max-content minmax(354px, auto);
`;

export const StyledInput = styled(Input).attrs({ className: '!bg-darkBlack text-gold w-full' })`
  height: 48px;

  &#desc {
    height: auto;
    min-height: 217px;
  }
`;
