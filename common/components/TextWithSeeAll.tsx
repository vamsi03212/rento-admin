import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type TextWithSeeAllProps = {
  title: string;
  seeAllText?: string;
  onSeeAllPress?: () => void;
};

const TextWithSeeAll: FC<TextWithSeeAllProps> = ({
  title,
  seeAllText = "See all",
  onSeeAllPress,
}) => {
  return (
    <View className="flex w-full flex-row items-center justify-between ">
      <Text
        style={{ fontFamily: "poppins-medium" }}
        className="text-lg font-poppins-bold text-black-300"
      >
        {title}
      </Text>
      <TouchableOpacity onPress={onSeeAllPress} disabled={!onSeeAllPress}>
        <Text className="text-sm font-poppins-semi-bold text-primary-100">
          {seeAllText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextWithSeeAll;
