import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrivacyPolicyScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}
      >
        <Section
          title="1. Introduction"
          text="We value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our mobile application and related services."
        />

        <Section
          title="2. Information We Collect"
          text="We may collect personal details such as your name, email address, phone number, and location when you register or use our services. We also gather non-personal data like device information and app usage statistics to improve performance."
        />

        <Section
          title="3. How We Use Your Information"
          text="Your information helps us provide better services, improve user experience, send notifications, and communicate important updates. We never sell your data to third parties."
        />

        <Section
          title="4. Data Security"
          text="We implement appropriate security measures to protect your data against unauthorized access, alteration, or disclosure. However, no method of transmission over the Internet is 100% secure."
        />

        <Section
          title="5. Sharing Your Information"
          text="We may share information only with trusted partners who assist us in operating our services, provided they agree to keep it confidential."
        />

        <Section
          title="6. Your Rights"
          text="You can access, update, or delete your personal information anytime by contacting our support team. You may also opt out of promotional communications."
        />

        <Section
          title="7. Changes to This Policy"
          text="We may update our Privacy Policy periodically. Updates will be reflected here, and we encourage you to review it regularly."
        />

        <Section
          title="8. Contact Us"
          text={
            <>
              For any questions or concerns about our Privacy Policy, please
              reach out at
              <Text className="text-[#932537] underline">
                privacy@renteasyapp.com
              </Text>
              .
            </>
          }
        />

        <Text className="text-center text-sm text-gray-500 mt-6">
          © {new Date().getFullYear()} RentEasy Pvt. Ltd. All rights reserved.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

/* 🔹 Reusable Section Component */
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
