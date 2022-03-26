import React from 'react';
import {
  ImageWrapper,
  Wrapper
} from 'components/templates/EventFoodtruckViewWrapper/EventFoodtruckViewWrapper.styles';
import SimpleViewsLayout from 'components/templates/SimpleViewsLayout/SimpleViewsLayout';

type Props = {
  children: JSX.Element | JSX.Element[];
  img: string;
};

const EventFoodtruckViewWrapper = ({ children, img }: Props) => {
  return (
    <SimpleViewsLayout>
      <ImageWrapper
        style={{
          backgroundImage: `url(${img})`
        }}
      />
      <Wrapper>{children}</Wrapper>
    </SimpleViewsLayout>
  );
};

export default EventFoodtruckViewWrapper;
