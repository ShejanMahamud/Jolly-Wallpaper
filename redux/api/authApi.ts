import AsyncStorage from "@react-native-async-storage/async-storage";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
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
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/users/register",
        method: "POST",
        body: userData,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: `/auth/users/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    editUser: builder.mutation({
      query: ({ user, email }) => ({
        url: `/auth/users/me/${email}`,
        method: "PATCH",
        body: user,
      }),
    }),
    getUser: builder.query({
      query: (email) => ({
        url: `/auth/users/me/${email}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useEditUserMutation,
} = authApi;
