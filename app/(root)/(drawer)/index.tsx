import { useAuthStore } from "@/features/auth/store/useAuthStore";
import OwnerDashboard from "@/features/owner/screens/OwnerDashboard";
import AgentDashboard from "./agent-dashoard";

export default function Index() {
  const role = useAuthStore((state) => state.user?.role);
  return role === "owner" ? <OwnerDashboard /> : <AgentDashboard />;
}
