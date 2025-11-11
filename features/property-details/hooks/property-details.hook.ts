import { useApi } from "@/common/hooks/useApi";
import { PropertyType } from "@/features/owner/types/property.type";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { singlePropertyDetailsApi } from "../services/single-properties.service";

export const usePropertyDetailsHook = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const {
    data: singleProperty,
    error,
    loading,
    fetchData,
  } = useApi<PropertyType>(() => singlePropertyDetailsApi({ userId: id }));

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { singleProperty, error, loading };
};
