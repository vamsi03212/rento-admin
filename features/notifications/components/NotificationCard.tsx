// NotificationCard.tsx
import { shadowStyles } from "@/common/styles/shadow-styles";
import { Text, View } from "react-native";

type Props = {
  title: string;
  message: string;
  status: string;
  icon: React.ReactNode;
  statusColor?: string;
};

const NotificationCard = ({
  title,
  message,
  status,
  icon,
  statusColor = "#932537",
}: Props) => {
  return (
    <View
      className="w-full px-4 py-3 flex flex-row gap-4 items-center bg-white rounded-lg mb-3"
      style={shadowStyles.shadow}
    >
      <View className="w-7 h-7 justify-center items-center">{icon}</View>

      <View className="flex-1">
        <Text className="text-base" style={{ fontFamily: "poppins-semi-bold" }}>
          {title}
        </Text>

        <Text
          style={{ fontFamily: "poppins-regular" }}
          className="text-xs text-gray-500"
        >
          {message}
        </Text>

        <Text
          className="text-sm"
          style={{ fontFamily: "poppins-medium", color: statusColor }}
        >
          {status}
        </Text>
      </View>
    </View>
  );
};

export default NotificationCard;
