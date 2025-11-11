import { usePaginatedFetch } from "@/common/hooks/usePaginatedFetch";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useLocalSearchParams } from "expo-router";
import { getAllOwnPropertiesApi } from "../services/fetch-properties.service";

export const useFetchPropertiesHook = ({ limit = 10 } = {}) => {
  const user = useAuthStore((state) => state.user);
  const { query } = useLocalSearchParams<{ query?: string }>();

  const fetchFn = async (page: number) => {
    if (!user?.id) return { data: [], meta: {} };

    const res = await getAllOwnPropertiesApi({
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
    items: properties,
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
    properties,
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
