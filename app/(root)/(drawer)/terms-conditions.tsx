import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TermsAndConditions() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        <Text
          className="text-gray-800 text-base leading-6 mb-6"
          // style={{ fontFamily: "poppins-regular" }}
        >
          Welcome to our mobile application. By accessing or using our app, you
          agree to comply with and be bound by these Terms and Conditions.
          Please read them carefully.
        </Text>

        <Section
          title="1. Acceptance of Terms"
          text="By using our app, you confirm that you accept these terms and agree to comply with them. If you do not agree, please do not use our services."
        />

        <Section
          title="2. User Responsibilities"
          text="You agree to use the app only for lawful purposes. You are responsible for maintaining the confidentiality of your account details and all activities that occur under your account."
        />

        <Section
          title="3. Intellectual Property"
          text="All content, features, and functionality in this app are owned by us or our licensors and are protected by intellectual property laws."
        />

        <Section
          title="4. Limitation of Liability"
          text="We are not liable for any indirect, incidental, or consequential damages arising out of your use or inability to use the app."
        />

        <Section
          title="5. Updates to Terms"
          text="We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting within the app."
        />

        {/* ❤️ Footer Note (kept from your design) */}
        <View className="bg-gray-100 rounded-xl p-4 mt-6 mb-10 shadow-sm border border-gray-100">
          <Text className="text-gray-600 text-center text-sm leading-6">
            By continuing to use this application, you acknowledge that you have
            read, understood, and agreed to these Terms and Conditions.
          </Text>
        </View>

        <Text className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} RentEasy Pvt. Ltd. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/* 🔹 Reusable Section Component (same as Privacy Policy) */
function Section({
  title,
  text,
}: {
  title: string;
  text: string | React.ReactNode;
}) {
  return (
    <View className="mb-6">
      <Text
        className="text-lg font-semibold text-[#932537] mb-2"
        style={{ fontFamily: "poppins-semi-bold" }}
      >
        {title}
      </Text>
      <Text
        style={{ fontFamily: "poppins-medium" }}
        className="text-base text-gray-700 leading-6"
      >
        {text}
      </Text>
    </View>
  );
}
