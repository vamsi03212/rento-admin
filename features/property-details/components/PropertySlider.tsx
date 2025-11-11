import icons from "@/constant/icons";
import images from "@/constant/images";
import { PropertyType } from "@/features/owner/types/property.type";
import { getImageUrl } from "@/lib/imageUrl";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { usePropertyHeaderDetailsHook } from "../hooks/property-header-slider.hook";

const PropertySlider = ({
  propertyId,
  property,
}: {
  propertyId: number | null;
  property: PropertyType | null;
}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const imagesList =
    property?.images?.length && property.images.length > 0
      ? property.images.map((img) => getImageUrl(img.image))
      : [images.feature1, images.feature2, images.feature1];

  const [activeIndex, setActiveIndex] = useState(0);

  const { handleShare } = usePropertyHeaderDetailsHook({
    propertyId,
  });

  return (
    <View
      className="relative w-full"
      style={{ height: windowHeight / 1.8, backgroundColor: "#f3f3f3" }}
    >
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const index = Math.round(e.nativeEvent.contentOffset.x / windowWidth);
          setActiveIndex(index);
        }}
        scrollEventThrottle={16}
      >
        {imagesList.map((imgSrc, index) => (
          <Image
            key={index}
            source={imgSrc}
            style={{ width: windowWidth, height: windowHeight / 1.8 }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <Image
        source={images.whiteGradient}
        className="absolute top-0 w-full h-full z-40"
        resizeMode="cover"
      />

      {/* Pagination Dots */}
      <View className="absolute bottom-4 w-full flex-row justify-center items-center gap-2 z-50">
        {imagesList.map((_, index) => (
          <View
            key={index}
            className={`${
              index === activeIndex
                ? "bg-primary-100 w-5 h-2 rounded-full"
                : "w-2 h-2 rounded-full bg-white"
            }`}
          />
        ))}
      </View>

      {/* Top Header Icons */}
      <View
        className="z-50 absolute px-4 w-full flex-row justify-between items-center"
        style={{ top: Platform.OS === "ios" ? 70 : 40 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex items-center justify-center w-10 h-10 bg-primary-200 rounded-full"
        >
          <ChevronLeft size={20} />
        </TouchableOpacity>

        <View className="flex flex-row items-center gap-3 pr-2">
          {/* {loading ? (
            <ActivityIndicator size="small" color="#932537" />
          ) : (
            <Pressable onPress={handleAddFav}>
              {isWishlisted ? (
                <Image
                  source={images.like}
                  tintColor="#932537"
                  className="w-6 h-6"
                />
              ) : (
                <Image
                  source={icons.heart}
                  className="w-6 h-6"
                  tintColor="#191D31"
                />
              )}
            </Pressable>
          )} */}

          <Pressable onPress={handleShare}>
            <Image source={icons.send} className="w-6 h-6" />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default PropertySlider;
