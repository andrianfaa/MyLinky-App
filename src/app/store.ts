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
