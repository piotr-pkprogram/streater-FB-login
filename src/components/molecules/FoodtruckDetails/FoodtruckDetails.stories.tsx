import React from 'react';
import FoodtruckDetails from 'components/molecules/FoodtruckDetails/FoodtruckDetails';
import { foodtruckExample } from 'data/foodtruck';

export default {
  title: 'components/organisms/FoodtruckDetails',
  component: FoodtruckDetails,
  argTypes: {
    foodtruck: {
      defaultValue: foodtruckExample,
      type: 'object'
    }
  }
};

// @ts-ignore
const Template = (args: object) => <FoodtruckDetails {...args} />;

export const Default = Template.bind([]);
