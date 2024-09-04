import { configureStore } from "@reduxjs/toolkit";
import { servicesApi, userApi } from "./APISlice";
import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    [servicesApi.reducerPath]: servicesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(servicesApi.middleware, userApi.middleware)
});

export default store;