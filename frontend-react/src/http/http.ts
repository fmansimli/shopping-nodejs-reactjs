import axios, { AxiosError } from "axios";

const baseURL = import.meta.env.VITE_APP_SERVER_URL;

export const http = axios.create({
  baseURL,
  headers: {
    Authorization: "Bearer " + " ",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

http.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error.response?.data);
  },
);
