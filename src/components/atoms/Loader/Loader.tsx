import React from 'react';
import { StyledSvg } from 'components/atoms/Loader/Loader.styles';

const Loader = (props: React.HTMLAttributes<HTMLOrSVGElement>) => (
  <StyledSvg viewBox="25 25 50 50" {...props}>
    <circle cx="50" cy="50" r="20"></circle>
  </StyledSvg>
);

export default Loader;
