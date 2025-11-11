import { Feather } from "@expo/vector-icons";
import React, { FC, useCallback, useMemo, useState } from "react";
import { Pressable, Text, TextInput, TextInputProps, View } from "react-native";

interface AuthInputProps extends TextInputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
}

const AuthInput: FC<AuthInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
  multiline = false,
  style,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // ✅ Safe value - prevents undefined/null crashes
  const safeValue = useMemo(() => {
    if (value === undefined || value === null) return "";
    return String(value);
  }, [value]);

  // ✅ Stable text change handler with error boundary
  const handleTextChange = useCallback(
    (text: string) => {
      try {
        if (onChangeText) {
          onChangeText(text);
        }
      } catch (err) {
        console.error("AuthInput onChangeText error:", err);
      }
    },
    [onChangeText]
  );

  // ✅ Stable password toggle
  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // ✅ Memoized container styles with proper types
  const containerStyles = useMemo(
    () => ({
      minHeight: multiline ? 90 : 55,
      alignItems: (multiline ? "flex-start" : "center") as
        | "flex-start"
        | "center",
      paddingVertical: multiline ? 8 : 0,
      maxHeight: 200,
    }),
    [multiline]
  );

  // ✅ Memoized border color
  const borderClass = useMemo(
    () => (error ? "border-red-400" : "border-transparent"),
    [error]
  );

  return (
    <View className="w-full mb-1">
      {label && (
        <Text
          className="mb-2 text-base text-black"
          style={{ fontFamily: "poppins-medium" }}
        >
          {label}
        </Text>
      )}

      <View
        className={`w-full px-4 rounded-lg bg-[#f5f5f5] border flex-row items-center ${borderClass}`}
        style={containerStyles}
      >
        <TextInput
          className="flex-1 text-black"
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={safeValue}
          onChangeText={handleTextChange}
          multiline={multiline}
          secureTextEntry={secureTextEntry && !showPassword}
          textAlignVertical={multiline ? "top" : "center"}
          style={[{ flex: 1, padding: 0 }, style]}
          {...rest}
        />

        {secureTextEntry && (
          <Pressable onPress={togglePassword} hitSlop={8}>
            <Feather
              name={showPassword ? "eye" : "eye-off"}
              size={20}
              color="#6b7280"
            />
          </Pressable>
        )}
      </View>

      {error ? (
        <Text className="text-red-500 mt-1 text-sm">{error}</Text>
      ) : null}
    </View>
  );
};

export default React.memo(AuthInput);
