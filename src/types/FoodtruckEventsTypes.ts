import { KitchenType, Location, OpeningTime, Dish, Comments } from './Foodtrucktypes';

export type FoodtruckEvent = {
  id: string;
  foodTrucksIds: string[];
  date: Date;
  name: string;
  description: string;
  location: Location;
  openingTime: OpeningTime;
  menu: {
    dish: Array<Dish>;
    kitchenType: Array<KitchenType> | Array<string>;
  };
  pictures: string[];
  isOpen: boolean;
  comments: Array<Comments>;
  rating: number;
  link: string;
  image: string;
  urlName: string;
};
