import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const useSearchHook = () => {
  const params = useLocalSearchParams<{ query?: string }>();
  const [search, setSearch] = useState(params.query);
  const [filterModal, setFilterModal] = useState(false);

  const debouncedSearch = useDebouncedCallback((text: string) => {
    router.setParams({ query: text });
  }, 500);

  const handleSearch = (text: string) => {
    setSearch(text);
    debouncedSearch(text);
  };

  return {
    search,
    handleSearch,
    // filters
    filterModal,
    setFilterModal,
  };
};
