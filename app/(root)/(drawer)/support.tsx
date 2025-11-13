import DataWrapper from "@/common/components/DataWrapper";
import { getSupportDataApi } from "@/features/support/services/get-support.service";
import { HelpCircle, Mail, MessageCircle, Phone } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";

export interface SupportData {
  id: number;
  supportEmail: string;
  supportContact: string;
  officeAddress: string;
  createdAt: string;
  updatedAt: string;
}

const Support = () => {
  const [supportDetails, setSupportDetails] = useState<SupportData | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSupportData = async () => {
    setLoading(true);
    const apiRes = await getSupportDataApi();
    if (apiRes.status) {
      setSupportDetails(apiRes?.data ?? null);
    } else {
      setError(apiRes?.error ?? "null");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSupportData();
  }, []);

  return (
    <DataWrapper loading={loading} error={error}>
      <ScrollView className="flex-1 bg-white p-4">
        {/* HEADER */}
        <View className="mb-4">
          <Text
            className="text-xl text-gray-900"
            style={{ fontFamily: "poppins-semi-bold" }}
          >
            Support Center
          </Text>
          <Text
            className="text-xs text-gray-500"
            style={{ fontFamily: "poppins-regular" }}
          >
            We’re here to help you anytime
          </Text>
        </View>

        {/* QUICK ACTIONS */}
        <View className="flex-row justify-between mb-4">
          <Pressable className="w-[48%] bg-primary-100/10 p-4 rounded-xl flex-row items-center gap-3">
            <HelpCircle color="#932537" />
            <Text style={{ fontFamily: "poppins-medium" }}>FAQs</Text>
          </Pressable>

          <Pressable className="w-[48%] bg-blue-500/10 p-4 rounded-xl flex-row items-center gap-3">
            <MessageCircle color="#2563EB" />
            <Text style={{ fontFamily: "poppins-medium" }}>Live Chat</Text>
          </Pressable>
        </View>

        <View className="flex-row justify-between mb-4">
          <Pressable
            onPress={() => {
              if (supportDetails?.supportContact) {
                Linking.openURL(`tel:${supportDetails.supportContact}`);
              }
            }}
            className="w-[48%] bg-green-500/10 p-4 rounded-xl flex-row items-center gap-3"
          >
            <Phone color="#16A34A" />
            <Text style={{ fontFamily: "poppins-medium" }}>Call Support</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              if (supportDetails?.supportEmail) {
                Linking.openURL(`mailto:${supportDetails.supportEmail}`);
              }
            }}
            className="w-[48%] bg-red-500/10 p-4 rounded-xl flex-row items-center gap-3"
          >
            <Mail color="#DC2626" />
            <Text style={{ fontFamily: "poppins-medium" }}>Email Support</Text>
          </Pressable>
        </View>

        {supportDetails && (
          <View className="mt-6">
            <Text
              className="text-sm text-gray-500 mb-2"
              style={{ fontFamily: "poppins-medium" }}
            >
              Contact Details
            </Text>

            <View className="bg-gray-50 p-3 rounded-lg mb-2">
              <Text style={{ fontFamily: "poppins-regular" }}>Email:</Text>
              <Text
                className="text-primary-100"
                style={{ fontFamily: "poppins-medium" }}
              >
                {supportDetails.supportEmail || "N/A"}
              </Text>
            </View>

            <View className="bg-gray-50 p-3 rounded-lg mb-2">
              <Text style={{ fontFamily: "poppins-regular" }}>Phone:</Text>
              <Text
                className="text-primary-100"
                style={{ fontFamily: "poppins-medium" }}
              >
                {supportDetails.supportContact || "N/A"}
              </Text>
            </View>

            <View className="bg-gray-50 p-3 rounded-lg">
              <Text style={{ fontFamily: "poppins-regular" }}>Address:</Text>
              <Text
                className="text-primary-100"
                style={{ fontFamily: "poppins-medium" }}
              >
                {supportDetails.officeAddress || "N/A"}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </DataWrapper>
  );
};

export default Support;
