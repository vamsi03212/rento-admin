import AuthButton from "@/common/components/AuthButton";
import AuthInput from "@/common/components/AuthInput";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { agentPropertyApprovedRejected } from "../services/agent-approved-rejected.service";

interface AgentActionProps {
  propertyId: string | number;
}

const AgentAction: React.FC<AgentActionProps> = ({ propertyId }) => {
  const router = useRouter();
  const [action, setAction] = useState<"Approved" | "Rejected" | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (action === "Rejected" && !reason.trim()) return;
    setLoading(true);
    const apiRes = await agentPropertyApprovedRejected({
      action,
      description: reason,
      propertyId,
    });
    if (apiRes.status) {
      setAction(null);
      setReason("");
      router.back();
      Toast.show({
        type: "success",
        text1: `Property ${action?.toLowerCase()} successfully`,
        position: "bottom",
        visibilityTime: 2000,
      });
    }
    setLoading(false);
  };

  return (
    <View className="mt-6 p-4 bg-gray-50 rounded-2xl border border-gray-200">
      <Text
        className="text-lg font-semibold text-gray-900 mb-3"
        style={{ fontFamily: "poppins-medium" }}
      >
        Property Action
      </Text>

      <View className="flex-row items-center gap-4 mb-4">
        <TouchableOpacity
          onPress={() => setAction("Approved")}
          className={`flex-1 py-3 px-4 rounded-lg border ${
            action === "Approved"
              ? "border-green-600 bg-green-50"
              : "border-gray-300"
          }`}
        >
          <Text
            className={`text-center font-medium ${
              action === "Approved" ? "text-green-600" : "text-gray-700"
            }`}
          >
            Approved
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setAction("Rejected")}
          className={`flex-1 py-3 px-4 rounded-lg border ${
            action === "Rejected"
              ? "border-red-600 bg-red-50"
              : "border-gray-300"
          }`}
        >
          <Text
            className={`text-center font-medium ${
              action === "Rejected" ? "text-red-600" : "text-gray-700"
            }`}
          >
            Reject
          </Text>
        </TouchableOpacity>
      </View>

      {/* Reason Input */}
      {action === "Rejected" && (
        <View className="mb-4">
          <AuthInput
            label="Reason for rejection"
            value={reason}
            onChangeText={setReason}
            placeholder="Write the reason here..."
            multiline
            error={!reason.trim() ? "Reason is required" : ""}
          />
        </View>
      )}

      {/* Submit Button */}
      {action && (
        <AuthButton
          title={loading ? "Processing..." : "Submit"}
          onPress={handleSubmit}
          disabled={action === "Rejected" && !reason.trim()}
          isLoading={loading}
        />
      )}
    </View>
  );
};

export default AgentAction;
