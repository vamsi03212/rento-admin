import AuthButton from "@/common/components/AuthButton";
import AuthInput from "@/common/components/AuthInput";
import ModalUI from "@/common/components/ModalUi";
import React, { FC, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { completedServicesApi } from "../service/agent-dashboard-count.service";

interface Props {
  open: boolean;
  onClose: () => void;
  serviceId: string | number;
  refetchCurrentPage: () => Promise<void> | void;
}

const AgentAssiServiceCompleteModal: FC<Props> = ({
  open,
  onClose,
  serviceId,
  refetchCurrentPage,
}) => {
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!description.trim()) {
      setError("Description is required");
      return false;
    }
    if (description.trim().length < 10) {
      setError("Description must be at least 10 characters long");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    const apiRes = await completedServicesApi({ description, serviceId });
    if (apiRes.status) {
      Toast.show({
        type: "info",
        text1: "successfully completed",
        position: "bottom",
        visibilityTime: 2000,
      });
      await refetchCurrentPage();
    }
    setLoading(false);
    onClose();
  };

  return (
    <ModalUI
      open={open}
      onClose={onClose}
      isBottomSheet
      bgColor="#fff"
      padding={20}
    >
      <View className="w-full p-1">
        <Text
          style={{ fontFamily: "poppins-semi-bold" }}
          className="text-xl text-gray-900  mb-3"
        >
          Complete Service
        </Text>
        <Text
          style={{ fontFamily: "poppins-medium" }}
          className="text-gray-500  mb-6"
        >
          Please provide a brief description of the work completed.
        </Text>

        <AuthInput
          label="Description"
          value={description}
          onChangeText={(text) => {
            setDescription(text);
            if (error) setError("");
          }}
          placeholder="Write your work summary here..."
          multiline
          error={error}
        />
        <View className="mb-4" />
        <AuthButton
          title={loading ? "Processing..." : "Mark as Complete"}
          onPress={handleSubmit}
          disabled={loading}
          isLoading={loading}
        />
      </View>
    </ModalUI>
  );
};

export default React.memo(AgentAssiServiceCompleteModal);
