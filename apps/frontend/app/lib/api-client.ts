import Axios from "axios";
import { redirect } from "react-router";
import { env } from "~/config/env";
import { ACCESS_TOKEN } from "~/features/auth/types/access-token";

export type ApiResponse<T> =
  | {
      data: T;
      status: "success";
    }
  | {
      status: "error";
      error: string;
    };

export const api = Axios.create({ baseURL: env.API_URL });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem(ACCESS_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (res) => {
    if (res.status === 401) {
      redirect("/login");
    }
    return res;
  },
);

api.interceptors.response.use((res) => {
  if (res.data?.estado === "error") {
    throw new Error(res.data.mensaje);
  }

  return res;
});
