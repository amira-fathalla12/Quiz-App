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
  ApiError,
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
  Student,
  TopStudent,
} from "../../services/interfaces";
import { AppState } from "../store";
import { toast } from "react-toastify";

export const apis = createApi({
  reducerPath: "apis",
  refetchOnMountOrArgChange: true,
  refetchOnReconnect: true,
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as AppState).user.token;
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
      transformResponse: (response: LoginResponse) => {
        toast.success(response.message || "Login successful");
        return response;
      },
      transformErrorResponse: (err: unknown) => {
        const error = err as ApiError;
        toast.error(error.data?.message || "Something went wrong");
        return error;
      },
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
      transformResponse: (response: QuizResponse) => {
        toast.success(response.message || "Quiz created successfully");
        return response;
      },
      transformErrorResponse: (err: unknown) => {
        const error = err as ApiError;
        toast.error(error.data?.message || "Something went wrong");
        return error;
      },
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
      transformResponse: (response: QuizResponse) => {
        toast.success(response.message || "Quiz updated successfully");
        return response;
      },
      transformErrorResponse: (err: unknown) => {
        const error = err as ApiError;
        toast.error(error.data?.message || "Something went wrong");
        return error;
      },
    }),
    /*students */
    allStudents: builder.query<Student[], void>({
      query: () => ({
        url: STUDENTS_URLS.allStudents,
      }),
    }),
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
    deleteQuestion: builder.mutation<Question, { id: string; data: Question }>({
      query: ({ id, data }) => ({
        url: QUESTIONS_URLS.deleteQuestion(id),
        method: "DELETE",
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
    allCompletedQuizzes: builder.query<Results[], void>({
      query: () => ({
        url: QUIZ_URLS.getAllCompletedQuizzes,
      }),
    }),
    deleteGroups: builder.mutation<group, { id: string; data: group }>({
      query: ({ id, data }) => ({
        url: GROUPS_URLS.deleteGroup(id),
        method: "DELETE",
        body: data,
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
  useAllCompletedQuizzesQuery,
  useAllStudentsQuery,
  useDeleteGroupsMutation,
  useDeleteQuestionMutation,
} = apis;
