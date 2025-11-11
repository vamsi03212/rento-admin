import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const { user } = useAuthStore();
  const segments = useSegments();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    if (!user) {
      router.replace("/(auth)/login-screen");
    } else {
      if (segments[1] !== "(drawer)") {
        router.replace("/(root)/(drawer)");
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, [user]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" color="#932537" />
      </View>
    );
  }

  return <Slot />;
}
