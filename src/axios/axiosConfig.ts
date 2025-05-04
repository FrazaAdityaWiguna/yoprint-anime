import axios from "axios";

const env = "https://api.jikan.moe"; // if production or real project save on file .env

const axiosConfig = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  responseType: "json",
  baseURL: env,
  timeout: 10000,
})

axiosConfig.interceptors.request.use((request) => {
  return request;
});

axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  }
);


export default axiosConfig