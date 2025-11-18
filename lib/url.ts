import { useAuthStore } from "@/features/auth/store/useAuthStore";
import axios from "axios";

// export const API = axios.create({
//   baseURL: "https://rentoadmin.envisionedstrategyconsulting.tech",
// });

// export const IMAGE_URL = "https://rentoadmin.envisionedstrategyconsulting.tech";

export const API = axios.create({
  baseURL: "http://192.168.80.227:3001",
  withCredentials: true,
});

API.interceptors.request.use(async (config) => {
  const token = useAuthStore.getState().token;

  // Identify request coming from mobile app
  config.headers["x-mobile-request"] = "true";

  // JWT as Authorization header
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

export const IMAGE_URL = "http://192.168.80.227:3001";

export const NEXT_PUBLIC_ADMIN_URL =
  "https://rentoadmin.envisionedstrategyconsulting.tech";
