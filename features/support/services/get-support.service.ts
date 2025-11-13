import { SupportData } from "@/app/(root)/(drawer)/support";
import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";

export const getSupportDataApi = async () => {
  return apiWrapper<SupportData>(() =>
    API.get("/api/admin/support/get-support")
  );
};
