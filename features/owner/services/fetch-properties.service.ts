import { apiWrapper } from "../../../lib/api-wrapper";
import { API } from "../../../lib/url";

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
