import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";
import { AgentProofOfVisitRes } from "../types/agent-proof-of-visit.types";

export const getAgentProofOfVisitApi = async ({
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

  return apiWrapper<AgentProofOfVisitRes>(() =>
    API.get(`/api/agent/proof/get-proof/${id}/new?${params.toString()}`)
  );
};
