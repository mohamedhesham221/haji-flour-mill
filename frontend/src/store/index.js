import { configureStore } from "@reduxjs/toolkit";
import { adminApi, entryApi, serviceApi, userApi } from "./APISlice";
import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    [adminApi.reducerPath]: adminApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [entryApi.reducerPath]: entryApi.reducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(adminApi.middleware, serviceApi.middleware, userApi.middleware, entryApi.middleware)
});

export default store;