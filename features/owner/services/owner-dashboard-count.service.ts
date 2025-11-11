import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";

export const getOwnerDashboardCountApi = async ({
  userId,
}: {
  userId: number;
}) => {
  return apiWrapper<{ title: string; value: number }[]>(() =>
    API.get(`/api/owner/dashboard/get-dashboard-info/${userId}`)
  );
};
