import { useRouter } from "expo-router";
import { useState } from "react";
import { loginApi } from "../service/login-service";
import { useAuthStore } from "../store/useAuthStore";
import { validateLogin } from "../validations/login-validation";

export const useLoginScreenHook = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiErr, setApiErr] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = async () => {
    setApiErr("");
    const errors = validateLogin({ email, password });
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);
      const apiData = await loginApi({ email, password });
      console.log("apiData", apiData);

      if (apiData.status && apiData.data) {
        const { user, token } = apiData.data;
        login(user, token);
        router.replace("/(root)/(drawer)");
      } else {
        setApiErr(apiData.error || "Login failed");
      }
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleSubmit,
    loading,
    apiErr,
  };
};
