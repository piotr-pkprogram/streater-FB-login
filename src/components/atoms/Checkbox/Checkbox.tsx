import React, { ChangeEvent, useState } from 'react';
import { Checkbox as MuiCheckbox } from '@mui/material';

type Props = {
  label: string;
  opt: string;
  handleChecked?: (e: ChangeEvent<HTMLInputElement>) => void;
  isFormField?: boolean;
  className?: string;
  checked?: boolean;
};

const Checkbox = ({
  label,
  opt,
  handleChecked,
  isFormField,
  className,
  checked = false
}: Props) => {
  const [isCheckboxCheck, setIsCheckboxCheck] = useState(checked);

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxCheck(e.target.checked);
    if (handleChecked) {
      handleChecked(e);
    }
  };

  return isFormField ? (
    <>
      <label className="text-gold font-semibold cursor-pointer" htmlFor={opt}>
        {label}
      </label>
      <MuiCheckbox
        id={opt}
        name={opt}
        size="small"
        className={className}
        checked={isCheckboxCheck}
        onChange={onCheckboxChange}
        aria-label="controlled"
        sx={{
          color: '#fff',
          '&.Mui-checked': {
            color: '#fff'
          }
        }}
      />
    </>
  ) : (
    <>
      <MuiCheckbox
        id={opt}
        size="small"
        className={className}
        checked={isCheckboxCheck}
        onChange={onCheckboxChange}
        aria-label="controlled"
        sx={{
          color: '#FFC92B',
          '&.Mui-checked': {
            color: '#FFC92B'
          }
        }}
      />
      <label className="text-sm text-gray-500 font-semibold cursor-pointer" htmlFor={opt}>
        {label}
      </label>
    </>
  );
};

export default Checkbox;
