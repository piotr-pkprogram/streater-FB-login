import { configureStore } from '@reduxjs/toolkit';
import { foodtrucksApi } from 'store/api/foodtrucks';

export const store = configureStore({
  reducer: {
    [foodtrucksApi.reducerPath]: foodtrucksApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(foodtrucksApi.middleware)
});
