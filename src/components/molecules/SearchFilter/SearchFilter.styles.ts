// @ts-ignore
import styled from 'styled-components';
import { Switch } from '@mui/material';
import TextLink from 'components/atoms/TextLink/TextLink';

export const Wrapper = styled.div.attrs({
  className:
    'translate-y-full grid gap-3 bg-white p-5 items-center w-full h-full fixed bottom-0 z-30'
})`
  grid-auto-rows: max-content;
`;

export const StyledSwitch = styled(Switch)`
  & .MuiSwitch-thumb {
    background-color: ${({ checked }: { checked: boolean }) => (checked ? '#ffc92b' : '#3c3c3c')};
  }

  & .MuiSwitch-track {
    background-color: ${({ checked }: { checked: boolean }) =>
      checked ? '#ffc92b !important' : '#3c3c3c'};
  }

  & .MuiTouchRipple-root {
    color: ${({ checked }: { checked: boolean }) => (checked ? '#ffc92b' : '#3c3c3c')};
  }

  & .MuiSwitch-switchBase {
    color: ${({ checked }: { checked: boolean }) => (checked ? '#ffc92b' : '#3c3c3c')};
  }
`;

export const FilterWrapper = styled.div.attrs({
  className: 'w-max ml-4 py-1 px-3 rounded-xl'
})``;

export const FilterType = styled.label.attrs({
  className: 'font-semibold text-lightBlack cursor-pointer'
})``;

export const StyledLink = styled(TextLink).attrs({
  className: 'text-lightBlack text-2xl grid grid-flow-col items-center gap-2'
})`
  grid-auto-columns: max-content;
`;
