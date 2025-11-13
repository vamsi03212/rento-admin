import ModalUI from "@/common/components/ModalUi";
import { Ionicons } from "@expo/vector-icons";
import React, { FC, useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import { AssignedProperties } from "../types/assigned-services.types";

interface Props {
  open: boolean;
  onClose: () => void;
  service: AssignedProperties;
}

const AgentAssignedServiceDetailsModal: FC<Props> = ({
  open,
  onClose,
  service,
}) => {
  const fullName = useMemo(
    () => `${service.firstName} ${service.lastName || ""}`.trim(),
    [service.firstName, service.lastName]
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <ModalUI
      open={open}
      onClose={onClose}
      isBottomSheet
      bgColor="#fff"
      padding={0}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="px-7 py-7 max-h-[80vh]"
      >
        <View className="border-b border-gray-100  mb-5">
          <View className="flex-row items-end justify-between mb-3">
            <View className="flex-1">
              <Text
                style={{ fontFamily: "poppins-medium" }}
                className="text-2xl font-semibold text-gray-900"
              >
                {fullName}
              </Text>
              <Text
                style={{ fontFamily: "poppins-regular" }}
                className="text-base text-gray-500 mt-0.5"
              >
                Service Details
              </Text>
            </View>
            <View className="px-4 py-1.5 rounded-full border border-purple-200 bg-purple-100">
              <Text className="text-sm font-medium text-purple-700">
                {service.serviceType}
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-4">
          <View className="bg-white rounded-xl p-3 mr-4 shadow-sm">
            <Ionicons name="calendar-outline" size={22} color="#2563eb" />
          </View>
          <View className="flex-1">
            <Text
              className="text-sm text-gray-500 mb-0.5"
              style={{ fontFamily: "poppins-regular" }}
            >
              Scheduled For
            </Text>
            <Text className="text-lg font-semibold text-gray-900">
              {formatDate(service.date)}
            </Text>
            <Text className="text-base font-semibold text-blue-600 mt-1">
              {service.timeslot}
            </Text>
          </View>
        </View>

        {service.serviceDetails?.price && (
          <View className="flex-row items-center bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-4">
            <View className="bg-white rounded-xl p-3 mr-4 shadow-sm">
              <Ionicons name="cash-outline" size={22} color="#059669" />
            </View>
            <View>
              <Text className="text-sm text-gray-500">Service Price</Text>
              <Text className="text-2xl font-bold text-green-700 mt-1">
                ₹{service.serviceDetails.price}
              </Text>
            </View>
          </View>
        )}

        {service.description ? (
          <View className="bg-gray-50 border border-gray-200 rounded-2xl p-4 mb-4">
            <View className="flex-row items-center gap-2 mb-3">
              <Ionicons
                name="document-text-outline"
                size={18}
                color="#4b5563"
              />
              <Text
                style={{ fontFamily: "poppins-medium" }}
                className="text-base font-semibold text-gray-900"
              >
                Description
              </Text>
            </View>
            <Text
              style={{ fontFamily: "poppins-medium" }}
              className="text-gray-700 text-base leading-5"
            >
              {service.description}
            </Text>
          </View>
        ) : null}

        <View className="mb-10">
          <Text
            style={{ fontFamily: "poppins-medium" }}
            className="text-base font-semibold text-gray-900 mb-3"
          >
            Contact Information
          </Text>

          <View className="flex-row items-center bg-white border border-gray-200 rounded-xl p-3 mb-3">
            <View className="bg-blue-100 p-2.5 rounded-lg mr-3">
              <Ionicons name="mail-outline" size={18} color="#2563eb" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Email</Text>
              <Text className="text-sm font-semibold text-gray-900">
                {service.email}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-white border border-gray-200 rounded-xl p-3 mb-3">
            <View className="bg-green-100 p-2.5 rounded-lg mr-3">
              <Ionicons name="call-outline" size={18} color="#059669" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Phone</Text>
              <Text className="text-sm font-semibold text-gray-900">
                {service.phoneNumber}
              </Text>
            </View>
          </View>

          <View className="flex-row items-center bg-white border border-gray-200 rounded-xl p-3">
            <View className="bg-purple-100 p-2.5 rounded-lg mr-3">
              <Ionicons name="location-outline" size={18} color="#9333ea" />
            </View>
            <View className="flex-1">
              <Text className="text-xs text-gray-500">Address</Text>
              <Text className="text-sm font-semibold text-gray-900">
                {service.address}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </ModalUI>
  );
};

export default React.memo(AgentAssignedServiceDetailsModal);
