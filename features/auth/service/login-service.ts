import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";
import { User } from "../store/useAuthStore";

export const loginApi = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  return apiWrapper<{ token: string; user: User }>(
    () => API.post("/api/auth/login", { email, password }),
    { showToast: false }
  );
};
