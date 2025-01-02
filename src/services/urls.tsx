import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://upskilling-egypt.com:3005/api";
const IMAGE_URL = "https://upskilling-egypt.com:3005";
// this code need to be deleted
/////////////////////////////////////////////////
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
////////////////////////////////////////////////////

// AuthUrls
export const AUTH_URLS = {
  login: "/auth/login",
  register: "/auth/register",
  verify: ``,
  forgetPassword: "/auth/forgot-password",
  resetPassword: "/auth/reset-password",
  changePassword: "/auth/change-password",
};

// quizUrls
export const QUIZ_URLS = {
  getTopUpcommingQuizzes: "/quiz/incomming",
};

// questionsUrls
export const QUESTIONS_URLS = {
  getAllQuestions: "/question",
};

export { axiosInstance, BASE_URL, IMAGE_URL };
