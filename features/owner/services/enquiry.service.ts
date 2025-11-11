import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";
import { PaginationEnquiryProperty } from "../types/enquiry.types";

export const getEnquiryApi = async ({
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
  });
  if (search) params.append("search", search);

  return apiWrapper<PaginationEnquiryProperty>(() =>
    API.get(`/api/owner/enquiry/get-enquiry/new/${userId}?${params.toString()}`)
  );
};
