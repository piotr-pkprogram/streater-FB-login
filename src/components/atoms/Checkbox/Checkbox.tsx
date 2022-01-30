import React, { ChangeEvent, useState } from 'react';
import { StyledCheckbox } from './Checkbox.styles';

type Props = {
  label: string;
  opt: string;
};

const Checkbox = ({ label, opt }: Props) => {
  const [isCheckboxCheck, setIsCheckboxCheck] = useState(false);

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxCheck(e.target.checked);
  };

  return (
    <>
      <StyledCheckbox
        id={opt}
        size="small"
        checked={isCheckboxCheck}
        onChange={onCheckboxChange}
        aria-label="controlled"
      />
      <label className="text-sm text-gray-500 font-semibold cursor-pointer" htmlFor={opt}>
        {label}
      </label>
    </>
  );
};

export default Checkbox;
