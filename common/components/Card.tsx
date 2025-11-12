import icons from "@/constant/icons";
import images from "@/constant/images";

import { PropertyType } from "@/features/owner/types/property.type";
import { FC } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface CardTypes {
  property?: PropertyType;
  onPress?: () => void;
}

const Card: FC<CardTypes> = ({ property, onPress }) => {
  const statusColors: Record<string, { bg: string; text: string }> = {
    Approved: { bg: "bg-green-100", text: "text-green-700" },
    Rejected: { bg: "bg-red-100", text: "text-red-700" },
    Assigned: { bg: "bg-blue-100", text: "text-blue-700" },
    "In Progress": { bg: "bg-yellow-100", text: "text-yellow-800" },
    Pending: { bg: "bg-gray-100", text: "text-gray-700" },
  };

  const currentStatus = property?.propertyStatus || "Pending";
  const colorSet = statusColors[currentStatus] || statusColors.Pending;

  return (
    <TouchableOpacity
      className="flex-1 px-3 py-4 bg-white shadow-lg relative rounded-md overflow-hidden"
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View className="flex flex-row items-center absolute px-2 top-6 right-3 rounded-full z-50">
        <View className={`px-3 py-1 rounded-full ${colorSet.bg}`}>
          <Text
            style={{ fontFamily: "poppins-medium" }}
            className={`text-xs ${colorSet.text}`}
          >
            {currentStatus}
          </Text>
        </View>
      </View>

      {/* 🏠 Property Image */}
      <Image source={images.feature1} className="w-full h-40 rounded-lg" />

      {/* 📄 Property Info */}
      <View className="flex flex-col mt-2">
        <Text
          style={{ fontFamily: "poppins-medium" }}
          className="text-base text-black-300"
          numberOfLines={1}
        >
          {property?.projectName}
        </Text>
        <Text
          style={{ fontFamily: "poppins-regular" }}
          className="text-xs text-black-100"
          numberOfLines={2}
        >
          {property?.area}
        </Text>

        {/* 💰 Rent and Favorite */}
        <View className="flex flex-row items-center justify-between mt-2">
          <Text
            style={{ fontFamily: "poppins-bold" }}
            className="text-base text-primary-100"
          >
            ₹ {property?.rentAmount?.split(".")?.[0] || "—"}
          </Text>
          <Image
            source={icons.heart}
            className="w-5 h-5 mr-2"
            tintColor="#191D31"
          />
        </View>
        {/* <View className="flex flex-row items-center justify-between mt-3">
          <View
            className={`px-3 py-1 rounded-full ${
              property?.is_listed ? "bg-emerald-100" : "bg-gray-200"
            }`}
          >
            <Text
              style={{ fontFamily: "poppins-medium" }}
              className={`text-xs ${
                property?.is_listed ? "text-emerald-700" : "text-gray-600"
              }`}
            >
              {property?.is_listed ? "Listed" : "Unlisted"}
            </Text>
          </View>
        </View> */}
      </View>
    </TouchableOpacity>
  );
};

export default Card;
