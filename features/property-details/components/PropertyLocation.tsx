import icons from "@/constant/icons";
import images from "@/constant/images";
import { PropertyType } from "@/features/owner/types/property.type";
import { FC } from "react";
import { Image, Text, View } from "react-native";

interface PropertyLocationProps {
  property: PropertyType | null;
}

const PropertyLocation: FC<PropertyLocationProps> = ({ property }) => {
  return (
    <View className="gap-3">
      <Text
        style={{ fontFamily: "poppins-semi-bold" }}
        className="text-black-300 text-lg"
      >
        Location
      </Text>
      <View className="flex flex-row items-center justify-start gap-2">
        <Image
          source={icons.location}
          className="w-7 h-7"
          style={{ tintColor: "#932537" }}
        />
        <Text
          style={{ fontFamily: "poppins-medium" }}
          className="text-black-200 text-sm w-[calc(100%-30px)] overflow-hidden"
          numberOfLines={2}
        >
          {property?.area}, {property?.location}, {property?.country}
        </Text>
      </View>
      <Image source={images.map} className="h-52 w-full rounded-xl" />
    </View>
  );
};

export default PropertyLocation;
