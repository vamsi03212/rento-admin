import DataWrapper from "@/common/components/DataWrapper";
import EmptyWishlist from "@/common/components/EmptyWishlist";
import Search from "@/common/components/Search";
import AgentMyRequestCard from "@/features/agent/component/AgentMyRequestCard";
import { useAgentMyRequestHook } from "@/features/agent/hooks/agent-my-request.hook";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const MyRequest = () => {
  const {
    myrequest,
    loading,
    error,
    query,
    loadMore,
    refresh,
    isPaginating,
    hasMore,
  } = useAgentMyRequestHook();

  const renderItem = ({ item }: any) => <AgentMyRequestCard item={item} />;

  return (
    <View className="flex-1 bg-white p-3">
      <View className="gap-4 mb-3">
        <Search />
      </View>

      <DataWrapper
        loading={loading && myrequest.length === 0}
        error={error}
        emptyMessage="No requests found."
      >
        {myrequest && myrequest.length > 0 ? (
          <FlatList
            data={myrequest}
            keyExtractor={(item, index) =>
              `${item.id ?? "no-id"}-${item.createdAt ?? index}-${index}`
            }
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-20"
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshing={loading && myrequest.length === 0}
            onRefresh={refresh}
            ItemSeparatorComponent={() => <View className="h-2" />}
            ListFooterComponent={() => {
              if (loading && myrequest.length === 0) return null;
              if (isPaginating)
                return (
                  <ActivityIndicator
                    size="large"
                    color="#932537"
                    className="my-4"
                  />
                );
              if (!hasMore)
                return (
                  <Text className="text-center text-gray-500 my-7">
                    You’ve reached the end 🎉
                  </Text>
                );
              return null;
            }}
          />
        ) : (
          <View className="flex-1">
            {query ? (
              <EmptyWishlist txt="No search results found." isDisBtn={false} />
            ) : (
              <EmptyWishlist txt="No property requests yet." isDisBtn={false} />
            )}
          </View>
        )}
      </DataWrapper>
    </View>
  );
};

export default MyRequest;
