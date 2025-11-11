import { Country } from "@/common/hooks/useLocationDataHook";
import { apiWrapper } from "@/lib/api-wrapper";
import { API } from "@/lib/url";

export const profileGetCountries = async () => {
  return apiWrapper<Country[]>(() =>
    API.get("/api/admin/category/country/get-country")
  );
};
