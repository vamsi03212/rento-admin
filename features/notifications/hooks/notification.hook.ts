import { usePaginatedFetch } from "@/common/hooks/usePaginatedFetch";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useLocalSearchParams } from "expo-router";
import { getNotificationApi } from "../services/get-notification.service";

export const useNotificationHook = ({ limit = 10 } = {}) => {
  const user = useAuthStore((state) => state.user);
  const { query } = useLocalSearchParams<{ query?: string }>();

  const fetchFn = async (page: number) => {
    if (!user?.id) return { data: [], meta: {} };
    const res = await getNotificationApi({
      userId: user.id,
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
    items: notifications,
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

  console.log("notifications", notifications);

  return {
    notifications,
    meta,
    loading,
    isPaginating,
    error,
    hasMore,
    loadMore,
    refresh,
    query,
    fetchFn,
    refetchCurrentPage,
  };
};
