import React from 'react';
import DishBox from './DishBox';

export default {
  title: 'components/molecules/DishBox',
  component: DishBox
};

// @ts-ignore
const Template = (args: object) => <DishBox {...args} />;

export const Default = Template.bind([]);
// @ts-ignore
Default.args = {
  dish: {
    name: 'Kebab Tortila Mały',
    description: 'Pomidory San Marzano D.O.P, mozzarella, świeża bazylia',
    prize: 13.0,
    weight: 20,
    volume: 2,
    quantity: 20,
    isAvailable: true,
    DishCategory: 'Kebab',
    VeganLevel: 0,
    SpicyLevel: 2
  }
};

export const Vegetarian = Template.bind([]);
// @ts-ignore
Vegetarian.args = {
  dish: {
    name: 'Kebab Tortila Mały',
    description: 'Pomidory San Marzano D.O.P, mozzarella, świeża bazylia',
    prize: 13.0,
    weight: 20,
    volume: 2,
    quantity: 20,
    isAvailable: true,
    DishCategory: 'Kebab',
    VeganLevel: 1,
    SpicyLevel: 2
  }
};

export const Vegan = Template.bind([]);
// @ts-ignore
Vegan.args = {
  dish: {
    name: 'Kebab Tortila Mały',
    description: 'Pomidory San Marzano D.O.P, mozzarella, świeża bazylia',
    prize: 13.0,
    weight: 20,
    volume: 2,
    quantity: 20,
    isAvailable: true,
    DishCategory: 'Kebab',
    VeganLevel: 2,
    SpicyLevel: 2
  }
};

export const NotSpicy = Template.bind([]);
// @ts-ignore
NotSpicy.args = {
  dish: {
    name: 'Kebab Tortila Mały',
    description: 'Pomidory San Marzano D.O.P, mozzarella, świeża bazylia',
    prize: 13.0,
    weight: 20,
    volume: 2,
    quantity: 20,
    isAvailable: true,
    DishCategory: 'Kebab',
    VeganLevel: 2,
    SpicyLevel: 0
  }
};
