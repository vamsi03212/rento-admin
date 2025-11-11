import { useCallback, useState } from "react";

export const useApi = <T>(
  apiFunc: (
    ...args: any[]
  ) => Promise<{ status: boolean; data?: T; error?: string }>
) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(
    async (...args: any[]) => {
      setLoading(true);
      setError(null);
      const response = await apiFunc(...args);
      if (response.status) {
        setData(response.data ?? null);
      } else {
        setError(response.error ?? "Something went wrong");
      }
      setLoading(false);
    },
    [apiFunc]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, error, loading, fetchData, reset };
};
