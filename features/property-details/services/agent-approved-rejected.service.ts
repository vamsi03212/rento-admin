import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";

export const agentPropertyApprovedRejected = async ({
  propertyId,
  action,
  description,
}: {
  propertyId: number | string;
  action: "Approved" | "Rejected" | null;
  description: string;
}) => {
  return apiWrapper(() =>
    API.put(`/api/agent/property/update-property/${propertyId}`, {
      propertyStatus: action,
      description,
    })
  );
};
