import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base-services";
import type { Link } from "./link";

export interface UserResponse {
  profile: {
    name: string;
    username: string;
    email: string;
    avatar: string;
    bio: string;
  };
  openInNewTab: boolean;
  showIcon: boolean;
  links: Link[];
}

export const variableServices = createApi({
  reducerPath: "variable",
  baseQuery,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    publish: builder.mutation<HttpResponse<null>, void>({
      query: () => ({
        url: "/publish",
        method: "POST",
      }),
    }),
    getUser: builder.query<HttpResponse<UserResponse>, string>({
      query: (username) => ({
        url: `/profile/${username}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  usePublishMutation,
  useGetUserQuery,
} = variableServices;
