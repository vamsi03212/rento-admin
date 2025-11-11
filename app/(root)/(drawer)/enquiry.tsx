import DataWrapper from "@/common/components/DataWrapper";
import EmptyWishlist from "@/common/components/EmptyWishlist";
import HorizantalCard from "@/common/components/HorizantalCard";
import Search from "@/common/components/Search";
import { useOwnerEnquiryHook } from "@/features/owner/hooks/owner-enquiry.hook";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const Enquiry = () => {
  const {
    enquiry,
    loading,
    error,
    query,
    loadMore,
    refresh,
    isPaginating,
    hasMore,
  } = useOwnerEnquiryHook();

  return (
    <View className="flex-1 bg-white p-3">
      <View className="gap-4 mb-3">
        <Search />
      </View>
      <DataWrapper
        loading={loading && enquiry.length === 0}
        error={error}
        emptyMessage="No enquiries found."
      >
        {enquiry && enquiry.length > 0 ? (
          <FlatList
            data={enquiry}
            keyExtractor={(item, index) =>
              `${item.id ?? "no-id"}-${item.createdAt ?? index}-${index}`
            }
            renderItem={({ item }) => (
              <HorizantalCard
                property={item}
                isDisUserDetails
                // Optional: navigate if needed
                // onPress={() => router.push(`/property/${item.Property?.id}`)}
              />
            )}
            ItemSeparatorComponent={() => <View className="h-2" />}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-20"
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshing={loading && enquiry.length === 0}
            onRefresh={refresh}
            ListFooterComponent={() => {
              if (loading && enquiry.length === 0) return null;

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

export default Enquiry;
