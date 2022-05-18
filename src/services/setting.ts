import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base-services";

export interface SettingResponse {
  generalSettings: {
    profile: {
      name: string;
      username: string;
      email: string;
      avatar: string;
      bio: string;
    };
  };
  publishSettings: {
    profile: {
      showProfilePhoto: boolean;
      showProfileName: boolean;
      showProfileUsername: boolean;
      showProfileBio: boolean;
      showProfileEmail: boolean;
    };
    links: {
      openLinksInNewTab: boolean;
      showIcon: boolean;
    }
  }
}

export const settingServices = createApi({
  reducerPath: "setting",
  baseQuery,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getSetting: builder.query<HttpResponse<SettingResponse>, void>({
      query: () => ({
        url: "/setting",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetSettingQuery,
} = settingServices;
