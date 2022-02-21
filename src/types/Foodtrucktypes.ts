interface FoodtruckAddress {
  country: string;
  city: string;
  street: string;
  zipcode: string;
  houseNumber: number;
  district: string;
}

export interface Location {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: FoodtruckAddress;
}

export interface OpeningTime {
  openingHours: {
    openingHour: number;
    openingMinute: number;
    closingHour: number;
    closingMinute: number;
  };
  openingWeekdays: {
    isOpen: boolean;
    weekDay: number;
  }[];
}

export interface Dish {
  name: string;
  description: string;
  prize: number;
  weight: number;
  volume: number;
  quantity: number;
  isAvailable: boolean;
  image?: string | null;
}

export interface Comments {
  title: string;
  body: string;
  author: string;
  rating: number;
  additionDate: Date;
}

export enum KitchenType {
  Pizza = 1,
  Burgers = 2,
  Asian = 3,
  Italian = 4,
  Indian = 5,
  Vegan = 6,
  Vegetarian = 7,
  Keto = 8,
  Paleo = 9,
  Gluten_free = 10
}

export type FoodtruckState = {
  id: string;
  name: string;
  description: string;
  location: Location;
  openingTime: OpeningTime;
  menu: {
    dish: Array<Dish>;
    kitchenType: Array<KitchenType> | Array<string>;
  };
  pictures: Array<string>;
  isOpen: boolean;
  comments: Array<Comments>;
  rating: number;
  searchingValue?: string;
  cityCountryOrDistrict?: string;
  link?: string;
  image?: string;
  urlName?: string;
};
