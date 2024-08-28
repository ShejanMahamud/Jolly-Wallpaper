import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wallpaperApi = createApi({
  reducerPath: "wallpaperApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.EXPO_PUBLIC_SERVER_URL,
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem("access-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getWallpapers: builder.query({
      query: () => ({
        url: "/wallpapers",
        method: "GET",
      }),
    }),
    getWallpaper: builder.query({
      query: ({ id }) => ({
        url: `/wallpapers/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetWallpapersQuery, useGetWallpaperQuery } = wallpaperApi;
