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
  };
  uid: string;
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
    updateSetting: builder.mutation<HttpResponse<null>, { uid: string, settings: SettingResponse }>({
      query: (data) => ({
        url: "/setting",
        method: "PUT",
        body: data,
      }),
    }),
    resetSetting: builder.mutation<HttpResponse<null>, void>({
      query: () => ({
        url: "/setting/reset",
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetSettingQuery,
  useUpdateSettingMutation,
  useResetSettingMutation,
} = settingServices;
