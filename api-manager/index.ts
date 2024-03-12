import { ARTIFACT_API_URL } from "@/lib/consts";
import { getAuthToken } from "@/lib/helper";
import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const commonInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      return error;
    }
  );
};
const axiosInstance = axios.create({
  baseURL: ARTIFACT_API_URL,
});

commonInterceptor(axiosInstance);

export default axiosInstance;
