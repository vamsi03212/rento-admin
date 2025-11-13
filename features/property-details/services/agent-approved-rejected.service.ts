import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";

// export const agentPropertyApprovedRejected = async ({
//   propertyId,
//   action,
//   description,
// }: {
//   propertyId: number | string;
//   action: "Approved" | "Rejected" | null;
//   description: string;
// }) => {
//   return apiWrapper(() =>
//     API.put(`/api/agent/property/update-property/${propertyId}`, {
//       propertyStatus: action,
//       description,
//     })
//   );
// };

export const agentPropertyApprovedRejected = async ({
  formData,
  userId,
}: {
  formData: FormData;
  userId: number | string;
}) => {
  return apiWrapper(() =>
    API.put(`/api/agent/property/update-property/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
  );
};
