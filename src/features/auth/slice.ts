import { createSlice } from "@reduxjs/toolkit";
import type { InitialState, User } from "./types";
import { LocalStorage, SessionStorage } from "../../utils";

const initialState: InitialState = {
  isAuth: false,
  token: SessionStorage.get<string>("token") ?? null,
  user: SessionStorage.get<User>("user") ?? null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state: InitialState, { payload }: {
      payload: User
    }) => ({
      ...state,
      isAuth: true,
      user: payload,
    }),

    setToken: (state: InitialState, { payload }: {
      payload: string
    }) => ({
      ...state,
      token: payload,
    }),

    logout: (state: InitialState) => {
      LocalStorage.clear();
      SessionStorage.clear();

      return {
        ...state,
        isAuth: false,
        token: null,
        user: null,
      };
    },
  },
});

export const {
  logout,
  setAuth,
  setToken,
} = authSlice.actions;

export default authSlice;
