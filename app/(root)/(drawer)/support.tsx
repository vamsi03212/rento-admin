import { HelpCircle, Mail, MessageCircle, Phone } from "lucide-react-native";
import { Pressable, ScrollView, Text, View } from "react-native";

const Support = () => {
  return (
    <ScrollView className="flex-1 bg-white p-4">
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
        <Pressable className="w-[48%] bg-green-500/10 p-4 rounded-xl flex-row items-center gap-3">
          <Phone color="#16A34A" />
          <Text style={{ fontFamily: "poppins-medium" }}>Call Support</Text>
        </Pressable>

        <Pressable className="w-[48%] bg-red-500/10 px-3 p-4 rounded-xl flex-row items-center gap-1">
          <Mail color="#DC2626" />
          <Text style={{ fontFamily: "poppins-medium" }}>Email Support</Text>
        </Pressable>
      </View>

      {/* <View className="bg-white p-4 rounded-xl shadow-xs border border-gray-100 mt-3">
        <Text
          className="text-base text-gray-800 mb-2"
          style={{ fontFamily: "poppins-semi-bold" }}
        >
          Having Trouble?
        </Text>
        <Text
          className="text-xs text-gray-500 mb-3"
          style={{ fontFamily: "poppins-regular" }}
        >
          Tell us about your issue and our team will contact you within 24
          hours.
        </Text>

        <Pressable
          onPress={() => router.push("/AboutScreen")}
          className="bg-primary-100 py-2 rounded-lg mt-2"
        >
          <Text
            className="text-center text-white"
            style={{ fontFamily: "poppins-medium" }}
          >
            Create Ticket
          </Text>
        </Pressable>
      </View> */}

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
            help@serviceapp.com
          </Text>
        </View>

        <View className="bg-gray-50 p-3 rounded-lg">
          <Text style={{ fontFamily: "poppins-regular" }}>Phone:</Text>
          <Text
            className="text-primary-100"
            style={{ fontFamily: "poppins-medium" }}
          >
            +91 98765 43210
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Support;
