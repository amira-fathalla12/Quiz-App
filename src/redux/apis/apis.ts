import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AUTH_URLS,
  BASE_URL,
  QUESTIONS_URLS,
  QUIZ_URLS,
  STUDENTS_URLS,
} from "../../services/urls";
import {
  forgetPasswordCredentials,
  forgetPasswordResponse,
  LoginCredentials,
  LoginResponse,
  Question,
  Quiz,
  resetPasswordCredentials,
  resetPasswordResponse,
  TopStudent,
} from "../../services/interfaces";
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
    /*user */
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: AUTH_URLS.login,
        method: "POST",
        body: credentials,
      }),
    }),
    forgetPassword: builder.mutation<
      forgetPasswordResponse,
      forgetPasswordCredentials
    >({
      query: (credentials) => ({
        url: AUTH_URLS.forgetPassword,
        method: "POST",
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation<
      resetPasswordResponse,
      resetPasswordCredentials
    >({
      query: (credentials) => ({
        url: AUTH_URLS.resetPassword,
        method: "POST",
        body: credentials,
      }),
    }),
    /*quiz */
    topUpcomingQuizzes: builder.query<Quiz[], void>({
      query: () => ({
        url: QUIZ_URLS.getTopUpcommingQuizzes,
      }),
    }),
    /*students */
    topStudents: builder.query<TopStudent[], void>({
      query: () => ({
        url: STUDENTS_URLS.getTopStudents,
      }),
    }),
    /*questions */
    allQuestions: builder.query<Question[], void>({
      query: () => ({
        url: QUESTIONS_URLS.getAllQuestions,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useTopUpcomingQuizzesQuery,
  useTopStudentsQuery,
  useAllQuestionsQuery,
} = apis;
