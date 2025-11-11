import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { IMAGE_URL } from "@/lib/url";
import { useState } from "react";
import { Share } from "react-native";

export interface CheckWishlistResp {
  inWishlist: boolean;
}

export const usePropertyHeaderDetailsHook = ({
  propertyId,
}: {
  propertyId: number | null;
}) => {
  const user = useAuthStore((state) => state.user);
  // const { wishlistIds, addWishlistId, removeWishlistId } = useWishlistStore();

  const [loading, setLoading] = useState(false);

  // const handleAddFav = async () => {
  //   if (!user) {
  //     Toast.show({
  //       type: "error",
  //       text1: "Please log in to add properties to your wishlist 🔐",
  //       position: "bottom",
  //       visibilityTime: 2000,
  //     });
  //     return;
  //   }

  //   if (!propertyId) return;

  //   if (loading) return;
  //   setLoading(true);

  //   const apiData = await addWishlistApi({ propertyId, userId: user?.id ?? 0 });
  //   setLoading(false);

  //   if (!apiData?.status || !apiData?.data) {
  //     return;
  //   }

  //   const isWishlist = apiData.data.data.isWishlist;

  //   if (isWishlist) addWishlistId(propertyId);
  //   else removeWishlistId(propertyId);

  //   Toast.show({
  //     type: "info",
  //     text1: isWishlist ? "Added to Wishlist ❤️" : "Removed from Wishlist 💔",
  //     position: "bottom",
  //     visibilityTime: 2000,
  //   });
  // };

  const handleShare = async () => {
    try {
      if (!propertyId) return;

      const shareUrl = `${IMAGE_URL}/detailsrental?id=${propertyId}`;
      const message = `Check out this property on DreamHomes 🏡\n\n${shareUrl}`;

      await Share.share({
        message,
        url: shareUrl,
        title: "Share Property",
      });
    } catch (error) {
      console.error("Error sharing property:", error);
    }
  };

  // const isWishlisted = useMemo(() => {
  //   if (propertyId) {
  //     return wishlistIds.includes(propertyId);
  //   }
  //   return false;
  // }, [wishlistIds, propertyId]);

  return {
    // handleAddFav,
    handleShare,
    // isWishlisted,
    loading,
  };
};
