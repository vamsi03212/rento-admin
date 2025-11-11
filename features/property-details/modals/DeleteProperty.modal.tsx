import ModalUI from "@/common/components/ModalUi";
import RadioButtonGroup from "@/common/components/RadioButtonGroup";
import React, { FC, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { deletePropertyFromOwner } from "../services/delete-properties.service";

const DeletePropertyModal: FC<{
  open: boolean;
  onClose: () => void;
  propertyId: number;
}> = ({ open, onClose, propertyId }) => {
  const options = [
    "The Plans are too expensive",
    "The software is too complicated",
    "I no longer need the app",
    "Plans are more costly",
    "Something else",
  ];

  const [selectedOption, setSelectedOption] = useState("");
  const [customReason, setCustomReason] = useState("");

  const handleConfirm = () => {
    const finalReason =
      selectedOption === "Something else" ? customReason : selectedOption;
    console.log("Delete reason:", finalReason);
    handleClose();
  };

  const handleClose = async () => {
    const apiRes = await deletePropertyFromOwner({
      propertyId,
    });
    setSelectedOption("");
    setCustomReason("");
    onClose();
  };

  useEffect(() => {
    if (!open) {
      setSelectedOption("");
      setCustomReason("");
    }
  }, [open]);

  return (
    <ModalUI
      open={open}
      onClose={handleClose}
      bgColor="#fff"
      padding={25}
      isBottomSheet
    >
      <View className="gap-5">
        <Text
          className="text-lg text-black "
          style={{ fontFamily: "poppins-semi-bold" }}
        >
          Delete Property
        </Text>

        <Text
          className="text-gray-500 text-sm "
          style={{ fontFamily: "poppins-regular" }}
        >
          Please tell us why you want to delete this property. Your feedback
          helps us improve your experience.
        </Text>

        <RadioButtonGroup
          options={options}
          selectedOption={selectedOption}
          onSelect={setSelectedOption}
        />

        {selectedOption === "Something else" && (
          <TextInput
            placeholder="Please specify your reason..."
            placeholderTextColor="#9CA3AF"
            value={customReason}
            onChangeText={setCustomReason}
            multiline
            className="border border-gray-300 rounded-2xl px-4 py-3 text-base text-gray-800"
            style={{ fontFamily: "poppins-regular", minHeight: 80 }}
          />
        )}

        <View className="flex-row justify-between mt-4">
          <Pressable
            onPress={handleClose}
            className="flex-1 py-3 mr-2 rounded-full border border-gray-300"
            android_ripple={{ color: "#e5e7eb" }}
          >
            <Text
              className="text-center text-gray-700"
              style={{ fontFamily: "poppins-medium" }}
            >
              Cancel
            </Text>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            disabled={
              !selectedOption ||
              (selectedOption === "Something else" && !customReason.trim())
            }
            className={`flex-1 py-3 rounded-full ${
              !selectedOption ||
              (selectedOption === "Something else" && !customReason.trim())
                ? "bg-gray-300"
                : "bg-[#932537]"
            }`}
            android_ripple={{ color: "#ffffff20" }}
          >
            <Text
              className="text-center text-white"
              style={{ fontFamily: "poppins-medium" }}
            >
              Confirm Delete
            </Text>
          </Pressable>
        </View>
      </View>
    </ModalUI>
  );
};

export default DeletePropertyModal;
