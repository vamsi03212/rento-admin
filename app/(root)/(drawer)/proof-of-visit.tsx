import PaginatedList from "@/common/components/PaginatedList";
import AgentProofOfvisit from "@/features/agent/component/AgentProofOfvisit";
import { useAgentProofOfVisitHook } from "@/features/agent/hooks/agent-proof-of-visit.hook";
import React from "react";

const ProofOfVisit = () => {
  const {
    proofOfVisit,
    loading,
    error,
    query,
    loadMore,
    refresh,
    isPaginating,
    hasMore,
  } = useAgentProofOfVisitHook();

  const renderProofCard = ({ item }: any) => <AgentProofOfvisit item={item} />;

  return (
    <PaginatedList
      data={proofOfVisit}
      loading={loading}
      error={error}
      query={query ?? ""}
      loadMore={loadMore}
      refresh={refresh}
      isPaginating={isPaginating}
      hasMore={hasMore}
      renderItem={renderProofCard}
      emptyText="You don’t have any proof of visits yet."
      searchEmptyText="No proof of visit results found."
      isDisSearch={false}
    />
  );
};

export default ProofOfVisit;
