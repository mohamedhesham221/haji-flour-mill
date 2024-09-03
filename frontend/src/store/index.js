import { configureStore } from "@reduxjs/toolkit";
import { servicesApi } from "./APISlice";

const store = configureStore({
  reducer: {
    [servicesApi.reducerPath]: servicesApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(servicesApi.middleware)
});

export default store;