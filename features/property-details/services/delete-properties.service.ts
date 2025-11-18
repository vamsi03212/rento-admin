import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";

export const deletePropertyFromOwner = async ({
  propertyId,
}: {
  propertyId: number;
}) => {
  return apiWrapper(
    () => API.put(`/api/owner/properties/${propertyId}/toggle-listing`),
    { toastPosition: "top" }
  );
};
