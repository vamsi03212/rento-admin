import { Text, View } from "react-native";

const AuthHeader = ({
  title,
  subtitleTop,
  subtitleBottom,
}: {
  title: string;
  subtitleTop: string;
  subtitleBottom: string;
}) => (
  <View className="mt-10 mb-4">
    <Text
      style={{ fontFamily: "poppins-bold" }}
      className="text-3xl text-primary-100 text-center mb-9"
    >
      {title}
    </Text>
    <Text
      style={{ fontFamily: "poppins-semi-bold" }}
      className="text-2xl text-black-300"
    >
      {subtitleTop}
    </Text>
    <Text
      style={{ fontFamily: "poppins-semi-bold" }}
      className="text-2xl text-black-300"
    >
      {subtitleBottom}
    </Text>
  </View>
);

export default AuthHeader;
