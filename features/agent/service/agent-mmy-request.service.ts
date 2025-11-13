import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";
import { AgentMyRequestRes } from "../types/assigned-mmy-request.types";

export const getAgentMyRequestApi = async ({
  id,
  page = 1,
  limit = 10,
  search = "",
}: {
  id: number;
  page?: number;
  limit?: number;
  search?: string;
}) => {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) params.append("search", search);

  return apiWrapper<AgentMyRequestRes>(() =>
    API.get(`/api/agent/request/get-request/${id}/new?${params.toString()}`)
  );
};
