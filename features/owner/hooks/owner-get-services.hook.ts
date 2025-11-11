import { useApi } from "@/common/hooks/useApi";
import { useEffect } from "react";
import { getServicesApi } from "../services/owenr-servicesprovide.service";

export const useOwnerGetServiceHook = () => {
  const {
    data: service,
    error,
    loading,
    fetchData,
    reset,
  } = useApi(getServicesApi);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { service, error, loading, fetchData, reset };
};
