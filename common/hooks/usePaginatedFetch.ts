import { useEffect, useState } from "react";

export const usePaginatedFetch = ({
  fetchFn,
  deps = [],
  limit = 10,
}: {
  fetchFn: (page: number) => Promise<{ data: any[]; meta: any }>;
  deps?: any[];
  limit?: number;
}) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isPaginating, setIsPaginating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = async (pageNumber = 1) => {
    if (pageNumber === 1) setLoading(true);
    else setIsPaginating(true);

    setError(null);

    try {
      const res = await fetchFn(pageNumber);

      if (res && res.data) {
        const newData = res.data;
        const metaData = res.meta;

        setItems((prev) =>
          pageNumber === 1 ? newData : [...prev, ...newData]
        );
        setMeta(metaData);
        setHasMore(metaData.page < metaData.totalPages);
      } else {
        setHasMore(false);
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
      setIsPaginating(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading && !isPaginating) {
      setPage((prev) => prev + 1);
    }
  };

  const refresh = () => {
    setPage(1);
    fetchData(1);
  };

  useEffect(() => {
    fetchData(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, ...deps]);

  return {
    items,
    meta,
    loading,
    isPaginating,
    error,
    hasMore,
    loadMore,
    refresh,
    fetchData,
  };
};
