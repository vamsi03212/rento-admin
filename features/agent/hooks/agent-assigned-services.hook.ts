import { usePaginatedFetch } from "@/common/hooks/usePaginatedFetch";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useLocalSearchParams } from "expo-router";
import { getAllAgentAssignServiceApi } from "../service/agent-dashboard-count.service";

export const useAgentAssignedServiceHook = ({ limit = 10 } = {}) => {
  const user = useAuthStore((state) => state.user);
  const { query } = useLocalSearchParams<{ query?: string }>();

  const fetchFn = async (page: number) => {
    if (!user?.id) return { data: [], meta: {} };

    const res = await getAllAgentAssignServiceApi({
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
    items: assignedService,
    meta,
    loading,
    isPaginating,
    error,
    hasMore,
    loadMore,
    refresh,
    fetchData,
  } = usePaginatedFetch({
    fetchFn,
    deps: [user?.id, query],
    limit,
  });

  const refetchCurrentPage = async () => {
    await fetchData(meta?.page || 1);
  };

  return {
    assignedService,
    meta,
    loading,
    isPaginating,
    error,
    hasMore,
    loadMore,
    refresh,
    query,
    refetchCurrentPage,
  };
};
