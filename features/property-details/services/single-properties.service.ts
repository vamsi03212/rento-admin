import { PropertyType } from "@/features/owner/types/property.type";
import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";

export const singlePropertyDetailsApi = async ({
  userId,
}: {
  userId: string;
}) => {
  return apiWrapper<PropertyType>(() =>
    API.get(`/api/owner/get-property/single-property/${userId}`)
  );
};
