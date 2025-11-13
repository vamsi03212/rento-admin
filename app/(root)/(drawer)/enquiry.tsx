import HorizantalCard from "@/common/components/HorizantalCard";
import PaginatedList from "@/common/components/PaginatedList";
import { useOwnerEnquiryHook } from "@/features/owner/hooks/owner-enquiry.hook";
import React from "react";

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
    <PaginatedList
      data={enquiry}
      loading={loading}
      error={error}
      query={query ?? ""}
      loadMore={loadMore}
      refresh={refresh}
      isPaginating={isPaginating}
      hasMore={hasMore}
      renderItem={({ item }) => (
        <HorizantalCard property={item} isDisUserDetails />
      )}
      emptyText="You don’t have any property enquiries yet."
      searchEmptyText="No search results found."
    />
  );
};

export default Enquiry;
