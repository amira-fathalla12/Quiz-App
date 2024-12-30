import axios, { AxiosInstance } from "axios";

const BASE_URL = "https://upskilling-egypt.com:3000/api/v0";
const IMAGE_URL = "https://upskilling-egypt.com:3000";

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


// AuthUrls
export const AUTH_URLS = {
    login: ``,
    register: ``,
    verify: ``,
    forgetPassword:``,
    resetPassword: ``,
    changePassword: ``,
  
  };
  
export { axiosInstance, IMAGE_URL };
