import React from 'react';
import EventListItem from './EventListItem';
import { v4 as uuidv4 } from 'uuid';

export default {
  title: 'components/molecules/EventListItem',
  component: EventListItem
};

const Template = (args: object) => (
  <EventListItem
    event={{
      id: '6213e22d483622eedafda3ab',
      foodTrucksIds: [
        '620604c0695224405dafa27e',
        '6207d855d42e2dc2057c2633',
        '6207d9d0d42e2dc2057c263e',
        '6207dd87d42e2dc2057c2763',
        '620fafe0da4b7405a5d49d70',
        '621216532b22f3a59d560593'
      ],
      date: new Date('2022-02-20T15:33:09Z'),
      name: 'jakiś event',
      description: 'coś tam, lorem ipsum',
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
          openingMinute: 30,
          closingHour: 23,
          closingMinute: 59
        },
        openingWeekdays: [
          {
            isOpen: true,
            weekDay: 0
          },
          {
            isOpen: true,
            weekDay: 1
          }
        ]
      },
      menu: {
        dish: [
          {
            id: uuidv4(),
            name: 'Kebab Tortila Mały',
            description: 'pomidory San Marzano D.O.P, mozzarella, świeża bazylia',
            prize: 13.0,
            weight: 20,
            volume: 2,
            quantity: 20,
            isAvailable: true,
            DishCategory: '',
            VeganLevel: 0,
            SpicyLevel: 2,
            isDrink: false
          },
          {
            id: uuidv4(),
            name: 'Tortila Falafel',
            description: 'pomidory San Marzano D.O.P, mozzarella',
            prize: 16.0,
            weight: 20,
            volume: 2,
            quantity: 20,
            isAvailable: true,
            DishCategory: '',
            VeganLevel: 1,
            SpicyLevel: 0,
            isDrink: false
          },
          {
            id: uuidv4(),
            name: 'Kebab w bułce',
            description: '',
            prize: 16.0,
            weight: 20,
            volume: 2,
            quantity: 20,
            isAvailable: true,
            DishCategory: '',
            VeganLevel: 0,
            SpicyLevel: 1,
            isDrink: false
          }
        ],
        kitchenType: [1, 2, 3]
      },
      pictures: ['string'],
      isOpen: true,
      comments: [
        {
          title: 'It is awesome',
          body: 'Lorem ipsum',
          author: 'Piotr Kułakowski',
          rating: 4.5,
          additionDate: new Date('2022-02-17T17:06:59.331Z')
        }
      ],
      rating: 4.5,
      link: 'http://77.55.217.106:48391/api/FoodTruck/6213e22d483622eedafda3ab',
      image: 'string',
      urlName: 'string'
    }}
    {...args}
  />
);

export const Default = Template.bind([]);
