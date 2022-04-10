import { useCallback } from 'react';
import axios, { AxiosResponse } from 'axios';
import { FoodtruckState, KitchenType } from 'types/Foodtrucktypes';
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

export const kitchensTypes = [
  'Pizza',
  'Burgery',
  'Azjatycka',
  'Włoska',
  'Indyjska',
  'Vegańska',
  'Vegetariańska',
  'Keto',
  'Paleo',
  'Gluten_free'
];

export const getKitchenTypes = (kitchenTypes: KitchenType[]) => {
  return kitchenTypes.map((kitchenType: KitchenType) => {
    if (typeof kitchenType === 'number') return kitchensTypes[kitchenType - 1];
    else return kitchenType;
  });
};

export const useFoodtrucks = () => {
  const getFoodtrucks = useCallback(async () => {
    try {
      const foodtrucks = await axios.get('http://77.55.217.106:666/api/Foodtruck');
      // let newFoodtrucks = foodtrucks.data.filter((foodtruck: FoodtruckState) => {
      //   return foodtruck.name !== 'string';
      // });
      return foodtrucks.data.map((foodtruck: FoodtruckState) => {
        foodtruck.menu.kitchenType = getKitchenTypes(foodtruck.menu.kitchenType as KitchenType[]);
        return foodtruck;
      });
    } catch (e) {
      console.log(e);
      return [];
    }
  }, []);

  const getSingleFoodtruck = useCallback(async (id: string) => {
    let foodtruck: FoodtruckState | undefined;
    const foodtrucks = await getFoodtrucks();

    foodtruck = foodtrucks.find((foodtruck: FoodtruckState) => foodtruck?.urlName === id);

    try {
      if (!foodtruck)
        foodtruck = await axios
          .get(`http://77.55.217.106:666/api/Foodtruck/id/${id}`)
          .then((res: AxiosResponse<FoodtruckState>) => res.data);
    } catch (e) {
      console.log(e);
      return [];
    }

    return foodtruck;
  }, []);

  const getSearchingFoodtrucks = useCallback(async (inputValue) => {
    try {
      let foodtrucks = await getFoodtrucks();

      foodtrucks = foodtrucks.filter((foodtruck: FoodtruckState) => {
        const { name, location } = foodtruck;
        foodtruck.cityCountryOrDistrict = location.address.city;

        if (
          name.toLowerCase().includes(inputValue.toLowerCase()) ||
          inputValue.toLowerCase().includes(name.toLowerCase())
        ) {
          foodtruck.searchingValue = name;
          return true;
        } else if (inputValue.toLowerCase().includes(location.address.city.toLowerCase())) {
          foodtruck.searchingValue = location.address.city;
          foodtruck.cityCountryOrDistrict = `${location.address.street} ${location.address.houseNumber}`;
          return true;
        } else if (
          `ul. ${location.address.street} ${location.address.houseNumber} ${location.address.city}`
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        ) {
          foodtruck.searchingValue = `${location.address.street} ${location.address.houseNumber}`;
          return true;
        } else if (
          location.address.country.toLowerCase().includes(inputValue.toLowerCase()) ||
          location.address.district.toLowerCase().includes(inputValue.toLowerCase())
        ) {
          foodtruck.searchingValue = name;
          foodtruck.cityCountryOrDistrict = `${location.address.district} ${location.address.country}`;
          return true;
        } else if (
          foodtruck.menu.kitchenType.join(', ').toLowerCase().includes(inputValue.toLowerCase())
        ) {
          const category = foodtruck.menu.kitchenType.findIndex((el) => {
            if (typeof el === 'string') return el.includes(inputValue);
          });
          foodtruck.searchingValue = foodtruck.menu.kitchenType[category] as string;
          foodtruck.cityCountryOrDistrict = name;
          return true;
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
          filterFoodtrucks = filterFoodtrucks.filter(({ openingTime }) => {
            const weekDay = new Date().getDay();
            const openingWeekday = openingTime.openingWeekdays.find(
              (day) => day.weekDay === weekDay
            );

            return openingWeekday?.isOpen;
          });
          return filterFoodtrucks;
        case FiltersTypes.kitchen_type:
          if (typeof filters !== 'string') {
            filters = filters?.filter((filter) => filter !== '');
          }

          if (filters.length > 0) {
            filterFoodtrucks = foodtrucks.filter(({ menu }) => {
              for (let i = 0; i <= menu.kitchenType.length; i++) {
                if (filters.includes(`${menu.kitchenType[i]}`.toLowerCase())) return true;
              }
              return false;
            });
            return filterFoodtrucks;
          }
          return foodtrucks;
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

          if (from.distanceTo(foodtruckA) < from.distanceTo(foodtruckB)) return -1;
          else return 1;
        });
        return sortedFoodtrucks;
      case SortModes.RATES:
        sortedFoodtrucks = foodtrucks.sort((a, b) => (a.rating >= b.rating ? -1 : 1));
        return sortedFoodtrucks;
      case SortModes.FAVOURITE:
        return foodtrucks;
      case SortModes.AMOUT_OF_RATES:
        sortedFoodtrucks = foodtrucks.sort((a, b) =>
          a.comments.length >= b.comments.length ? -1 : 1
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
        `http://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coordinates.lat}&lon=${coordinates.lng}&zoom=18&addressdetails=1`
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
        `http://nominatim.openstreetmap.org/reverse?format=jsonv2&street=${location.address.street} ${location.address.houseNumber}&city=${location.address.city}&country=${location.address.country}&state=${location.address.district}&postalCode=${location.address.zipcode}&addressdetails=1`
      ).then((data) => data.json());
      return { lat: data.lat, lng: data.lon };
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
    getFoodtruckAddress,
    getSingleFoodtruck
  };
};
