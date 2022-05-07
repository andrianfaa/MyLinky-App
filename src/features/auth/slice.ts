import { createSlice } from "@reduxjs/toolkit";
import type { InitialState } from "./types";

const initialState: InitialState = {
  isAuth: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
      state.token = null;
      state.user = null;

      localStorage.clear();
      sessionStorage.clear();
    },
  },
});

export const {
  logout,
} = authSlice.actions;

export default authSlice;
