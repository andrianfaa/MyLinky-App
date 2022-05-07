import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth";
import { SessionStorage } from "../utils";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    // ...otherMiddleware,
  ],
});

store.subscribe(() => {
  const { auth } = store.getState();

  if (auth.token) {
    SessionStorage.set("uid", auth.token);
  } else {
    SessionStorage.set("uid", null);
  }

  if (auth.user) {
    SessionStorage.set("user", auth.user);
  } else {
    SessionStorage.set("user", null);
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
