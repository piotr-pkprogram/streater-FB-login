import React, { useState } from 'react';

type Props = {
  spicyLevel: number;
  readonly?: boolean;
};

const SpicyLevel = ({ spicyLevel, readonly = false }: Props) => {
  const [currentValue, setCurrentValue] = useState(spicyLevel);
  const [hoverValue, setHoverValue] = useState(0);
  const pepers = Array(4).fill(0);

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
      ? spicyLevel > index
        ? '#FF4141'
        : '#4E4E4E'
      : (hoverValue || currentValue) > index
      ? '#FF4141'
      : '#4E4E4E';

  return (
    <div className="flex items-center">
      {pepers.map((_, index) => {
        return readonly ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24.804"
            viewBox="0 0 20 24.804"
            key={index}
          >
            <path
              id="Icon_awesome-pepper-hot"
              data-name="Icon awesome-pepper-hot"
              d="M11.626,9.251V6.1L9.771,5.246c-2.056,2.446-2.825,8.818-7.8,8.818a1.969,1.969,0,0,0,0,3.938,19.318,19.318,0,0,0,10.058-2.859,13.415,13.415,0,0,0,4.68-4.536L15.4,9.251Zm4.609-4.513a4.155,4.155,0,0,0-.11-4.632A.281.281,0,0,0,15.7.085L14.9.894a.283.283,0,0,0-.031.36A2.465,2.465,0,0,1,14.819,3.8a4.965,4.965,0,0,0-4.694.374l2.625,1.206V8.126h3.132l1.922,2A5.493,5.493,0,0,0,18,8.744a5.414,5.414,0,0,0-1.766-4.006Z"
              transform="matrix(0.848, -0.53, 0.53, 0.848, -0.001, 9.538)"
              fill={setColor(index)}
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24.804"
            viewBox="0 0 20 24.804"
            className="cursor-pointer"
            key={index}
            onClick={() => handleClick(index + 1)}
            onMouseOver={() => handleMouseOver(index + 1)}
            onMouseLeave={handleMouseLeave}
          >
            <path
              id="Icon_awesome-pepper-hot"
              data-name="Icon awesome-pepper-hot"
              d="M11.626,9.251V6.1L9.771,5.246c-2.056,2.446-2.825,8.818-7.8,8.818a1.969,1.969,0,0,0,0,3.938,19.318,19.318,0,0,0,10.058-2.859,13.415,13.415,0,0,0,4.68-4.536L15.4,9.251Zm4.609-4.513a4.155,4.155,0,0,0-.11-4.632A.281.281,0,0,0,15.7.085L14.9.894a.283.283,0,0,0-.031.36A2.465,2.465,0,0,1,14.819,3.8a4.965,4.965,0,0,0-4.694.374l2.625,1.206V8.126h3.132l1.922,2A5.493,5.493,0,0,0,18,8.744a5.414,5.414,0,0,0-1.766-4.006Z"
              transform="matrix(0.848, -0.53, 0.53, 0.848, -0.001, 9.538)"
              fill={setColor(index)}
            />
          </svg>
        );
      })}
    </div>
  );
};

export default SpicyLevel;
