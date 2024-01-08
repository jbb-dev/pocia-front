import axios from "axios";
import { setupInterceptorsTo } from "./interceptors";

const { REACT_APP_API_URL } = process.env;

export const api = setupInterceptorsTo(
  axios.create({
    baseURL: REACT_APP_API_URL,
  })
);

export const clearToken = () => sessionStorage.clear();