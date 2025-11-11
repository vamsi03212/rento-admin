import { EnquiryProperty } from "@/features/owner/types/enquiry.types";
import { PropertyType } from "@/features/owner/types/property.type";
import { getImageUrl } from "@/lib/imageUrl";
import { format } from "date-fns";
import {
  Bath,
  BedDouble,
  CalendarDays,
  MapPin,
  Square,
} from "lucide-react-native";
import { Image, Pressable, Text, View } from "react-native";

interface HorizantalCardTypes<T extends PropertyType | EnquiryProperty> {
  property: T;
  isDisFillDetailsBtn?: boolean;
  isFillBtnText?: string;
  onPress?: (item: T) => void;
  onFillDetailsPress?: (item: T) => void;
}

const HorizantalCard = <T extends PropertyType | EnquiryProperty>({
  property,
  isDisFillDetailsBtn = false,
  onPress = () => {},
  onFillDetailsPress = () => {},
  isFillBtnText = "Fill Details",
}: HorizantalCardTypes<T>) => {
  const prop =
    (property as EnquiryProperty).Property ?? (property as PropertyType);

  const date =
    (property as EnquiryProperty).date ?? (property as any).createdAt ?? "";

  const statusColors: Record<string, { bg: string; text: string }> = {
    Approved: { bg: "bg-green-100", text: "text-green-700" },
    Rejected: { bg: "bg-red-100", text: "text-red-700" },
    Assigned: { bg: "bg-blue-100", text: "text-blue-700" },
    "In Progress": { bg: "bg-yellow-100", text: "text-yellow-800" },
    Pending: { bg: "bg-gray-100", text: "text-gray-700" },
  };

  const currentStatus = prop?.propertyStatus || "Pending";
  const colorSet = statusColors[currentStatus] || statusColors.Pending;

  return (
    <Pressable
      onPress={() => onPress(property)}
      android_ripple={{ color: "#f3f4f6" }}
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-3 flex-row mb-3"
    >
      <View className="relative">
        <Image
          source={getImageUrl(prop?.images?.[0]?.image)}
          className="w-32 h-32 rounded-xl mr-3"
        />

        <View
          className={`absolute top-2 left-2 px-2 py-1 rounded-full ${colorSet.bg}`}
        >
          <Text
            className={`text-xs ${colorSet.text}`}
            style={{ fontFamily: "poppins-medium" }}
          >
            {currentStatus}
          </Text>
        </View>
      </View>
      <View className="flex-1 justify-between">
        <View>
          <Text
            className="text-base text-black"
            style={{ fontFamily: "poppins-semi-bold" }}
            numberOfLines={1}
          >
            {prop?.projectName}
          </Text>

          <View className="flex-row items-center mt-1">
            <MapPin size={14} color="#2563EB" />
            <Text
              className="text-gray-600 ml-1 text-xs mr-2"
              style={{ fontFamily: "poppins-regular" }}
              numberOfLines={1}
            >
              {prop?.area} - {prop?.location}
            </Text>
          </View>
        </View>

        {/* DETAILS */}
        <View className="flex-row justify-between mt-2 pr-2">
          {[
            { icon: BedDouble, label: prop?.bedrooms ?? 0 },
            { icon: Bath, label: prop?.bathrooms ?? 0 },
            { icon: Square, label: prop?.propertyLength },
          ].map(({ icon: Icon, label }, index) => (
            <View key={index} className="flex flex-row items-center gap-1">
              <View className="w-8 h-8 bg-[#faf5f0] rounded-full flex items-center justify-center">
                <Icon size={14} color="#932537" />
              </View>
              <Text
                className="text-sm"
                style={{ fontFamily: "poppins-medium" }}
              >
                {label}
              </Text>
            </View>
          ))}
        </View>

        <View className="flex-row justify-between items-center mt-2">
          <Text
            className="text-[#932537] text-base"
            style={{ fontFamily: "poppins-semi-bold" }}
          >
            ₹ {prop?.rentAmount?.split(".")?.[0]}
          </Text>

          {date ? (
            <View className="flex-row items-center">
              <CalendarDays size={14} color="#6B7280" />
              <Text
                className="ml-1 text-xs text-gray-500"
                style={{ fontFamily: "poppins-regular" }}
              >
                {format(new Date(date), "dd MMM yyyy")}
              </Text>
            </View>
          ) : null}
        </View>

        {isDisFillDetailsBtn && (
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              if (!("isSubmitted" in property) || !property.isSubmitted) {
                onFillDetailsPress(property);
              }
            }}
            disabled={"isSubmitted" in property && property.isSubmitted}
            style={{
              backgroundColor:
                "isSubmitted" in property && property.isSubmitted
                  ? "#d1d5db" // grey if submitted
                  : "#932537", // maroon if active
            }}
            className="mt-2 py-2 rounded-full"
            android_ripple={{ color: "#ffffff20" }}
          >
            <Text
              className="text-white text-center text-xs"
              style={{ fontFamily: "poppins-medium" }}
            >
              {"isSubmitted" in property && property.isSubmitted
                ? "Already Submitted"
                : isFillBtnText}
            </Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default HorizantalCard;
