import { getImageUrl } from "@/lib/imageUrl";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { AgentMyRequest } from "../types/assigned-mmy-request.types";

const AgentMyRequestCard = ({ item }: { item: AgentMyRequest }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <View className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-3">
      {item.uploadDocument && (
        <Pressable>
          <Image
            source={getImageUrl(item.uploadDocument)}
            className="w-full h-48 "
            resizeMode="cover"
          />
        </Pressable>
      )}
      <View className="w-full p-4">
        <View className="flex-row justify-between items-center mb-2">
          <View className="flex-1 pr-3">
            <Text
              className="text-lg text-gray-900"
              style={{ fontFamily: "poppins-semi-bold" }}
            >
              {item.fullName}
            </Text>
            <Text
              className="text-sm text-gray-500"
              style={{ fontFamily: "poppins-regular" }}
            >
              {item.Property?.project_name ?? "No Property Info"}
            </Text>
          </View>
          <View className="bg-primary-100/10 px-3 py-1 rounded-full">
            <Text
              className="text-primary-100 text-xs"
              style={{ fontFamily: "poppins-medium" }}
            >
              #{item.id}
            </Text>
          </View>
        </View>

        <View className="flex-row justify-between mb-2">
          <View>
            <Text
              className="text-xs text-gray-500"
              style={{ fontFamily: "poppins-regular" }}
            >
              Contact
            </Text>
            <Text
              className="text-sm text-gray-700"
              style={{ fontFamily: "poppins-medium" }}
            >
              {item.phoneNumber}
            </Text>
          </View>

          <View>
            <Text
              className="text-xs text-gray-500 text-right"
              style={{ fontFamily: "poppins-regular" }}
            >
              Profession
            </Text>
            <Text
              className="text-sm text-gray-700 text-right"
              style={{ fontFamily: "poppins-medium" }}
            >
              {item.profession}
            </Text>
          </View>
        </View>

        <Text
          className="text-xs text-gray-500 mb-1"
          style={{ fontFamily: "poppins-regular" }}
        >
          Email
        </Text>
        <Text
          className="text-sm text-gray-700 mb-3"
          style={{ fontFamily: "poppins-medium" }}
        >
          {item.emailId}
        </Text>
      </View>
      <View className="mt-3 border-t border-gray-100 p-4 flex-row justify-between">
        <Text
          className="text-xs text-gray-500"
          style={{ fontFamily: "poppins-regular" }}
        >
          DOB: {formatDate(item.dateOfBirth)}
        </Text>
        <Text
          className="text-xs text-gray-500"
          style={{ fontFamily: "poppins-regular" }}
        >
          Submitted: {formatDate(item.createdAt)}
        </Text>
      </View>
    </View>
  );
};

export default AgentMyRequestCard;
