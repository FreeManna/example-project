import axios, { AxiosResponse, AxiosRequestConfig } from "axios";

export const axiosApiClient = axios.create({
  baseURL: "http://localhost:5041/",
});

axiosApiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers) {
      const token = localStorage.getItem("tokenAccess");
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }
    return;
  },
  (error) => {
    return Promise.reject(error);
  }
);
