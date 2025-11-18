import { useState } from "react";
import Toast from "react-native-toast-message";
import { cancelServiceApi } from "../services/owenr-servicesprovide.service";
import { ExistingServiceType } from "../types/service-provided.types";

export const useExistingServiceCancelHook = ({
  service,
  updateItem,
}: {
  service: ExistingServiceType;
  updateItem: (item: ExistingServiceType) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [isDisplayDeleteModal, setIsDisplayDeleteModal] = useState(false);

  const handleCancelSeervice = async () => {
    setLoading(true);
    const apiRes = await cancelServiceApi(service.id);

    if (apiRes.status && apiRes.data) {
      // updateItem(apiRes.data);
      // const updated: ExistingServiceType = {
      //   ...service,
      //   ...apiRes.data,
      // };
      //    updateItem(updated);
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
