import { useCallback } from 'react';
import axios from 'axios';
import { KitchenType } from 'types/Foodtrucktypes';
import { FoodtruckEvent } from 'types/FoodtruckEventsTypes';
import { getKitchenTypes } from 'hooks/useFoodtrucks';

export const useFoodtruckEvents = () => {
  const getAllFoodtruckEvents = useCallback(async () => {
    try {
      const foodtruckEvents = await axios.get(
        'http://77.55.217.106:48391/api/FoodTruckEvent/GetAll'
      );
      // let newFoodtrucks = foodtruckEvents.data.filter((foodtruckEvt: FoodtruckEvent) => {
      //   return foodtruckEvt.name !== 'string';
      // });
      return foodtruckEvents.data.map((foodtruckEvt: FoodtruckEvent) => {
        foodtruckEvt.menu.kitchenType = getKitchenTypes(
          foodtruckEvt.menu.kitchenType as KitchenType[]
        );
        foodtruckEvt.date = new Date(foodtruckEvt.date);

        return foodtruckEvt;
      });
    } catch (e) {
      console.log(e);
      return [];
    }
  }, []);

  const getSingleEvent = useCallback(async (id: string) => {
    try {
      const foodtruckEvent: FoodtruckEvent = await axios.get(
        `http://77.55.217.106:48391/api/FoodTruckEvent/Get/id/${id}`
      );

      return foodtruckEvent;
    } catch (e) {
      console.log(e);
      return {};
    }
  }, []);

  return {
    getAllFoodtruckEvents,
    getSingleEvent
  };
};
