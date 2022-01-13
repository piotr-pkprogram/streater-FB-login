import dish from 'assets/img/dish.jpg';

export const foodtruckExample = {
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
    }
  },
  openingWeekdays: {
    isOpen: true,
    weekDay: 0
  },
  menu: {
    dish: [
      {
        name: 'Danie',
        description: 'Składniki',
        prize: 27,
        weight: 0,
        volume: 0,
        quantity: 0,
        isAvailable: true
      }
    ],
    kitchenType: [
      {
        name: 'Tajska'
      }
    ]
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
