import { getImageUrl } from "@/lib/imageUrl";
import { MapPin, Wallet } from "lucide-react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AgentProofOfVisit } from "../types/agent-proof-of-visit.types";

const AgentProofOfvisit = ({ item }: { item: AgentProofOfVisit }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm flex-row overflow-hidden"
    >
      <View className="p-2">
        <Image
          source={getImageUrl(item.image)}
          className="w-28 h-28 rounded-2xl"
          resizeMode="cover"
        />
      </View>

      <View className="flex-1 p-3 justify-center">
        <Text
          style={{ fontFamily: "poppins-semi-bold" }}
          numberOfLines={1}
          className="text-base font-semibold text-gray-900 mb-1"
        >
          {item.Property?.projectName ?? "Unnamed Project"}
        </Text>
        <View className=" flex flex-row items-center gap-1">
          <MapPin size={12} />
          <Text
            style={{ fontFamily: "poppins-medium" }}
            className="text-sm text-gray-600 flex flex-row items-center"
          >
            {item.Property?.location ?? "Unknown Location"}
          </Text>
        </View>
        <View className=" flex flex-row items-center gap-1">
          <Wallet size={12} />
          <Text
            style={{ fontFamily: "poppins-medium" }}
            className="text-sm text-gray-600 mt-1"
          >
            ₹{item.Property?.rentAmount} / Monthly
          </Text>
        </View>

        <Text className="text-xs text-gray-400 mt-2">
          Visited on:
          {new Date(item.date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AgentProofOfvisit;
