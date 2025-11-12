import { DashboardCount } from "@/common/components/DashboardCount";
import DataWrapper from "@/common/components/DataWrapper";
import TextWithSeeAll from "@/common/components/TextWithSeeAll";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DashboardPropertySlider from "../component/DashboarPropertySlider";
import ServiceTextCard from "../component/ServiceCard";
import { useOwnerDashbaordCountHook } from "../hooks/owner-dashboard-count.hook";
import { useOwnerGetServiceHook } from "../hooks/owner-get-services.hook";

const OwnerDashboard = () => {
  const router = useRouter();
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - 24 - 16) / 2 - 9;
  const {
    dashboardCounts,
    error: countError,
    loading: countLoading,
  } = useOwnerDashbaordCountHook();

  const { service, error, loading } = useOwnerGetServiceHook();

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["left", "right", "bottom"]}
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 50, paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4 gap-4">
          <DataWrapper loading={countLoading} error={countError}>
            <View className="flex-row flex-wrap  justify-between">
              {dashboardCounts?.map((item) => (
                <View key={item.title} style={{ width: cardWidth }}>
                  <DashboardCount item={item} />
                </View>
              ))}
            </View>
          </DataWrapper>
          <TextWithSeeAll
            title="Listed Properties"
            onSeeAllPress={() =>
              router.push("/(root)/(drawer)/manager-property")
            }
          />
          <DashboardPropertySlider />

          <TextWithSeeAll title="Services we provide" />
          <DataWrapper loading={loading} error={error}>
            <ServiceTextCard service={service ?? []} />
          </DataWrapper>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OwnerDashboard;
