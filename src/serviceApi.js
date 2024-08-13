import axios from "axios";
import config from "./config";

// Create Axios instance
const serviceApi = axios.create({
  baseURL: config[process.env.REACT_APP_ENV || "dev"]?.apiURL,
  timeout: 10000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
serviceApi.interceptors.request.use(
  (config) => {
    const authResult = JSON.parse(sessionStorage.getItem("authResult"));
    const token = authResult?.AccessToken;

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Add a response interceptor
serviceApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 403 &&
      error.response.data.valid == false
    ) {
      sessionStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

console.log("process.env.REACT_APP_ENV", process.env.REACT_APP_ENV);

export default serviceApi;
