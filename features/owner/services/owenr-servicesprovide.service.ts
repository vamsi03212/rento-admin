import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";
import {
  ExistingServiceResponse,
  PostServiceTypes,
  ServiceType,
} from "../types/service-provided.types";

export const getServicesApi = async () => {
  return apiWrapper<ServiceType[]>(() =>
    API.get("/api/admin/service/get-service")
  );
};

// book service
export const postServiceApi = async (formData: PostServiceTypes) => {
  return apiWrapper(() =>
    API.post("/api/owner/service/post-service", formData)
  );
};

// get booking services

export const getAlreadyExistingBookins = async ({
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
  // if (search) params.append("search", search);

  return apiWrapper<ExistingServiceResponse>(() =>
    API.get(`/api/owner/service/get-service/new/${userId}?${params.toString()}`)
  );
};

// cancel service
export const cancelServiceApi = async (id: number) => {
  return apiWrapper(() =>
    API.put(`/api/owner/service/cancel-service/${id}`, {
      serviceStatus: "cancelled",
    })
  );
};
