import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  console.log("Request Sent");
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error:", error);
    return Promise.reject(error);
  },
);
