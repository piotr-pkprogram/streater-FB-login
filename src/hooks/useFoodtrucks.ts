import { useCallback } from 'react';
import axios from 'axios';
import { FoodtruckState } from 'types/Foodtrucktypes';
import L from 'leaflet';

export enum FiltersTypes {
  closeOpen = 'CLOSE_OPEN',
  kitchen_type = 'KITCHEN_TYPE'
}

export enum SortModes {
  'CHOOSE' = 'Wybierz',
  'DISTANCE' = 'Odległość',
  'RATES' = 'Ocena - Gwiazdki 1-5',
  'FAVOURITE' = 'Ulubione',
  'AMOUT_OF_RATES' = 'Ilość opini'
}

export const useFoodtrucks = () => {
  const getFoodtrucks = useCallback(async () => {
    try {
      let foodtrucks = await axios.get('http://77.55.210.170:5001/api/Foodtruck');
      foodtrucks = foodtrucks.data.filter(
        (foodtruck: FoodtruckState) => foodtruck.name !== 'string'
      );

      return foodtrucks;
    } catch (e) {
      console.log(e);
      return [];
    }
  }, []);

  const getSearchingFoodtrucks = useCallback(async (inputValue) => {
    try {
      let foodtrucks = await axios.get('http://77.55.210.170:5001/api/Foodtruck');

      foodtrucks = foodtrucks.data.filter((foodtruck: FoodtruckState) => {
        const { name, location } = foodtruck;
        foodtruck.cityCountryOrDistrict = location.address.city;

        if (name !== 'string') {
          if (name.includes(inputValue)) {
            foodtruck.searchingValue = name;
            return true;
          } else if (inputValue.includes(location.address.city)) {
            foodtruck.searchingValue = location.address.city;
            foodtruck.cityCountryOrDistrict = `${location.address.street} ${location.address.houseNumber}`;
            return true;
          } else if (
            `${location.address.street} ${location.address.houseNumber} ${location.address.city}`.includes(
              inputValue
            )
          ) {
            foodtruck.searchingValue = `${location.address.street} ${location.address.houseNumber}`;
            return true;
          } else if (
            location.address.country.includes(inputValue) ||
            location.address.district.includes(inputValue)
          ) {
            foodtruck.searchingValue = name;
            foodtruck.cityCountryOrDistrict = `${location.address.district} ${location.address.country}`;
            return true;
          }
        } else {
          return false;
        }
      });

      return foodtrucks;
    } catch (e) {
      console.log(e);
      return [];
    }
  }, []);

  const filterFoodtrucks = useCallback(
    (foodtrucks: FoodtruckState[], type: FiltersTypes, filters: string | string[]) => {
      let filterFoodtrucks: FoodtruckState[];

      switch (type) {
        case FiltersTypes.closeOpen:
          filterFoodtrucks = foodtrucks.filter(({ openingTime }) => {
            let hours = new Date().getHours();
            let minutes = new Date().getMinutes();

            if (filters === 'close') {
              return (
                (openingTime.openingHours.openingHour > hours ||
                  openingTime.openingHours.closingHour <= hours) &&
                (minutes < openingTime.openingHours.openingMinute ||
                  minutes >= openingTime.openingHours.closingMinute)
              );
            } else if (filters === 'open') {
              return (
                (openingTime.openingHours.openingHour >= hours ||
                  hours < openingTime.openingHours.closingHour) &&
                (minutes >= openingTime.openingHours.openingMinute ||
                  minutes < openingTime.openingHours.closingMinute)
              );
            }
          });
          return filterFoodtrucks;
        case FiltersTypes.kitchen_type:
          filterFoodtrucks = foodtrucks.filter(({ menu }) => {
            for (let i = 0; i <= menu.kitchenType.length; i++) {
              if (filters.includes(menu.kitchenType[i].name)) return true;
            }
          });
          return filterFoodtrucks;
        default:
          throw Error('such filter cannot be found');
      }
    },
    []
  );

  const sortFoodtrucks = useCallback((foodtrucks: FoodtruckState[], sortMode: SortModes) => {
    let sortedFoodtrucks: FoodtruckState[];

    switch (sortMode) {
      case SortModes.CHOOSE:
        return foodtrucks;
      case SortModes.DISTANCE:
        sortedFoodtrucks = foodtrucks.sort((a, b) => {
          const location = JSON.parse(localStorage.getItem('location') as string) || {
            lat: 52.232855,
            lng: 20.9211124
          };

          const from = L.marker(location).getLatLng();

          const foodtruckA = L.marker([
            a.location.coordinates.latitude,
            a.location.coordinates.longitude
          ]).getLatLng();

          const foodtruckB = L.marker([
            b.location.coordinates.latitude,
            b.location.coordinates.longitude
          ]).getLatLng();

          if (from.distanceTo(foodtruckA) < from.distanceTo(foodtruckB)) return 0;
          else return 1;
        });
        return sortedFoodtrucks;
      case SortModes.RATES:
        sortedFoodtrucks = foodtrucks.sort((a, b) => (a.rating >= b.rating ? 0 : 1));
        return sortedFoodtrucks;
      case SortModes.FAVOURITE:
        return foodtrucks;
      case SortModes.AMOUT_OF_RATES:
        sortedFoodtrucks = foodtrucks.sort((a, b) =>
          a.comments.length >= b.comments.length ? 0 : 1
        );
        return sortedFoodtrucks;
    }
  }, []);

  const getFoodtruckAddress = async ({ location }: FoodtruckState) => {
    const coordinates = {
      lat: location.coordinates.latitude,
      lng: location.coordinates.longitude
    } || {
      lat: 52.232855,
      lng: 20.9211124
    };

    try {
      const data = await fetch(
        `http://nominatim.openstreetmap.org/reverse?format=json&lat=${coordinates.lat}&lon=${coordinates.lng}&zoom=18&addressdetails=1`
      ).then((data) => data.json());

      return data.address;
    } catch (e) {
      console.log(e);
    }
  };

  const getFoodtruckLocation = async (foodtruck: FoodtruckState) => {
    const { location } = foodtruck;

    try {
      const data = await fetch(
        `http://nominatim.openstreetmap.org/reverse?format=json&street=${`${location.address.street} ${location.address.houseNumber}`}&city=${
          location.address.city
        }&country=${location.address.country}&state=${location.address.district}&postalCode=${
          location.address.zipcode
        }&addressdetails=1`
      ).then((data) => data.json());
      return { lat: data.lat, lng: data.lng };
    } catch (e) {
      console.log(e);
    }
  };

  return {
    getFoodtrucks,
    getSearchingFoodtrucks,
    filterFoodtrucks,
    sortFoodtrucks,
    getFoodtruckLocation,
    getFoodtruckAddress
  };
};
