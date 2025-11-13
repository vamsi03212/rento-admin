import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";
import { NotificationResponse } from "../types/notifications.types";

export const getNotificationApi = async ({
  userId,
  page = 1,
  limit = 10,
  search = "",
}: {
  userId: number;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    search: search || "",
  });

  return apiWrapper<NotificationResponse>(() =>
    API.get(`/api/admin/notification/${userId}/new?${params.toString()}`)
  );
};
