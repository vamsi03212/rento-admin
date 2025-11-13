import DataWrapper from "@/common/components/DataWrapper";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import AgentAction from "@/features/property-details/components/AgentAction";
import Facilities from "@/features/property-details/components/Facilities";
import PropertyDetails from "@/features/property-details/components/PropertyDetails";
import PropertyGallery from "@/features/property-details/components/PropertyGallery";
import PropertyLocation from "@/features/property-details/components/PropertyLocation";
import PropertyOverView from "@/features/property-details/components/PropertyOverView";
import PropertySlider from "@/features/property-details/components/PropertySlider";
import { usePropertyDetailsHook } from "@/features/property-details/hooks/property-details.hook";
import React from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Property = () => {
  const role = useAuthStore((state) => state.user?.role);
  const { singleProperty, loading, error } = usePropertyDetailsHook();
  return (
    <SafeAreaView edges={["bottom"]} className="flex-1 bg-white">
      <DataWrapper loading={loading} error={error}>
        <View className="flex-1 bg-white relative">
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-10"
          >
            <PropertySlider
              propertyId={singleProperty?.id ?? null}
              property={singleProperty ?? null}
            />
            <View className="px-5 flex gap-6 w-full">
              <PropertyDetails property={singleProperty} />
              <PropertyOverView desc={singleProperty?.description ?? ""} />
              <Facilities amenities={singleProperty?.amenities ?? []} />
              <PropertyGallery propertyImages={singleProperty?.images ?? []} />
              <PropertyLocation property={singleProperty} />
              {role === "agent" && singleProperty?.id && (
                <AgentAction propertyId={singleProperty.id} />
              )}
            </View>
          </ScrollView>
        </View>
      </DataWrapper>
    </SafeAreaView>
  );
};

export default Property;
