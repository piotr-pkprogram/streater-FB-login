import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

type Props = {
  rating: number;
  ratingColor?: string;
  readonly?: boolean;
};

const StarRating = ({ rating, ratingColor = '#3C3C3C', readonly = false }: Props) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(0);
  const stars = Array(5).fill(0);

  const handleClick = (value: number) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue: number) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(0);
  };

  const setColor = (index: number) =>
    readonly
      ? rating > index
        ? ratingColor
        : '#ccc'
      : (hoverValue || currentValue) > index
      ? ratingColor
      : '#ccc';

  return (
    <div className="flex items-center">
      {stars.map((_, index) => {
        return readonly ? (
          <FaStar className="mr-2" key={index} size={24} color={setColor(index)} />
        ) : (
          <FaStar
            className="mr-2 cursor-pointer"
            key={index}
            size={18}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
            color={setColor(index)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
