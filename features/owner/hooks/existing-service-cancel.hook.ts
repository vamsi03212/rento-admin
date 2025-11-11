import { useState } from "react";
import Toast from "react-native-toast-message";
import { cancelServiceApi } from "../services/owenr-servicesprovide.service";
import { ExistingServiceType } from "../types/service-provided.types";

export const useExistingServiceCancelHook = ({
  service,
  refetch,
}: {
  service: ExistingServiceType;
  refetch: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [isDisplayDeleteModal, setIsDisplayDeleteModal] = useState(false);

  const handleCancelSeervice = async () => {
    setLoading(true);
    const apiRes = await cancelServiceApi(service.id);

    if (apiRes.status) {
      refetch();
      setIsDisplayDeleteModal(false);
      Toast.show({
        type: "info",
        text1: "Booking cancelled successfully",
        position: "bottom",
        visibilityTime: 2000,
      });
    }
    setLoading(false);
  };

  return {
    isDisplayDeleteModal,
    setIsDisplayDeleteModal,
    handleCancelSeervice,
    loading,
  };
};
