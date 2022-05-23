import {
  fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";
import config from "../config";
import { logout } from "../features/auth";
import { Notyf } from "../helpers";

const baseQuery = fetchBaseQuery({
  baseUrl: config.api.url,
  prepareHeaders: async (headers, { getState }) => {
    headers.set("accept", "application/json");
    headers.set("x-api-key", config.api.key);

    const { token } = (getState() as RootState).auth;

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

const baseQueryWithLogout: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    api.dispatch(logout());
  }

  if (result.error && result.error?.status === "FETCH_ERROR") {
    Notyf.error("Fetch error: Please check your internet connection");
  }

  // if (result.error) {
  //   api.dispatch(logout());
  //   Notyf.error("Your session has expired. Please login again.");
  // }

  return result;
};

export default baseQueryWithLogout;
