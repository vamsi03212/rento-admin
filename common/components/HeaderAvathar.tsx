import { useLocationHook } from "@/lib/location.hook";
// import { useAuthStore } from "@/stores/useAuthStore";
import { ChevronDown, MapPin } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";

const HeaderAvathar = () => {
  const user = { first_name: "Buyer" };

  const { fullAddress } = useLocationHook();
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    const getGreeting = () => {
      const now = new Date();
      const indiaHour = (now.getUTCHours() + 5.5) % 24;

      if (indiaHour >= 5 && indiaHour < 12) return "Good Morning";
      if (indiaHour >= 12 && indiaHour < 17) return "Good Afternoon";
      if (indiaHour >= 17 && indiaHour < 21) return "Good Evening";
      return "Good Night";
    };

    setGreeting(getGreeting());

    const interval = setInterval(() => setGreeting(getGreeting()), 1800000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-row items-center justify-between">
      {/* Left - Name & Greeting */}
      <View className="flex-1 max-w-[40%] flex-row">
        <View className="flex-col justify-center -mb-1">
          <Text className="text-[10px] font-poppins-regular text-black-100">
            {greeting}
          </Text>
          <Text className="text-[14px] font-poppins-medium text-black-300 -mt-1">
            {user?.first_name ?? "Have Nice Day"}
          </Text>
        </View>
      </View>

      {/* Right - Location */}
      {fullAddress && (
        <Pressable className="flex-1 flex-row items-center gap-1 min-w-[(auto]">
          <MapPin size={18} color="#666876" />
          <Text
            className="text-sm flex-1 text-black-200"
            style={{ fontFamily: "poppins-regular" }}
            numberOfLines={1}
          >
            {fullAddress}
          </Text>
          <ChevronDown size={18} color="#191D31" />
        </Pressable>
      )}
    </View>
  );
};

export default HeaderAvathar;
