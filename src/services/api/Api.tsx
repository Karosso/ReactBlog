import axios, { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BLOG_API_URL,
  headers: {
    "Content-Type": "application/json",
  }
};

axios.defaults.headers.common = {
  "UserAuthCode": process.env.REACT_APP_API_USER_AUTH_CODE,
};

export const api = axios.create(config);

export const Api = () => {
  return api;
};
