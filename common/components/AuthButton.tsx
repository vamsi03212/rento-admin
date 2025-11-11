import { FC, ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
} from "react-native";

interface AuthButtonProps extends PressableProps {
  title: string;
  children?: ReactNode;
  disabled?: boolean;
  onPress: () => void;
  bgColor?: string;
  textColor?: string;
  isLoading?: boolean;
}

const AuthButton: FC<AuthButtonProps> = ({
  title,
  onPress,
  disabled = false,
  bgColor = "#932537",
  textColor = "#fff",
  children,
  isLoading = false,
  ...rest
}) => {
  return (
    <Pressable
      className={`w-full h-14 rounded-lg justify-center items-center`}
      style={{ backgroundColor: disabled ? "#d1d5db" : bgColor }}
      onPress={onPress}
      disabled={disabled}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : children ? (
        children
      ) : (
        <Text className="text-lg font-medium" style={{ color: textColor }}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default AuthButton;
