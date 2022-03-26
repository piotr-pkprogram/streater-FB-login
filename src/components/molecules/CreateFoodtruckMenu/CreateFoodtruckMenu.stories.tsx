import React from 'react';
import CreateFoodtruckMenu from './CreateFoodtruckMenu';
import { v4 as uuidv4 } from 'uuid';

export default {
  title: 'components/molecules/CreateFoodtruckMenu',
  component: CreateFoodtruckMenu
};

const Template = (args: object) => (
  <CreateFoodtruckMenu
    onCloseClick={() => {}}
    foodtruck={{
      id: uuidv4(),
      name: 'Bafra Kebab Smolec',
      description: 'Foodtruck z Kebabem Smolec',
      location: {
        coordinates: {
          longitude: 16.9068851,
          latitude: 51.0851009
        },
        address: {
          country: 'Poland',
          city: 'Smolec',
          street: 'Bukowa',
          zipcode: '55-080',
          houseNumber: 1,
          district: 'Dolnośląskie'
        }
      },
      openingTime: {
        openingHours: {
          openingHour: 10,
          openingMinute: 0,
          closingHour: 21,
          closingMinute: 0
        },
        openingWeekdays: [
          {
            isOpen: true,
            weekDay: 0
          },
          {
            isOpen: true,
            weekDay: 1
          },
          {
            isOpen: true,
            weekDay: 2
          },
          {
            isOpen: true,
            weekDay: 3
          },
          {
            isOpen: true,
            weekDay: 4
          },
          {
            isOpen: true,
            weekDay: 6
          }
        ]
      },
      menu: {
        dish: [
          {
            name: 'Kebab Tortila Mały',
            description: 'pomidory San Marzano D.O.P, mozzarella, świeża bazylia',
            prize: 13.0,
            weight: 20,
            volume: 2,
            quantity: 20,
            isAvailable: true
          },
          {
            name: 'Tortila Falafel',
            description: 'pomidory San Marzano D.O.P, mozzarella, salami napoli',
            prize: 16.0,
            weight: 20,
            volume: 2,
            quantity: 20,
            isAvailable: true
          },
          {
            name: 'Kebab w bułce',
            description: '',
            prize: 16.0,
            weight: 20,
            volume: 2,
            quantity: 20,
            isAvailable: true
          }
        ],
        kitchenType: [1, 2, 3]
      },
      pictures: ['string'],
      isOpen: true,
      comments: [
        {
          title: 'Is awesome climate',
          body: 'Lorem ipsum',
          author: 'Piotr Kułakowski',
          rating: 4,
          additionDate: new Date('2022-01-23T18:57:58.088Z')
        }
      ],
      rating: 4,
      link: 'befra-kebab-smolec'
    }}
    {...args}
  />
);

export const Default = Template.bind([]);
