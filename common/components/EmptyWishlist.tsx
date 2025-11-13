import images from "@/constant/images";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

interface EmptyCardTypes {
  txt: string;
  isDisBtn?: boolean;
}

const EmptyWishlistComponent = ({ txt, isDisBtn = true }: EmptyCardTypes) => {
  return (
    <View className="flex-1 justify-center items-center gap-3">
      <Image
        source={images.wishlistempty}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
      <Text
        style={{ fontFamily: "poppins-medium" }}
        className="text-3xl text-center text-black-200"
      >
        {txt}
      </Text>
      {isDisBtn && (
        <Pressable
          // onPress={() => router.push("/explore/explore")}
          className="w-[200px] mt-3 h-[45px] bg-primary-100 rounded-full flex justify-center items-center"
        >
          <Text className="text-white" style={{ fontFamily: "poppins-medium" }}>
            Continue to Explore
          </Text>
        </Pressable>
      )}
    </View>
  );
};

EmptyWishlistComponent.displayName = "EmptyWishlist";

export default React.memo(
  EmptyWishlistComponent,
  (prevProps, nextProps) =>
    prevProps.txt === nextProps.txt && prevProps.isDisBtn === nextProps.isDisBtn
);
