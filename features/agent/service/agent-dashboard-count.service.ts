import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";
import { AssignedPropertyRes } from "../types/assigned-properties.types.";
import { AssignedServiceRes } from "../types/assigned-services.types";

export const getAgentDashboardCountApi = async ({
  userId,
}: {
  userId: number;
}) => {
  return apiWrapper<{ title: string; value: number }[]>(() =>
    API.get(`/api/agent/dashboard/get-dashboard-info/${userId}`)
  );
};

// get all agent assign properties
export const getAllAgentAssignPropertiesApi = async ({
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

  return apiWrapper<AssignedPropertyRes>(() =>
    API.get(`/api/agent/property/get-property/new/${id}?${params.toString()}`)
  );
};

// get all agent assign service
export const getAllAgentAssignServiceApi = async ({
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

  return apiWrapper<AssignedServiceRes>(() =>
    API.get(`/api/agent/service/get-service/new/${id}?${params.toString()}`)
  );
};

// service completed
export const completedServicesApi = async ({
  serviceId,
  description,
}: {
  description: string;
  serviceId: string | number;
}) => {
  return apiWrapper(() =>
    API.put(`/api/agent/service/update-service/${serviceId}`, {
      serviceStatus: "complete",
      description,
    })
  );
};
