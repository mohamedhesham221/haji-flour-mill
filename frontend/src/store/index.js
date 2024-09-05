import { configureStore } from "@reduxjs/toolkit";
import { entryApi, servicesApi, userApi } from "./APISlice";
import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    [servicesApi.reducerPath]: servicesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [entryApi.reducerPath]: entryApi.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(servicesApi.middleware, userApi.middleware, entryApi.middleware)
});

export default store;