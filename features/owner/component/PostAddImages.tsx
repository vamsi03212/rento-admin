import React, { FC, useCallback } from "react";
import { Text, View } from "react-native";
import ImagePickerGrid from "./ImagePickerGrid"; // your existing grid component

interface UploadImagesScreenProps {
  form: {
    images: string[];
    [key: string]: any;
  };
  setForm: React.Dispatch<React.SetStateAction<any>>;
  errors: Record<string, string>;
}

const UploadImagesScreen: FC<UploadImagesScreenProps> = ({
  form,
  setForm,
  errors,
}) => {
  const handleImagesChange = useCallback(
    (imgs: string[]) => {
      setForm((prev: any) => ({ ...prev, images: imgs || [] }));
    },
    [setForm]
  );

  return (
    <View className="flex-col gap-4 mt-5">
      <Text className="text-lg" style={{ fontFamily: "poppins-medium" }}>
        Upload Images
      </Text>

      <ImagePickerGrid
        images={form.images || []}
        onChange={handleImagesChange}
        maxImages={6}
      />

      {errors?.images && (
        <Text className="text-red-500 mt-1 text-sm">{errors.images}</Text>
      )}
    </View>
  );
};

export default UploadImagesScreen;
