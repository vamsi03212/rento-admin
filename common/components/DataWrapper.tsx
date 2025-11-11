import { FC, ReactNode } from "react";
import { ActivityIndicator, Text, View } from "react-native";

interface DataWrapperProps {
  loading: boolean;
  error: string | null;
  children: ReactNode;
  emptyMessage?: string;
}

const DataWrapper: FC<DataWrapperProps> = ({
  loading,
  error,
  children,
  emptyMessage = "No data found.",
}) => {
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#932537" />
        {/* <Text className="mt-2">Loading...</Text> */}
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-center px-4">{error}</Text>
      </View>
    );
  }

  // If children exist, render them
  return <>{children}</>;
};

export default DataWrapper;
