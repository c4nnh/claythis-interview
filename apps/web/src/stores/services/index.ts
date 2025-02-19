import axios from "axios";

export const api = axios.create({
  baseURL: "https://canngo-claythis-interview-server-prd.fly.dev/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(function (response) {
  return response.data;
});
