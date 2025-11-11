import { facilities } from "@/constant/data";
import { Image, Text, View } from "react-native";

const Facilities = ({ amenities }: { amenities: string[] }) => {
  const filteredFacilities = facilities.filter((item) =>
    amenities.some(
      (amenity) => amenity.toLowerCase() === item.title.toLowerCase()
    )
  );

  if (!filteredFacilities.length) {
    return (
      <View className="mt-4">
        <Text
          style={{ fontFamily: "poppins-semi-bold" }}
          className="text-black-300 text-lg mb-2"
        >
          Facilities
        </Text>
        <Text
          style={{ fontFamily: "poppins-regular" }}
          className="text-black-200 text-sm"
        >
          No facilities available
        </Text>
      </View>
    );
  }

  return (
    <View className="gap-3">
      <Text
        style={{ fontFamily: "poppins-semi-bold" }}
        className="text-black-300 text-lg"
      >
        Facilities
      </Text>

      <View className="flex flex-row flex-wrap gap-4">
        {filteredFacilities.map((item, index) => (
          <View key={index} className="flex flex-col items-center w-[20%]">
            <View className="w-14 h-14 bg-primary-200 rounded-full flex justify-center items-center">
              <Image
                source={item.icon}
                className="size-7"
                style={{ tintColor: "#932537" }}
              />
            </View>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ fontFamily: "poppins-regular" }}
              className="text-black-300 text-sm text-center mt-1.5"
            >
              {item.title}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Facilities;
