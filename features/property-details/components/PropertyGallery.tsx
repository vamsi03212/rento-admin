import { LatestPropertyImage } from "@/features/owner/types/property.type";
import { getImageUrl } from "@/lib/imageUrl";
import { FlatList, Image, Text, View } from "react-native";

type PropertyGalleryProps = {
  propertyImages: LatestPropertyImage[];
};

const PropertyGallery = ({ propertyImages }: PropertyGalleryProps) => {
  return (
    <View className="w-full">
      <Text
        style={{ fontFamily: "poppins-semi-bold" }}
        className="text-black-300 text-lg"
      >
        Gallery
      </Text>
      <FlatList
        data={propertyImages}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={getImageUrl(item.image)}
            className="size-28 rounded-xl"
          />
        )}
        contentContainerStyle={{ paddingRight: 20, gap: 16, marginTop: 12 }}
      />
    </View>
  );
};

export default PropertyGallery;
