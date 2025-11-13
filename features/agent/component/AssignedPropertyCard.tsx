import { PropertyType } from "@/features/owner/types/property.type";
import { getImageUrl } from "@/lib/imageUrl";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

const AssignedPropertyCard = ({
  property,
  onPress,
}: {
  property: PropertyType;
  onPress?: () => void;
}) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-white rounded-2xl shadow-md mb-6 overflow-hidden border border-gray-100"
    >
      <Image
        source={getImageUrl(property?.images?.[0]?.image)}
        className="w-full h-48"
        resizeMode="cover"
      />
      <View className="p-4 border-b border-gray-100">
        <Text
          style={{ fontFamily: "poppins-semi-bold" }}
          className="text-lg font-semibold text-gray-900 mb-1"
        >
          {property.propertyType}
        </Text>
        <Text
          className="text-gray-500 mb-2"
          style={{ fontFamily: "poppins-medium" }}
        >
          {property?.area} - {property?.location} - {property?.country}
        </Text>
        <View className="flex-row justify-between mt-2">
          <Text className="text-gray-700 font-medium">
            Rent: {property?.rentAmount?.split(".")?.[0]}
          </Text>
          <Text className="text-gray-700 font-medium">
            {property?.bedrooms} BHK | {property?.bathrooms} Bath
          </Text>
        </View>
        {property?.propertyLength && (
          <Text
            className="text-gray-500 mt-1"
            style={{ fontFamily: "poppins-medium" }}
          >
            Size: {property?.propertyLength}
          </Text>
        )}
      </View>
      <View className="p-4">
        <Text
          style={{ fontFamily: "poppins-semi-bold" }}
          className="text-base font-semibold text-gray-900 mb-3"
        >
          Owner Details
        </Text>
        <View className="bg-gray-50 rounded-xl p-4 shadow-sm">
          <View className="flex-row items-center mb-3">
            <View className="w-12 h-12 rounded-full bg-[#932537]/10 items-center justify-center mr-3">
              <Text className="text-[#932537] text-lg font-semibold">
                {property?.Owner?.first_name?.charAt(0)}
              </Text>
            </View>
            <View>
              <Text className="text-gray-900 font-semibold text-base">
                {property?.Owner?.first_name}
              </Text>
              <Text className="text-gray-500 text-sm">
                {property?.Owner?.last_name}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default React.memo(AssignedPropertyCard);
