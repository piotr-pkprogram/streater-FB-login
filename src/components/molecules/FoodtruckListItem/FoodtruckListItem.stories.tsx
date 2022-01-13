import React from 'react';
import FoodtruckListItem from './FoodtruckListItem';
import { foodtruckExample } from 'data/foodtruck';

export default {
  title: 'components/molecules/FoodtruckListItem',
  component: FoodtruckListItem,
  argTypes: {
    foodtruck: {
      defaultValue: foodtruckExample,
      type: 'object'
    }
  }
};

// @ts-ignore
const Template = (args: object) => <FoodtruckListItem {...args} />;

export const Default = Template.bind({});
