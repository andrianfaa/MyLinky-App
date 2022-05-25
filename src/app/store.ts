import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth";
import { SessionStorage } from "../utils";
import {
  settingServices,
  imageServices,
  linkServices,
} from "../services";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [settingServices.reducerPath]: settingServices.reducer,
  [imageServices.reducerPath]: imageServices.reducer,
  [linkServices.reducerPath]: linkServices.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    // ...otherMiddleware,
    settingServices.middleware,
    imageServices.middleware,
    linkServices.middleware,
  ],
});

store.subscribe(() => {
  const { auth } = store.getState();

  if (auth.token) {
    SessionStorage.set("token", auth.token);
  } else {
    SessionStorage.remove("token");
  }

  if (auth.user) {
    SessionStorage.set("user", auth.user);
  } else {
    SessionStorage.remove("user");
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
