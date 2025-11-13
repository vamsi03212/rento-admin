import { usePaginatedFetch } from "@/common/hooks/usePaginatedFetch";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useLocalSearchParams } from "expo-router";
import { getAllAgentAssignPropertiesApi } from "../service/agent-dashboard-count.service";

export const useAgentAssignPropertyHook = ({ limit = 10 } = {}) => {
  const user = useAuthStore((state) => state.user);
  const { query } = useLocalSearchParams<{ query?: string }>();

  const fetchFn = async (page: number) => {
    if (!user?.id) return { data: [], meta: {} };

    const res = await getAllAgentAssignPropertiesApi({
      id: user.id,
      page,
      limit,
      search: query || "",
    });
    // console.log("res", res?.data);

    return {
      data: res?.data?.data || [],
      meta: res?.data?.meta || {},
    };
  };

  const {
    items: assignedProperties,
    meta,
    loading,
    isPaginating,
    error,
    hasMore,
    loadMore,
    refresh,
  } = usePaginatedFetch({
    fetchFn,
    deps: [user?.id, query],
    limit,
  });

  return {
    assignedProperties,
    meta,
    loading,
    isPaginating,
    error,
    hasMore,
    loadMore,
    refresh,
    query,
  };
};
