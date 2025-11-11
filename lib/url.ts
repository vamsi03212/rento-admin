import { useAuthStore } from "@/features/auth/store/useAuthStore";
import axios from "axios";

// export const API = axios.create({
//   baseURL: "https://rento.envisionedstrategyconsulting.tech",
// });

// export const IMAGE_URL = "https://rento.envisionedstrategyconsulting.tech";

export const API = axios.create({
  baseURL: "http://192.168.160.201:3001",
  withCredentials: true,
});

API.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers["Cookie"] = token;
  }

  //if (token && config.url?.startsWith("/api/owner")) {
  //   config.headers["Cookie"] = `token=${token}`;
  // }

  return config;
});

export const IMAGE_URL = "http://192.168.160.201:3001";

export const NEXT_PUBLIC_ADMIN_URL =
  "https://rentoadmin.envisionedstrategyconsulting.tech";
