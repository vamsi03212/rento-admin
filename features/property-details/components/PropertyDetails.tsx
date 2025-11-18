import icons from "@/constant/icons";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { PropertyType } from "@/features/owner/types/property.type";
import { useRouter } from "expo-router";
import { SquarePen, Trash2 } from "lucide-react-native";
import { FC, useState } from "react";
import { Image, Text, View } from "react-native";
import DeletePropertyModal from "../modals/DeleteProperty.modal";

interface PropertyDetailsProps {
  property: PropertyType | null;
}

const PropertyDetails: FC<PropertyDetailsProps> = ({ property }) => {
  const router = useRouter();
  const role = useAuthStore((state) => state.user?.role);
  const infoItems = [
    { icon: icons.bed, label: "Beds", value: property?.bedrooms ?? 0 },
    { icon: icons.bath, label: "Baths", value: property?.bathrooms ?? 0 },
    { icon: icons.area, label: "sqft", value: property?.propertyLength ?? 0 },
  ];

  const [deleteProperty, setDeleteProperty] = useState(false);
  const handleEdit = () => {
    router.push({
      pathname: "/(root)/(drawer)/addpost",
      params: { property: JSON.stringify(property) },
    });
  };

  return (
    <>
      <View className="gap-4">
        <Text
          style={{ fontFamily: "poppins-bold" }}
          className="text-xl mt-5 text-black"
        >
          {property?.projectName ?? "Property Name"}
        </Text>
        <View className="flex flex-row justify-between items-center w-full">
          <View className="flex flex-row items-center gap-3">
            <View
              style={{ backgroundColor: "#faf5f0" }}
              className="px-4 py-2 rounded-full"
            >
              <Text
                style={{ fontFamily: "poppins-bold" }}
                className="text-xs text-primary-100"
              >
                {property?.propertyType ?? "N/A"}
              </Text>
            </View>

            <View className="flex flex-row items-center gap-2">
              <Text
                style={{ fontFamily: "poppins-medium" }}
                numberOfLines={1}
                className="text-primary-100 text-start text-xl "
              >
                ₹ {property?.rentAmount?.split(".")?.[0] ?? 0}
              </Text>
            </View>
          </View>
          {role === "owner" && (
            <View className="flex flex-row gap-3 items-center">
              <SquarePen onPress={handleEdit} size={20} color={"#932537"} />
              <Trash2
                onPress={() => setDeleteProperty(true)}
                size={20}
                color={"#932537"}
              />
            </View>
          )}
        </View>

        <View className="flex flex-row flex-wrap justify-between">
          {infoItems.map((item, index) => (
            <View key={index} className="w-[30%]">
              <InfoItem {...item} />
            </View>
          ))}
        </View>
      </View>
      <DeletePropertyModal
        onClose={() => setDeleteProperty(false)}
        open={deleteProperty}
        propertyId={property?.id ?? 0}
      />
    </>
  );
};

export default PropertyDetails;

interface InfoItemProps {
  icon: any;
  label: string;
  value: string | number;
  unit?: string;
}

export const InfoItem: FC<InfoItemProps> = ({ icon, label, value, unit }) => (
  <View className="flex flex-row items-center gap-2">
    <View
      style={{ backgroundColor: "#faf5f0" }}
      className="w-10 h-10 rounded-full flex items-center justify-center"
    >
      <Image
        source={icon}
        style={{
          tintColor: "#932537",
          width: 20,
          height: 20,
          resizeMode: "contain",
        }}
      />
    </View>
    <Text
      style={{ fontFamily: "poppins-medium" }}
      className="text-black-300 text-sm"
    >
      {value} {unit ?? label}
    </Text>
  </View>
);
