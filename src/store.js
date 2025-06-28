import { configureStore } from "@reduxjs/toolkit";

import { firebaseUserApi } from "features/Api/firebaseUserApi";
import { propertiesApi } from "features/Api/propertiesApi";
import { tenantsApi } from "features/Api/tenantsApi";

export const store = configureStore({
  reducer: {
    [firebaseUserApi.reducerPath]: firebaseUserApi.reducer,
    [propertiesApi.reducerPath]: propertiesApi.reducer,
    [tenantsApi.reducerPath]: tenantsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      firebaseUserApi.middleware,
      propertiesApi.middleware,
      tenantsApi.middleware,
    ]),
});
