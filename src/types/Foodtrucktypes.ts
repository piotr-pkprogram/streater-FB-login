interface FoodtruckAddress {
  country: string;
  city: string;
  street: string;
  zipcode: string;
  houseNumber: number;
  district: string;
}

interface Location {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: FoodtruckAddress;
}

interface OpeningTime {
  openingHours: {
    openingHour: number;
    openingMinute: number;
    closingHour: number;
    closingMinute: number;
  };
}

interface Dish {
  name: string;
  description: string;
  prize: number;
  weight: number;
  volume: number;
  quantity: number;
  isAvailable: boolean;
}

interface Comments {
  title: string;
  body: string;
  author: string;
  rating: number;
  additionDate: Date;
}

type Name = {
  name: string;
};

export type FoodtruckState = {
  id: string;
  name: string;
  description: string;
  location: Location;
  openingTime: OpeningTime;
  openingWeekdays: {
    isOpen: boolean;
    weekDay: number;
  };
  menu: {
    dish: Array<Dish>;
    kitchenType: Array<Name>;
  };
  pictures: Array<string>;
  isOpen: boolean;
  comments: Array<Comments>;
  rating: number;
  searchingValue?: string;
  cityCountryOrDistrict?: string;
};
