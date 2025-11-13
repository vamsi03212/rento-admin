import DataWrapper from "@/common/components/DataWrapper";
import EmptyWishlist from "@/common/components/EmptyWishlist";
import Search from "@/common/components/Search";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from "react-native";

interface PaginatedListProps<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  query: string;
  loadMore: () => void;
  refresh: () => void;
  isPaginating: boolean;
  hasMore: boolean;
  renderItem: ListRenderItem<T>;
  emptyText: string;
  searchEmptyText?: string;
  isDisSearch?: boolean;
}

const PaginatedList = <T,>({
  data,
  loading,
  error,
  query,
  loadMore,
  refresh,
  isPaginating,
  hasMore,
  renderItem,
  emptyText,
  searchEmptyText,
  isDisSearch = true,
}: PaginatedListProps<T>) => {
  const renderFooter = () => {
    if (loading && data.length === 0) return null;

    if (isPaginating) {
      return (
        <ActivityIndicator size="large" color="#932537" className="my-4" />
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
  };

  return (
    <View className="flex-1 bg-white p-3">
      {isDisSearch && (
        <View className="gap-4 mb-3">
          <Search />
        </View>
      )}

      <DataWrapper
        loading={loading && data.length === 0}
        error={error}
        emptyMessage={emptyText}
      >
        {data && data.length > 0 ? (
          <FlatList
            data={data}
            keyExtractor={(item, index) =>
              `${(item as any)?.id ?? "no-id"}-${index}`
            }
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View className="h-3" />}
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-20"
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
            refreshing={loading && data.length === 0}
            onRefresh={refresh}
            ListFooterComponent={renderFooter}
          />
        ) : (
          <View className="flex-1">
            {query ? (
              <EmptyWishlist
                txt={searchEmptyText ?? "No search results found."}
                isDisBtn={false}
              />
            ) : (
              <EmptyWishlist txt={emptyText} />
            )}
          </View>
        )}
      </DataWrapper>
    </View>
  );
};

export default PaginatedList;
