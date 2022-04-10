// @ts-ignore
import styled from 'styled-components';
import { InputBase } from '@mui/material';

export const InputWrapper = styled.div.attrs({
  className: 'col-start-1 col-end-3 w-full grid items-center gap-4'
})`
  grid-template-columns: 100px auto max-content;
`;

export const StyledForm = styled.form.attrs({
  className: 'grid bg-darkBlack p-2 rounded-md gap-4'
})`
  grid-template-columns: auto auto;
`;

export const InputPrizeWrapper = styled.div.attrs({
  className: 'grid gap-5 items-center'
})`
  grid-template-columns: 100px auto;
`;

export const InputSpicyWrapper = styled.div.attrs({
  className: 'grid items-center'
})`
  grid-template-columns: 100px max-content auto;
`;

export const StyledSelect = styled(InputBase)(() => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: '#fff',
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: 'border-color 300ms ease, box-shadow 300ms ease',
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#FFC92B',
      boxShadow: '0 0 0 0.2rem rgba(255, 201, 43, .15)',
      backgroundColor: '#fff'
    }
  }
}));
