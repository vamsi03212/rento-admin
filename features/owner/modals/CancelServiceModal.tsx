import ModalUI from "@/common/components/ModalUi";
import { AlertTriangle } from "lucide-react-native";
import React, { FC } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface CancelServiceModalProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  onConfirm?: () => void;
  //   serviceType: string;
  //   price: string;
}

const CancelServiceModal: FC<CancelServiceModalProps> = ({
  open,
  onClose,
  loading,
  onConfirm,
}) => {
  return (
    <ModalUI
      open={open}
      onClose={onClose}
      isBottomSheet
      bgColor="#fff"
      padding={25}
    >
      <View className="items-center gap-2 mb-7">
        <View className="bg-red-100 p-3 rounded-full mb-3">
          <AlertTriangle size={28} color="#dc2626" />
        </View>
        <Text className="text-lg font-semibold text-gray-800 mb-1">
          Cancel Service?
        </Text>
        <Text className="text-gray-500 text-center text-sm px-2">
          Are you sure you want to cancel this service? Please tell us why so we
          can improve your experience.
        </Text>
      </View>
      <View className="flex-row justify-between gap-3">
        <TouchableOpacity
          onPress={onClose}
          className="flex-1 border border-gray-300 rounded-xl py-3 items-center"
        >
          <Text className="text-gray-700 font-medium">Go Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onConfirm}
          className="flex-1 bg-red-600 rounded-xl py-3 items-center"
        >
          {loading ? (
            <ActivityIndicator size="small" color="#932537" />
          ) : (
            <Text className="text-white font-medium">Cancel Service</Text>
          )}
        </TouchableOpacity>
      </View>
    </ModalUI>
  );
};

export default CancelServiceModal;
