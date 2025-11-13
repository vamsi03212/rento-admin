import AuthButton from "@/common/components/AuthButton";
import AuthInput from "@/common/components/AuthInput";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { agentPropertyApprovedRejected } from "../services/agent-approved-rejected.service";

interface AgentActionProps {
  propertyId: string | number;
}

const AgentAction: React.FC<AgentActionProps> = ({ propertyId }) => {
  const router = useRouter();
  const { user } = useAuthStore();
  const [action, setAction] = useState<"Approved" | "Rejected" | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const pickImageFromGallery = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted)
      return Alert.alert("Permission required", "Please allow gallery access.");

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const takePhotoFromCamera = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted)
      return Alert.alert("Permission required", "Please allow camera access.");

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    if (action === "Rejected" && !reason.trim()) return;
    if (action === "Approved" && !image)
      return Alert.alert("Please upload a document before approving.");

    setLoading(true);

    const formData = new FormData();
    formData.append("description", reason);
    formData.append("propertyId", propertyId.toString());

    if (image && action === "Approved") {
      formData.append("image", {
        uri: image,
        name: "approval-document.jpg",
        type: "image/jpeg",
      } as any);
    }

    const apiRes = await agentPropertyApprovedRejected({
      formData,
      userId: user?.id ?? "",
    });

    if (apiRes.status) {
      setAction(null);
      setReason("");
      setImage(null);
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

      {/* Action Buttons */}
      <View className="flex-row items-center gap-4 mb-4">
        <TouchableOpacity
          onPress={() => {
            setAction("Approved");
            setReason("");
          }}
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
            Approve
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            setAction("Rejected");
            setImage(null);
          }}
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

      {/* Conditional UI */}
      {action === "Rejected" && (
        <View className="mb-4">
          <AuthInput
            label="Reason for Rejection"
            value={reason}
            onChangeText={setReason}
            placeholder="Write the reason here..."
            multiline
            error={!reason.trim() ? "Reason is required" : ""}
          />
        </View>
      )}

      {action === "Approved" && (
        <View className="mb-4">
          <View className="flex-row gap-3 mt-3">
            <TouchableOpacity
              onPress={pickImageFromGallery}
              className="flex-1 border border-dashed border-gray-400 rounded-xl p-3 items-center"
            >
              <Ionicons name="images-outline" size={20} color="#932537" />
              <Text className="text-gray-700 mt-1 text-sm">From Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={takePhotoFromCamera}
              className="flex-1 border border-dashed border-gray-400 rounded-xl p-3 items-center"
            >
              <Ionicons name="camera-outline" size={20} color="#932537" />
              <Text className="text-gray-700 mt-1 text-sm">Take Photo</Text>
            </TouchableOpacity>
          </View>

          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: 180,
                borderRadius: 12,
                marginTop: 12,
              }}
            />
          )}
        </View>
      )}

      {/* Submit Button */}
      {action && (
        <AuthButton
          title={loading ? "Processing..." : "Submit"}
          onPress={handleSubmit}
          disabled={
            (action === "Rejected" && !reason.trim()) ||
            (action === "Approved" && !image)
          }
          isLoading={loading}
        />
      )}
    </View>
  );
};

export default AgentAction;
