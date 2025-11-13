import { DashboardCount } from "@/common/components/DashboardCount";
import DataWrapper from "@/common/components/DataWrapper";
import EmptyWishlist from "@/common/components/EmptyWishlist";
import AssignedPropertyCard from "@/features/agent/component/AssignedPropertyCard";
import AssignedServiceCard from "@/features/agent/component/AssignedServiceCard";
import { useAgentAssignPropertyHook } from "@/features/agent/hooks/agent-aasigned-property.hook";
import { useOwnerDashbaordCountHook } from "@/features/owner/hooks/owner-dashboard-count.hook";
import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAgentAssignedServiceHook } from "../hooks/agent-assigned-services.hook";

const TABS = [
  { key: "assignedProperties", label: "Assigned Properties" },
  { key: "assignedServices", label: "Assigned Services" },
];

const AgentDashboard = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("assignedProperties");

  const screenWidth = Dimensions.get("window").width;
  const cardWidth = useMemo(
    () => (screenWidth - 24 - 16) / 2 - 2,
    [screenWidth]
  );

  const {
    dashboardCounts,
    error: countError,
    loading: countLoading,
  } = useOwnerDashbaordCountHook();

  const {
    assignedProperties,
    loading: propertyLoading,
    error: propertyError,
    loadMore,
    hasMore,
  } = useAgentAssignPropertyHook({ limit: 4 });

  const {
    assignedService,
    loading: serviceLoading,
    refetchCurrentPage,
    // error: serviceError,
  } = useAgentAssignedServiceHook({ limit: 4 });

  const loading = countLoading || propertyLoading || serviceLoading;

  const data = useMemo(() => {
    return activeTab === "assignedProperties"
      ? assignedProperties || []
      : assignedService || [];
  }, [activeTab, assignedProperties, assignedService]);

  const keyExtractor = useCallback(
    (item: any) => item.id?.toString() || item.title,
    []
  );

  const renderItem = useCallback(
    ({ item }: any) =>
      activeTab === "assignedProperties" ? (
        <AssignedPropertyCard
          property={item}
          onPress={() => router.push(`/property/${item.id}`)}
        />
      ) : (
        <AssignedServiceCard
          service={item}
          refetchCurrentPage={refetchCurrentPage}
        />
      ),
    [activeTab, refetchCurrentPage, router]
  );

  const handleLoadMore = useCallback(() => {
    if (hasMore && activeTab === "assignedProperties") loadMore();
  }, [hasMore, activeTab, loadMore]);

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["left", "right", "bottom"]}
    >
      <DataWrapper loading={loading} error={countError || propertyError}>
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 40,
            gap: 12,
            flexGrow: 1, // 👈 ensures empty state centers correctly
          }}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.4}
          initialNumToRender={4}
          windowSize={5}
          removeClippedSubviews
          ListHeaderComponent={
            <View className="pt-4 pb-2 gap-4">
              <View className="flex-row flex-wrap justify-between">
                {dashboardCounts?.map((item) => (
                  <View key={item.title} style={{ width: cardWidth }}>
                    <DashboardCount item={item} />
                  </View>
                ))}
              </View>

              <View className="flex-row justify-center flex-wrap gap-2">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <TouchableOpacity
                      key={tab.key}
                      onPress={() => setActiveTab(tab.key)}
                      activeOpacity={0.7}
                      className={`px-5 py-4 rounded-full ${
                        isActive ? "bg-[#932537]" : "bg-gray-100"
                      }`}
                    >
                      <Text
                        className={`font-medium ${
                          isActive ? "text-white" : "text-gray-600"
                        }`}
                      >
                        {tab.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          }
          ListEmptyComponent={
            activeTab === "assignedProperties" ? (
              <EmptyWishlist
                txt="No properties have been assigned yet!"
                isDisBtn={false}
              />
            ) : (
              <EmptyWishlist txt="No services assigned yet!" isDisBtn={false} />
            )
          }
        />
      </DataWrapper>
    </SafeAreaView>
  );
};

export default React.memo(AgentDashboard);
