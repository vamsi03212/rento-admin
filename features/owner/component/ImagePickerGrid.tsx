import * as ImagePicker from "expo-image-picker";
import { Camera, Plus, Trash2 } from "lucide-react-native";
import React from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

interface ImagePickerGridProps {
  images: string[];
  onChange: (newImages: string[]) => void;
  maxImages?: number;
}

const ImagePickerGrid: React.FC<ImagePickerGridProps> = ({
  images,
  onChange,
  maxImages = 6,
}) => {
  const { width } = Dimensions.get("window");
  const numColumns = 2;
  const itemSize = (width - 60) / numColumns - 29;

  const requestMediaPermission = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Please allow photo access to select images."
      );
      return false;
    }
    return true;
  };

  const requestCameraPermission = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Camera permission is needed to take pictures."
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const granted = await requestMediaPermission();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      allowsMultipleSelection: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });

    if (!result.canceled) {
      const selected = result.assets.map((a) => a.uri);
      onChange([...images, ...selected].slice(0, maxImages));
    }
  };

  const takePhoto = async () => {
    const granted = await requestCameraPermission();
    if (!granted) return;

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      onChange([...images, result?.assets?.[0].uri].slice(0, maxImages));
    }
  };

  const removeImage = (uri: string) => {
    onChange(images.filter((img) => img !== uri));
  };

  const renderImageItem = (uri: string) => (
    <View
      style={[styles.itemBox, { width: itemSize, height: itemSize }]}
      className="rounded-xl bg-gray-50 overflow-hidden"
    >
      <Image
        source={{ uri }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
      <Pressable
        onPress={() => removeImage(uri)}
        className="absolute top-1 right-1 bg-black/60 p-1 rounded-full"
      >
        <Trash2 size={16} color="white" />
      </Pressable>
    </View>
  );

  const renderAddButtons = () => (
    <View style={styles.addButtonsContainer}>
      <Pressable
        onPress={pickImage}
        style={[styles.addBtn, { width: itemSize, height: itemSize }]}
      >
        <Plus size={32} color="#932537" />
      </Pressable>
      <Pressable
        onPress={takePhoto}
        style={[styles.addBtn, { width: itemSize, height: itemSize }]}
      >
        <Camera size={30} color="#932537" />
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        numColumns={numColumns}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => renderImageItem(item)}
        ListFooterComponent={
          images.length < maxImages ? renderAddButtons() : null
        }
        contentContainerStyle={{ paddingVertical: 4 }}
        scrollEnabled={false} // ✅ disable internal scroll
        nestedScrollEnabled={true}
      />
    </View>
  );
};

export default ImagePickerGrid;

const styles = StyleSheet.create({
  container: {
    // marginTop: 8,
  },
  itemBox: {
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
  },
  addButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginLeft: 4,
  },
  addBtn: {
    margin: 8,
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
