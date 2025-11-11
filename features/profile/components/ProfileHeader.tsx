import { NEXT_PUBLIC_ADMIN_URL } from "@/lib/url";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "expo-router";
import { ArrowLeft, Camera } from "lucide-react-native";
import { FC, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FormFields } from "../types/profile.types";

interface ProfileHeaderType {
  form: FormFields;
  handleChange?: (key: keyof FormFields, value: string) => void;
  isEditing?: boolean;
}

const ProfileHeader: FC<ProfileHeaderType> = ({
  form,
  handleChange,
  isEditing = false,
}) => {
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");
  const HEADER_HEIGHT = height * 0.28;

  const [imageUri, setImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (form.upload_document) {
      if (form.upload_document.startsWith("file://")) {
        setImageUri(form.upload_document);
      } else {
        setImageUri(`${NEXT_PUBLIC_ADMIN_URL}${form.upload_document}`);
      }
    } else {
      setImageUri(null);
    }
  }, [form.upload_document]);

  const pickImage = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission required", "Please allow access to photos.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        handleChange?.("upload_document", uri);
      }
    } catch (err) {
      console.log("Image pick error:", err);
      Alert.alert("Error", "Something went wrong while picking the image.");
    }
  };

  const displayImage = imageUri || "https://www.gravatar.com/avatar/?d=mp";

  return (
    <LinearGradient
      colors={["#932537", "#6b1c29"]}
      className="rounded-b-3xl items-center justify-end pb-8 relative"
      style={{ height: HEADER_HEIGHT, paddingVertical: 30 }}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="absolute top-12 left-5 bg-white/20 p-2 rounded-full"
      >
        <ArrowLeft color="white" size={22} />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={isEditing ? pickImage : undefined}
        className="relative"
      >
        <View className="w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
          <Image
            source={{ uri: displayImage }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {isEditing && (
          <View className="absolute bottom-1 right-1 bg-[#932537] p-2 rounded-full">
            <Camera size={16} color="white" />
          </View>
        )}
      </TouchableOpacity>

      {/* 🧑‍💼 User Info */}
      <Text className="text-white text-lg font-semibold mt-2">
        {form.first_name} {form.last_name}
      </Text>
      <Text className="text-pink-100 text-sm">{form.role?.toUpperCase()}</Text>
    </LinearGradient>
  );
};

export default ProfileHeader;
