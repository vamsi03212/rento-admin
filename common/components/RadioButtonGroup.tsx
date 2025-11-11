import { FC } from "react";
import { Pressable, Text, View } from "react-native";

interface RadioButtonProps {
  options: string[];
  selectedOption?: string;
  onSelect: (option: string) => void;
}

const RadioButtonGroup: FC<RadioButtonProps> = ({
  options,
  selectedOption,
  onSelect,
}) => {
  return (
    <View className="flex  gap-6">
      {options?.map((option) => {
        const isSelected = option === selectedOption;
        return (
          <Pressable
            key={option}
            onPress={() => onSelect(option)}
            className={`w-full flex flex-row items-center`}
          >
            <View
              className={`w-5 h-5 rounded-full mr-2 flex items-center justify-center border ${
                isSelected ? "border-primary-100" : "border-gray-400"
              }`}
            >
              {isSelected && (
                <View className="w-3 h-3 bg-primary-100 rounded-full" />
              )}
            </View>
            <Text
              style={{ fontFamily: "poppins-medium" }}
              className={`text-black text-base ${
                isSelected ? "font-bold" : "font-medium"
              }`}
            >
              {option}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RadioButtonGroup;
