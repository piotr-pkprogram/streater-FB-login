import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { FoodtruckState } from 'types/Foodtrucktypes';

export const foodtrucksApi = createApi({
  reducerPath: 'foodtrucksApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://77.55.210.170:5001/api/Foodtruck'
  }),
  endpoints: (builder) => ({
    getFoodtrucks: builder.query<Array<FoodtruckState>, void>({
      query: () => '/'
    })
  })
});

export const { useGetFoodtrucksQuery } = foodtrucksApi;
