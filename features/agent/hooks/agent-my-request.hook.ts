import { usePaginatedFetch } from "@/common/hooks/usePaginatedFetch";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useLocalSearchParams } from "expo-router";
import { getAgentMyRequestApi } from "../service/agent-mmy-request.service";

export const useAgentMyRequestHook = ({ limit = 10 } = {}) => {
  const user = useAuthStore((state) => state.user);
  const { query } = useLocalSearchParams<{ query?: string }>();

  const fetchFn = async (page: number) => {
    if (!user?.id) return { data: [], meta: {} };

    const res = await getAgentMyRequestApi({
      id: user.id,
      page,
      limit,
      search: query || "",
    });

    return {
      data: res?.data?.data || [],
      meta: res?.data?.meta || {},
    };
  };

  const {
    items: myrequest,
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
    myrequest,
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
