import { useAuthStore } from "@/features/auth/store/useAuthStore";
import OwnerDashboard from "@/features/owner/screens/OwnerDashboard";
import { Text } from "react-native";

export default function Index() {
  const role = useAuthStore((state) => state.user?.role);
  if (role === "owner") return <OwnerDashboard />;
  return <Text>Login</Text>;
}
