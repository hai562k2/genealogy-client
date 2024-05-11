import axios from "axios";
import { StatusCode } from "../utils/enum";
import { localGetItem } from "../utils/storage";

const axiosClient = axios.create({
  baseURL: "https://newtechus.online",
  headers: {
    Accepted: "application/json",
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = `Bearer ${localGetItem("token")}`;
    config.headers.Authorization = token;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // const originalRequest = error.config;

    // if (error.response.status === StatusCode.Unauthorized && !originalRequest._retry) {
    //     originalRequest._retry = true;

    //     try {
    //         const response = await axiosClient.post('/refresh-token', {
    //             // Data...
    //         });
    //         const newAccessToken = response.data.access_token;
    //         axiosClient.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

    //         return axios(originalRequest);
    //     } catch (refreshError) {
    //         console.log('Refresh token failed:', refreshError);
    //     }
    // }
    return Promise.reject(error);
  }
);

export default axiosClient;
