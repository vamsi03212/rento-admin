import DataWrapper from "@/common/components/DataWrapper";
import EmptyWishlist from "@/common/components/EmptyWishlist";
import Search from "@/common/components/Search";
import AlreadyBookedServiceCom from "@/features/owner/component/AlreadyBookedService";
import { useAlreadyExistingServiceBookingHook } from "@/features/owner/hooks/alredy-existing-service-bookings";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const ServiceBooking = () => {
  const {
    services,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    query,
    isPaginating,
    fetchFn,
    meta,
    refetchCurrentPage,
  } = useAlreadyExistingServiceBookingHook();

  return (
    <View className="flex-1 bg-white p-3">
      <View className="gap-4 mb-3">
        <Search />
      </View>
      <DataWrapper
        loading={loading && services.length === 0}
        error={error}
        emptyMessage="No enquiries found."
      >
        {services && services.length > 0 ? (
          <FlatList
            data={services}
            keyExtractor={(item, index) =>
              `${item.id ?? "no-id"}-${item.createdAt ?? index}-${index}`
            }
            renderItem={({ item }) => (
              <AlreadyBookedServiceCom
                service={item}
                refetch={refetchCurrentPage}
              />
            )}
            ItemSeparatorComponent={() => <View className="h-2" />}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-20"
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshing={loading && services.length === 0}
            onRefresh={refresh}
            ListFooterComponent={() => {
              if (loading && services.length === 0) return null;

              if (isPaginating) {
                return (
                  <ActivityIndicator
                    size="large"
                    color="#932537"
                    className="my-4"
                  />
                );
              }

              if (!hasMore) {
                return (
                  <Text className="text-center text-gray-500 my-7">
                    You’ve reached the end 🎉
                  </Text>
                );
              }

              return null;
            }}
          />
        ) : (
          <View className="flex-1">
            {query ? (
              <EmptyWishlist txt="No search results found." isDisBtn={false} />
            ) : (
              <EmptyWishlist txt="You don’t have any property enquiries yet." />
            )}
          </View>
        )}
      </DataWrapper>
    </View>
  );
};

export default ServiceBooking;
