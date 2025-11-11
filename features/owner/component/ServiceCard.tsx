// import { ServiceType } from "@/features/owner/types/service.types";
import { shadowStyles } from "@/common/styles/shadow-styles";
import {
  Fan,
  Hammer,
  Paintbrush,
  Sparkles,
  WashingMachine,
  Wrench,
  Zap,
} from "lucide-react-native";
import { FC } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useServiceTextCardHook } from "../hooks/service-text-card.hook";
import ServiceBookingModal from "../modals/ServiceBookingModal";
import { ServiceType } from "../types/service-provided.types";
// import { useServiceTextCardHook } from "../hooks/service-text-card.hook";
// import BookServiceModal from "../modals/BookServiceModal";

export const getServiceIcon = (name: string, size: number) => {
  switch (name?.toLowerCase()) {
    case "plumber":
      return <Wrench color="#2563EB" size={size} />; // bigger icons
    case "electric work":
      return <Zap color="#EAB308" size={size} />;
    case "cleaning":
      return <Sparkles color="#10B981" size={size} />;
    case "painting":
      return <Paintbrush color="#EC4899" size={size} />;
    case "interior":
      return <Hammer color="#6B7280" size={size} />;
    case "ac repair":
      return <Fan color="#9333EA" size={size} />;
    case "washing machine":
      return <WashingMachine color="#0EA5E9" size={size} />;
    default:
      return <Sparkles color="red" size={size} />;
  }
};

type ServiceTextCardType = {
  service: ServiceType[];
};

const ServiceTextCard: FC<ServiceTextCardType> = ({ service }) => {
  const {
    displayBottom,
    setDisplayBottom,
    handelSelectService,
    serviceType,
    price,
  } = useServiceTextCardHook();

  return (
    <>
      <View className="flex-row flex-wrap justify-between mb-8">
        {service?.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => handelSelectService(item)}
            style={[styles.card, shadowStyles.shadow]}
            android_ripple={{ color: "#E5E7EB" }}
          >
            <View style={styles.iconContainer}>
              {getServiceIcon(item.service_name, 36)}
            </View>

            <Text style={styles.title}>
              {item.service_name === "Electric work"
                ? item.service_name?.split(" ")?.[0]
                : item.service_name}
            </Text>

            <Text style={styles.subtitle}>Tap to book now</Text>
          </Pressable>
        ))}
      </View>
      <ServiceBookingModal
        open={displayBottom}
        onClose={() => setDisplayBottom(false)}
        serviceType={serviceType}
        price={price}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    paddingVertical: 25,
    paddingHorizontal: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "48%",
    marginBottom: 15,
  },
  iconContainer: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  title: {
    fontFamily: "poppins-semi-bold",
    fontSize: 16,
    color: "#111827",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "poppins-regular",
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
});

export default ServiceTextCard;
