import { Mail, Phone, User } from "lucide-react-native";
import React, { useCallback, useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useAgentAssignedServiceModalHook } from "../hooks/agent-assigned-service.hook";
import AgentAssignedServiceDetailsModal from "../modals/AgentAssignedServiceDetailsModal";
import AgentAssiServiceCompleteModal from "../modals/AgentAssiServiceCompleteModal";
import { AssignedProperties } from "../types/assigned-services.types";

const AssignedServiceCard = ({
  service,
  refetchCurrentPage,
}: {
  service: AssignedProperties;
  refetchCurrentPage: () => Promise<void> | void;
}) => {
  const { viewModal, setViewModal, completedModal, setCompletedModal } =
    useAgentAssignedServiceModalHook();

  const fullName = useMemo(
    () => `${service?.firstName || ""} ${service?.lastName || ""}`.trim(),
    [service?.firstName, service?.lastName]
  );

  const priceText = useMemo(
    () =>
      service?.serviceDetails?.price
        ? `₹${service.serviceDetails.price}`
        : "N/A",
    [service?.serviceDetails?.price]
  );

  const handleViewDetails = useCallback(
    () => setViewModal(true),
    [setViewModal]
  );
  const handleCloseModal = useCallback(
    () => setViewModal(false),
    [setViewModal]
  );
  const handleComplete = useCallback(
    () => setCompletedModal(true),
    [setCompletedModal]
  );

  const handleCloseComplete = useCallback(
    () => setCompletedModal(false),
    [setCompletedModal]
  );

  return (
    <>
      <View
        className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-3"
        style={{ elevation: 2 }}
      >
        {/* Header Section */}
        <View className="flex-row justify-between items-start mb-3">
          {/* Left - Profile Info */}
          <View className="flex-row items-center gap-3">
            <View className="bg-gray-200 w-10 h-10 rounded-full items-center justify-center">
              <User size={22} color="#932537" />
            </View>
            <View>
              <Text
                style={{ fontFamily: "poppins-semi-bold" }}
                className="text-base text-gray-900"
              >
                {fullName || "Owner"}
              </Text>
              <Text
                style={{ fontFamily: "poppins-medium" }}
                className="text-sm text-gray-500"
              >
                Owner
              </Text>
            </View>
          </View>

          {/* Right - Contact Icons */}
          <View className="flex-row gap-2">
            <TouchableOpacity activeOpacity={0.7} className="p-2 rounded-full">
              <Phone size={18} color="#932537" />
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} className="p-2 rounded-full">
              <Mail size={18} color="#932537" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-100 mb-3" />

        {/* Service Info */}
        <View className="flex-row justify-between items-center">
          <Text
            style={{ fontFamily: "poppins-medium" }}
            className="text-gray-600"
          >
            Service type:
            <Text className="text-blue-600 font-semibold">
              {service?.serviceType || "Unknown"}
            </Text>
          </Text>

          <Text
            style={{ fontFamily: "poppins-semi-bold" }}
            className="text-[#932537] font-semibold"
          >
            {priceText}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row justify-between mt-4">
          <TouchableOpacity
            onPress={handleViewDetails}
            activeOpacity={0.8}
            className="flex-1 bg-gray-100 py-2 rounded-full mr-2"
          >
            <Text
              style={{ fontFamily: "poppins-medium" }}
              className="text-center text-[#932537]"
            >
              View Details
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleComplete}
            activeOpacity={0.8}
            className={`flex-1 py-2 rounded-full ml-2 ${
              service?.serviceStatus === "completed"
                ? "bg-gray-400"
                : "bg-[#932537]"
            }`}
            disabled={service?.serviceStatus === "completed"}
          >
            <Text
              style={{ fontFamily: "poppins-medium" }}
              className="text-center text-white"
            >
              {service?.serviceStatus === "completed"
                ? "Completed"
                : "Complete"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Detail Modal */}
      <AgentAssignedServiceDetailsModal
        open={viewModal}
        onClose={handleCloseModal}
        service={service}
      />
      {/* completed modal */}
      <AgentAssiServiceCompleteModal
        onClose={handleCloseComplete}
        open={completedModal}
        serviceId={service?.id}
        refetchCurrentPage={refetchCurrentPage}
      />
    </>
  );
};

export default React.memo(AssignedServiceCard);
