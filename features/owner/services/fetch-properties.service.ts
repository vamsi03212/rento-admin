import { apiWrapper } from "../../../lib/api-wrapper";
import { API } from "../../../lib/url";
import { PropertyPaginationResponse } from "../types/property.type";

export const getAllOwnPropertiesApi = async ({
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

  return apiWrapper<PropertyPaginationResponse>(() =>
    API.get(`/api/owner/get-property/new/${id}?${params.toString()}`)
  );
};

// get main property types like house villas

export const getMainPropertyTypesApi = async () => {
  return apiWrapper<{ property_type: string }[]>(() =>
    API.get("api/admin/category/property/get-property-type")
  );
};

// get ameneties
export const getAmenitiesApis = async () => {
  return apiWrapper<{ amenity: string }[]>(() =>
    API.get("/api/admin/category/amenities/get-amenity")
  );
};

export const createProperty = async (formData: FormData) => {
  return apiWrapper(() =>
    API.post("/api/owner/post-property", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // important for FormData
      },
    })
  );
};
