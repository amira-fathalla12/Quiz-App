import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AUTH_URLS, BASE_URL } from "../../services/urls";
import { LoginCredentials, LoginResponse } from "../../services/interfaces";
import { AppState } from "../store";

export const apis = createApi({
  reducerPath: "apis",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).user.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: AUTH_URLS.login,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation } = apis;