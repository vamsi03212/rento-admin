import Card from "@/common/components/Card";
import DataWrapper from "@/common/components/DataWrapper";
import React from "react";
import { View } from "react-native";
import { useFetchPropertiesHook } from "../hooks/fetch-properties.hook";

const DashboardPropertySlider = () => {
  const { properties, loading, error } = useFetchPropertiesHook({ limit: 6 });
  return (
    <DataWrapper error={error} loading={loading}>
      <View className="flex flex-row flex-wrap justify-between gap-4">
        {properties?.map((item) => (
          <View key={item.id} style={{ width: "47%" }}>
            <Card property={item} />
          </View>
        ))}
      </View>
    </DataWrapper>
  );
};

export default DashboardPropertySlider;
