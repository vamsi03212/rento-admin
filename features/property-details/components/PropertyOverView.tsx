import { Text, View } from "react-native";

const PropertyOverView = ({ desc }: { desc: string }) => {
  return (
    <View className="gap-2">
      <Text
        style={{ fontFamily: "poppins-semi-bold" }}
        className="text-black-300 text-lg "
      >
        Overview
      </Text>
      <Text style={{ fontFamily: "poppins-regular" }} className="text-base ">
        {desc}
      </Text>
    </View>
  );
};

export default PropertyOverView;
