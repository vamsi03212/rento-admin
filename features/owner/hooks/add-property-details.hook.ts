import { useEffect, useState } from "react";
import {
  getAmenitiesApis,
  getMainPropertyTypesApi,
} from "../services/fetch-properties.service";

export const useAddPropertyDetailsHook = () => {
  const [apiProertyTypes, setApiPropertyTypes] = useState<
    { property_type: string }[]
  >([]);

  const [apiAmenitiesTypes, setApiAmenitiesTypes] = useState<
    { amenity: string }[]
  >([]);

  const fetchMainPropertys = async () => {
    const apiData = await getMainPropertyTypesApi();
    if (apiData.status) {
      setApiPropertyTypes(apiData?.data ?? []);
    }
    const amenitiesApi = await getAmenitiesApis();
    // console.log("amenitiesApi", amenitiesApi);

    if (amenitiesApi.status) {
      setApiAmenitiesTypes(amenitiesApi.data ?? []);
    }
  };

  useEffect(() => {
    fetchMainPropertys();
  }, []);

  return {
    apiProertyTypes,
    apiAmenitiesTypes,
  };
};
