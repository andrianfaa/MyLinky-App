import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "./base-services";

export interface Link {
  type: string;
  title?: string;
  url: string;
  isPublished: boolean;
  id: string;
}

export interface GetLinkResponse {
  user: {
    username: string;
    email: string;
    name: string;
    avatar: string;
  };
  links: Link[];
}

export const linkServices = createApi({
  reducerPath: "link",
  baseQuery,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  endpoints: (builder) => ({
    getLinks: builder.query<HttpResponse<GetLinkResponse>, void>({
      query: () => ({
        url: "/linky",
        method: "GET",
      }),
    }),
    updateLink: builder.mutation<HttpResponse<null>, { uid: string, links: Link[] }>({
      query: (data) => ({
        url: "/linky",
        method: "PUT",
        body: data,
      }),
    }),
    toggleLink: builder.mutation<HttpResponse<null>, string>({
      query: (linkId) => ({
        url: `/linky/publish/${linkId}`,
        method: "PUT",
      }),
    }),
    dragAndDropLink: builder.mutation<HttpResponse<null>, { uid: string, ids: string[] }>({
      query: (data) => ({
        url: "/linky/drag-and-drop",
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetLinksQuery,
  useUpdateLinkMutation,
  useToggleLinkMutation,
  useDragAndDropLinkMutation,
} = linkServices;
