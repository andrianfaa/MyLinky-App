import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base-services";

export interface ProfilePhotoResponse {
  url: string;
}

export const imageServices = createApi({
  reducerPath: "image",
  baseQuery,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    uploadProfilePhoto: builder.mutation<HttpResponse<ProfilePhotoResponse>, FormData>({
      query: (data) => ({
        url: "/image/upload/profile-photo",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useUploadProfilePhotoMutation,
} = imageServices;
