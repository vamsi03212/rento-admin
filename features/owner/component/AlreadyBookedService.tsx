import { Clock, CreditCard, XCircle } from "lucide-react-native";
import { FC } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useExistingServiceCancelHook } from "../hooks/existing-service-cancel.hook";
import CancelServiceModal from "../modals/CancelServiceModal";
import {
  ExistingServiceType,
  ServiceStatus,
} from "../types/service-provided.types";
import { getServiceIcon } from "./ServiceCard";

const statusColor = (status: ServiceStatus) => {
  switch (status) {
    case ServiceStatus.IN_PROGRESS:
      return "bg-yellow-100 text-yellow-600";
    case ServiceStatus.ASSIGNED:
      return "bg-blue-100 text-blue-600";
    case ServiceStatus.COMPLETE:
      return "bg-green-100 text-green-600";
    case ServiceStatus.CANCELLED:
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

interface AlreadyBookedServiceType {
  service: ExistingServiceType;
  refetch: () => void;
}

const AlreadyBookedServiceCom: FC<AlreadyBookedServiceType> = ({
  service,
  refetch,
}) => {
  const {
    isDisplayDeleteModal,
    setIsDisplayDeleteModal,
    handleCancelSeervice,
    loading,
  } = useExistingServiceCancelHook({ service, refetch });
  return (
    <>
      <View className="mb-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <View className="flex-row items-start">
          <View className="mt-1 w-8">
            {getServiceIcon(service?.serviceType, 22)}
          </View>

          <View className="flex-1">
            <View className="flex-row justify-between items-start">
              <Text
                className="font-semibold text-base flex-shrink"
                style={{ maxWidth: "70%", fontFamily: "poppins-semi-bold" }}
                numberOfLines={2}
              >
                {service?.serviceType}
              </Text>

              {(service?.serviceStatus === "complete" ||
                service?.serviceStatus === "cancelled") && (
                <Text
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(
                    service?.serviceStatus
                  )}`}
                >
                  {service?.serviceStatus}
                </Text>
              )}
            </View>
            {service?.description?.length && (
              <Text
                style={{ fontFamily: "poppins-regular" }}
                className="text-black-200 text-sm"
                numberOfLines={2}
              >
                {service?.description}
              </Text>
            )}

            <View className="flex-row items-center mt-1 gap-1">
              <Clock size={14} color="#6B7280" />
              <Text className="text-gray-500 text-xs">
                {new Date(service?.date).toDateString()} —{" "}
                {new Date(
                  `${service?.date}T${service?.timeslot}:00`
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Text>
            </View>

            <Text
              className="text-gray-800 font-medium mt-1"
              style={{ fontFamily: "poppins-semi-bold" }}
            >
              ₹{service?.serviceDetails?.price}
            </Text>

            {(service.serviceStatus === "in progress" ||
              service.serviceStatus === "assigned") && (
              <View className="flex-row gap-4">
                <TouchableOpacity
                  onPress={() => setIsDisplayDeleteModal(true)}
                  className="flex-row items-center gap-1 bg-red-100 py-2 px-3 rounded-full"
                >
                  <XCircle size={16} color="#DC2626" />
                  <Text className="text-red-600 text-xs font-semibold">
                    Cancel Service
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center gap-1 bg-green-100 py-2 px-3 rounded-full">
                  <CreditCard size={16} color="#16A34A" />
                  <Text className="text-green-600 text-xs font-semibold">
                    Pay Now
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
      <CancelServiceModal
        onClose={() => setIsDisplayDeleteModal(false)}
        open={isDisplayDeleteModal}
        loading={loading}
        onConfirm={handleCancelSeervice}
      />
      {/* modal cancel service modal */}
      {/* <CancelServiceModal
        onClose={() => setIsDisplayDeleteModal(false)}
        open={isDisplayDeleteModal}
        onConfirm={handleCancelSeervice}
        loading={loading}
      /> */}
    </>
  );
};

export default AlreadyBookedServiceCom;
