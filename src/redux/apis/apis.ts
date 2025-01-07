import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  AUTH_URLS,
  BASE_URL,
  GROUPS_URLS,
  QUESTIONS_URLS,
  QUIZ_URLS,
  STUDENTS_URLS,
} from "../../services/urls";
import {
  forgetPasswordCredentials,
  forgetPasswordResponse,
  group,
  LoginCredentials,
  LoginResponse,
  Question,
  QuestionResponse,
  Quiz,
  QuizResponse,
  resetPasswordCredentials,
  resetPasswordResponse,
  Results,
  TopStudent,
} from "../../services/interfaces";
import { AppState } from "../store";

export const apis = createApi({
  reducerPath: "apis",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).user.token;
      console.log("Token:", token);
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      } else {
        console.error("Token is missing");
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
    addQuiz: builder.mutation<QuizResponse, Quiz>({
      query: (credentials) => ({
        url: QUIZ_URLS.addQuiz,
        method: "POST",
        body: credentials,
      }),
    }),
    getQuiz: builder.query<Quiz, string>({
      query: (id) => ({
        url: QUIZ_URLS.getQuiz(id),
      }),
    }),
    updateQuiz: builder.mutation<QuizResponse, { id: string; data: Quiz }>({
      query: ({ id, data }) => ({
        url: QUIZ_URLS.updateQuiz(id),
        method: "PUT",
        body: data,
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
    getQuestion: builder.query<Question, string>({
      query: (id) => ({
        url: QUESTIONS_URLS.getQuestion(id),
      }),
    }),
    addQuestion: builder.mutation<QuestionResponse, Question>({
      query: (credentials) => ({
        url: QUESTIONS_URLS.addQuestion,
        method: "POST",
        body: credentials,
      }),
    }),
    editQuestion: builder.mutation<
      QuestionResponse,
      { id: string; data: Question }
    >({
      query: ({ id, data }) => ({
        url: QUESTIONS_URLS.editQuestion(id),
        method: "PUT",
        body: data,
      }),
    }),
    // getAllGroups
    allGroups: builder.query<group[], void>({
      query: () => ({
        url: GROUPS_URLS.getAllGroups,
      }),
    }),
    allQuizzesResults: builder.query<Results[], void>({
      query: () => ({
        url: QUIZ_URLS.getAllQuizzesResults,
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
  useAllGroupsQuery,
  useAddQuestionMutation,
  useEditQuestionMutation,
  useGetQuestionQuery,
  useAddQuizMutation,
  useGetQuizQuery,
  useUpdateQuizMutation,
  useAllQuizzesResultsQuery,
} = apis;
