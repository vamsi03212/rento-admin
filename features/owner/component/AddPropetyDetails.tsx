import AuthInput from "@/common/components/AuthInput";
import AuthPicker from "@/common/components/AuthPicker";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import React, { FC, useMemo, useState } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useAddPropertyDetailsHook } from "../hooks/add-property-details.hook";
import { AddPropertyForm } from "../types/add-property.types";

const currencyOptions = [
  { value: "INR", label: "Indian Rupee" },
  { value: "USD", label: "US Dollar" },
  { value: "EUR", label: "Euro" },
  { value: "GBP", label: "British Pound" },
  { value: "AUD", label: "Australian Dollar" },
  { value: "CAD", label: "Canadian Dollar" },
  { value: "JPY", label: "Japanese Yen" },
  { value: "AED", label: "UAE Dirham" },
];

interface AddPropertyDetailsProps {
  form: AddPropertyForm;
  errors: Record<string, string>;
  handleChange: <K extends keyof AddPropertyForm>(
    field: K,
    value: AddPropertyForm[K]
  ) => void;
}

const AddPropertyDetails: FC<AddPropertyDetailsProps> = ({
  form,
  errors,
  handleChange,
}) => {
  const { apiProertyTypes, apiAmenitiesTypes } = useAddPropertyDetailsHook();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [datePickerValue, setDatePickerValue] = useState<Date>(
    form.availability ? new Date(form.availability) : new Date()
  );

  // 🗓️ Format date for display
  const formattedDate = form.availability
    ? new Date(form.availability).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    if (event.type === "set" && selectedDate) {
      setDatePickerValue(selectedDate);
      handleChange("availability", selectedDate.toISOString());
    }
    setShowDatePicker(false);
  };

  // 🏢 Prepare Amenities Dropdown
  const amenityTypeOptions = useMemo(() => {
    if (!apiAmenitiesTypes || !Array.isArray(apiAmenitiesTypes)) return [];
    return apiAmenitiesTypes.map((item) => ({
      label: item.amenity || "",
      value: item.amenity || "",
    }));
  }, [apiAmenitiesTypes]);

  const propertyTypeOptions = useMemo(() => {
    if (!apiProertyTypes || !Array.isArray(apiProertyTypes)) return [];
    return apiProertyTypes.map((item) => ({
      label: item.property_type || "",
      value: item.property_type || "",
    }));
  }, [apiProertyTypes]);

  const handleAmenitiesChange = (selected: string[] | string) => {
    const newValue = Array.isArray(selected) ? selected : [selected];
    handleChange("amenities", newValue);
  };

  return (
    <>
      <View className="flex-col gap-4 ">
        <Text className="text-lg mb-2" style={{ fontFamily: "poppins-medium" }}>
          Property Details
        </Text>

        {/* Rent Type Picker */}
        <AuthPicker
          selectedValue={form.rentType}
          onValueChange={(value) => handleChange("rentType", value as string)}
          options={[
            { label: "Monthly", value: "Monthly" },
            { label: "Daily", value: "Daily" },
            { label: "Sale", value: "Sale" },
          ]}
          placeholder="Select Rent Type"
          error={errors.rentType}
        />

        <AuthPicker
          selectedValue={form.propertyType || ""}
          // onValueChange={handlers.propertyType}
          onValueChange={(value) =>
            handleChange("propertyType", value as string)
          }
          options={propertyTypeOptions}
          placeholder="Select Property Type"
          error={errors.propertyType}
        />

        <View className="flex-row gap-4">
          <View className="flex-1">
            <AuthInput
              placeholder="Bedrooms"
              value={form.bedrooms || ""}
              onChangeText={(text) => handleChange("bedrooms", text)}
              error={errors.bedrooms}
              keyboardType="numeric"
            />
          </View>

          <View className="flex-1">
            <AuthInput
              placeholder="Bathrooms"
              value={form.bathrooms || ""}
              onChangeText={(text) => handleChange("bathrooms", text)}
              error={errors.bathrooms}
              keyboardType="numeric"
            />
          </View>
        </View>

        <AuthPicker
          selectedValue={form.furnishing || ""}
          onValueChange={(value) => handleChange("furnishing", value as string)}
          options={[
            // { label: "Full-Furnished", value: "Full-Furnished" },
            // { label: "Semi-Furnished", value: "Semi-Furnished" },
            // { label: "Unfurnished", value: "Unfurnished" },
            { label: "Semi-Furnished", value: "semi-furnished" },
            { label: "Full-Furnished", value: "full-furnished" },
            { label: "Unfurnished", value: "unfurnished" },
          ]}
          placeholder="Select Furnishing"
          error={errors.furnishing}
        />

        {/* Project Name Input */}
        <AuthInput
          placeholder="Project Name"
          value={form.projectName || ""}
          onChangeText={(text) => handleChange("projectName", text)}
          error={errors.projectName}
        />

        {/* Availability Date Picker */}
        <View>
          <TouchableOpacity
            className="h-[55px] border border-gray-300 rounded-xl p-3 bg-[#f5f5f5] justify-center"
            onPress={() => setShowDatePicker(true)}
            activeOpacity={0.7}
          >
            <Text
              className={
                formattedDate
                  ? "text-black text-base"
                  : "text-gray-400 text-base"
              }
              style={{ fontFamily: "poppins-regular" }}
            >
              {formattedDate || "Select Availability Date"}
            </Text>
          </TouchableOpacity>

          {errors.availability ? (
            <Text className="text-red-500 text-xs mt-1">
              {errors.availability}
            </Text>
          ) : null}

          {showDatePicker && (
            <DateTimePicker
              value={datePickerValue}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              minimumDate={new Date()}
              onChange={handleDateChange}
              themeVariant="light"
            />
          )}
        </View>

        {form.rentType === "Monthly" && (
          <>
            <View className="flex-row gap-4">
              <View className="flex-1">
                <AuthInput
                  placeholder="Total Floors"
                  value={form.totalFloors || ""}
                  onChangeText={(text) => handleChange("totalFloors", text)}
                  error={errors.totalFloors}
                  keyboardType="numeric"
                />
              </View>

              <View className="flex-1">
                <AuthInput
                  placeholder="Floor No"
                  value={form.floorNo || ""}
                  onChangeText={(text) => handleChange("floorNo", text)}
                  error={errors.floorNo}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <AuthPicker
              selectedValue={form.facing || ""}
              onValueChange={(value) => handleChange("facing", value as string)}
              options={[
                { label: "East", value: "East" },
                { label: "West", value: "West" },
                { label: "North", value: "North" },
                { label: "South", value: "South" },
                { label: "North-East", value: "North-East" },
                { label: "North-West", value: "North-West" },
                { label: "South-East", value: "South-East" },
                { label: "South-West", value: "South-West" },
                { label: "Other", value: "Other" },
              ]}
              placeholder="Select Facing"
              error={errors.facing}
            />

            <AuthInput
              placeholder="Property Length (in ft)"
              value={form.propertyLength || ""}
              onChangeText={(text) => handleChange("propertyLength", text)}
              error={errors.propertyLength}
              keyboardType="numeric"
            />

            <AuthInput
              placeholder="Age of Property (in years)"
              value={form.propertyAge || ""}
              onChangeText={(text) => handleChange("propertyAge", text)}
              error={errors.propertyAge}
              keyboardType="numeric"
            />
          </>
        )}

        {/* 🏢 Amenities Multi-Select */}
        <AuthPicker
          multiSelect
          selectedValue={form.amenities || []}
          onValueChange={handleAmenitiesChange}
          options={amenityTypeOptions}
          placeholder="Select Amenities"
          error={errors.amenities}
        />
        {form.rentType === "Monthly" && (
          <>
            <Text className="text-lg" style={{ fontFamily: "poppins-medium" }}>
              Nearby
            </Text>

            <AuthInput
              placeholder="School Name"
              value={form.nearbySchool || ""}
              onChangeText={(v) => handleChange("nearbySchool", v)}
              error={errors.nearbySchool}
            />
            <AuthInput
              placeholder="Hospital Name"
              value={form.nearbyHospital || ""}
              onChangeText={(v) => handleChange("nearbyHospital", v)}
              error={errors.nearbyHospital}
            />
            <AuthInput
              placeholder="Parks Name"
              value={form.nearbyParks || ""}
              onChangeText={(v) => handleChange("nearbyParks", v)}
              error={errors.nearbyParks}
            />
            <AuthInput
              placeholder="Malls Name"
              value={form.nearbyMalls || ""}
              onChangeText={(v) => handleChange("nearbyMalls", v)}
              error={errors.nearbyMalls}
            />

            <Text
              className="text-lg mb-2"
              style={{ fontFamily: "poppins-medium" }}
            >
              Advance Amount
            </Text>
            <AuthInput
              placeholder="Enter Advance Amount"
              value={form.advanceAmount || ""}
              onChangeText={(v) => handleChange("advanceAmount", v)}
              error={errors.advanceAmount}
              keyboardType="numeric"
            />
            <AuthInput
              placeholder="No of Months Advance"
              value={form.monthsAdvance || ""}
              onChangeText={(v) => handleChange("monthsAdvance", v)}
              error={errors.monthsAdvance}
              keyboardType="numeric"
            />
            <AuthInput
              placeholder="Maintenance"
              value={form.maintenance || ""}
              onChangeText={(v) => handleChange("maintenance", v)}
              error={errors.maintenance}
              keyboardType="numeric"
            />
          </>
        )}

        <Text className="text-lg" style={{ fontFamily: "poppins-medium" }}>
          Currency Details
        </Text>

        <AuthPicker
          selectedValue={form.currency || ""}
          // onValueChange={(value) => handleChange("currency", value)}
          onValueChange={(value) => handleChange("currency", value as string)}
          options={currencyOptions}
          placeholder="Select Currency Type"
          error={errors.currency}
        />

        <AuthInput
          placeholder="Enter amount for property"
          value={form.rentAmount || ""}
          onChangeText={(v) => handleChange("rentAmount", v)}
          error={errors.rentAmount}
          keyboardType="numeric"
        />
      </View>
    </>
  );
};

export default AddPropertyDetails;
