// @ts-ignore
import styled from 'styled-components';
import { Checkbox } from '@mui/material';

export const StyledCheckbox = styled(Checkbox)`
  color: ${({ checked }: { checked: boolean }) => (checked ? '#ffc92b !important' : '')};

  & .MuiSvgIcon-root {
    border: ${({ checked }: { checked: boolean }) => (checked ? 'solid 1px #ffc92b' : 'none')};
    border-radius: 5px;
    transition: border 300ms ease;
  }
`;
