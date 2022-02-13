import dish from 'assets/img/dish.jpg';
import { FoodtruckState } from 'types/Foodtrucktypes';

export const foodtruckExample: FoodtruckState = {
  id: '06294cef-7368-41bf-99e6-de0683834a07',
  name: 'Nazwa foodtrucka',
  description: '',
  location: {
    coordinates: {
      latitude: 57,
      longitude: 48
    },
    address: {
      country: 'Polska',
      city: 'Wrocław',
      street: 'Śliwkowa',
      zipcode: '55-080',
      houseNumber: 134,
      district: 'Dolnośląskie'
    }
  },
  openingTime: {
    openingHours: {
      openingHour: 12,
      openingMinute: 0,
      closingHour: 22,
      closingMinute: 0
    },
    openingWeekdays: [
      {
        isOpen: true,
        weekDay: 0
      }
    ]
  },
  menu: {
    dish: [
      {
        name: 'Pad Thai kurczak',
        description: 'Składniki',
        prize: 22,
        weight: 0,
        volume: 0,
        quantity: 0,
        isAvailable: true
      },
      {
        name: 'Stir Fry',
        description: 'Składniki',
        prize: 26,
        weight: 0,
        volume: 0,
        quantity: 0,
        isAvailable: true
      }
    ],
    kitchenType: ['Tajska']
  },
  pictures: [dish],
  isOpen: true,
  comments: [
    {
      title: 'Example',
      body: 'Przykładowa ocena',
      author: 'Jan Kowalski',
      rating: 4.0,
      additionDate: new Date()
    }
  ],
  rating: 4.0
};
