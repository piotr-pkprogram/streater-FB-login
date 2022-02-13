import React, { ChangeEvent, useState } from 'react';
import { StyledCheckbox } from './Checkbox.styles';
import { FilterProp } from 'views/Guest/Guest';
import { FiltersTypes } from 'hooks/useFoodtrucks';

type Props = {
  label: string;
  opt: string;
  setFilter?: (filter: FilterProp | null) => void;
  index?: number;
};

let kitchens: string[] = [];
const Checkbox = ({ label, opt, setFilter, index }: Props) => {
  const [isCheckboxCheck, setIsCheckboxCheck] = useState(false);

  const onCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setIsCheckboxCheck(e.target.checked);
    if (setFilter) {
      if (e.target.checked) kitchens[index as number] = opt;
      else delete kitchens[index as number];

      if (kitchens.length > 0)
        setFilter({
          type: FiltersTypes.kitchen_type,
          value: kitchens
        });
      else setFilter(null);
    }
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
