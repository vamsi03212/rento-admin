import { useState } from "react";

export const useAgentAssignedServiceModalHook = () => {
  const [viewModal, setViewModal] = useState(false);

  const [completedModal, setCompletedModal] = useState(false);

  return {
    viewModal,
    completedModal,
    setViewModal,
    setCompletedModal,
  };
};
