import { useApi } from "@/common/hooks/useApi";
import { getAgentDashboardCountApi } from "@/features/agent/service/agent-dashboard-count.service";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useIsFocused } from "@react-navigation/native";
import { useCallback, useEffect } from "react";
import { getOwnerDashboardCountApi } from "../services/owner-dashboard-count.service";

export const useOwnerDashbaordCountHook = () => {
  const isFocused = useIsFocused();
  const user = useAuthStore((state) => state.user);

  const safeApiFunc = useCallback(async () => {
    if (!user?.id) {
      return { status: false, error: "User not logged in" };
    }
    // return getOwnerDashboardCountApi({ userId: user.id });
    if (user.role === "owner") {
      return getOwnerDashboardCountApi({ userId: user.id });
    } else if (user.role === "agent") {
      return getAgentDashboardCountApi({ userId: user.id });
    } else {
      return { status: false, error: "Unknown role" };
    }
  }, [user?.id]);

  const {
    data: dashboardCounts,
    error,
    loading,
    fetchData,
    reset,
  } = useApi(safeApiFunc);

  useEffect(() => {
    if (user?.id && isFocused) {
      fetchData();
    } else {
      reset();
    }
  }, [user?.id, fetchData, reset, isFocused]);

  return { dashboardCounts, error, loading, fetchData, reset };
};
