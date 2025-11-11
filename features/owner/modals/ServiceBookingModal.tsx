import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Pressable, ScrollView, Text, TextInput } from "react-native";
// import { useBookServiceHook } from "../hooks/book-service.hook";

import AuthButton from "@/common/components/AuthButton";
import ModalUI from "@/common/components/ModalUi";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useBookServiceHook } from "../hooks/book-service.hook";
interface ServiceBookingModalProps {
  open: boolean;
  onClose: () => void;
  serviceType: string;
  price: string;
}

const ServiceBookingModal: FC<ServiceBookingModalProps> = ({
  open,
  onClose,
  serviceType,
  price,
}) => {
  const user = useAuthStore((state) => state.user);
  const router = useRouter();

  const {
    formData,
    showPicker,
    setShowPicker,
    handleDateChange,
    handleTimeChange,
    formatDisplayDate,
    updateField,
    handleSubmit,
    errors,
    loading,
  } = useBookServiceHook({ serviceType, onClose });
  return (
    <ModalUI
      open={open}
      onClose={onClose}
      isBottomSheet
      bgColor="#fff"
      padding={25}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="text-lg mb-4" style={{ fontFamily: "poppins-medium" }}>
          Book Your{" "}
          <Text
            className="text-primary-100 text-xl"
            style={{ fontFamily: "poppins-semi-bold" }}
          >
            {serviceType}
          </Text>{" "}
          Slot
        </Text>
        <Text
          className="text-base mb-2"
          style={{ fontFamily: "poppins-medium" }}
        >
          Select Date
        </Text>

        <Pressable
          onPress={() => setShowPicker((p) => ({ ...p, date: true }))}
          className="border border-gray-300 rounded-xl p-3 mb-4"
        >
          <Text
            className="text-gray-700"
            style={{ fontFamily: "poppins-regular" }}
          >
            {formatDisplayDate(formData.date)}
          </Text>
        </Pressable>

        {errors.date && (
          <Text className="text-red-500 text-xs mb-3">{errors.date}</Text>
        )}

        {showPicker.date && (
          <DateTimePicker
            value={formData.date ? new Date(formData.date) : new Date()}
            mode="date"
            display="default"
            minimumDate={new Date()}
            onChange={handleDateChange}
          />
        )}

        {/* --- Time Picker --- */}
        <Text
          className="text-base mb-2"
          style={{ fontFamily: "poppins-medium" }}
        >
          Select Time
        </Text>

        <Pressable
          onPress={() => setShowPicker((p) => ({ ...p, time: true }))}
          className="border border-gray-300 rounded-xl p-3 mb-4"
        >
          <Text
            className="text-gray-700"
            style={{ fontFamily: "poppins-regular" }}
          >
            {formData.time || "Select Time"}
          </Text>
        </Pressable>
        {errors.time && (
          <Text className="text-red-500 text-xs mb-3">{errors.time}</Text>
        )}

        {showPicker.time && (
          <DateTimePicker
            value={new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        <Text
          className="text-base mb-2"
          style={{ fontFamily: "poppins-medium" }}
        >
          Service Address
        </Text>

        <TextInput
          placeholder="House No, Street, Apartment, City, Landmark..."
          className="border border-gray-300 rounded-xl p-3 text-sm mb-4 h-20"
          style={{ fontFamily: "poppins-regular" }}
          multiline
          value={formData.address}
          onChangeText={(val) => updateField("address", val)}
        />

        {errors.address && (
          <Text className="text-red-500 text-xs mb-3">{errors.address}</Text>
        )}

        {/* --- Problem / Note --- */}
        <Text
          className="text-base mb-2"
          style={{ fontFamily: "poppins-medium" }}
        >
          Technician Note
        </Text>

        <TextInput
          placeholder="Add specific instructions for technician..."
          className="border border-gray-300 rounded-xl p-3 text-sm mb-4 h-24"
          style={{ fontFamily: "poppins-regular", textAlignVertical: "top" }}
          multiline
          value={formData.problem}
          onChangeText={(val) => updateField("problem", val)}
        />
        {errors.problem && (
          <Text className="text-red-500 text-xs mb-3">{errors.problem}</Text>
        )}
        <Text
          className="mb-2 text-primary-100"
          style={{ fontFamily: "poppins-medium" }}
        >
          ₹ {price ?? 0}
        </Text>

        <AuthButton
          onPress={handleSubmit}
          title="Book Service"
          isLoading={loading}
        />
      </ScrollView>
    </ModalUI>
  );
};

export default ServiceBookingModal;
