import AuthPicker from "@/common/components/AuthPicker";
import { useLocationDataHook } from "@/common/hooks/useLocationDataHook";
import { useAuthStore } from "@/features/auth/store/useAuthStore";
import ProfileHeader from "@/features/profile/components/ProfileHeader";
import { useProfileScreenHook } from "@/features/profile/hooks/profile.hook";
import { FormFields } from "@/features/profile/types/profile.types";
import { useIsFocused } from "@react-navigation/native";
import { useRouter } from "expo-router";
import {
  Check,
  Lock,
  LogOut,
  Mail,
  MapPin,
  Pencil,
  User,
  X,
} from "lucide-react-native";
import React, { JSX } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ProfileScreen = () => {
  const isFocused = useIsFocused();
  const { logout } = useAuthStore();
  const router = useRouter();
  const {
    form,
    handleChange,
    isEditing,
    loading,
    errors,
    handleSubmit,
    handleCancelEdit,
    setIsEditing,
    //
    countries,
    forgotPasswordModal,
    setForgotPasswordModal,
  } = useProfileScreenHook();

  const {
    fetchCitySuggestions,
    isFetchingCities,
    showCitySuggestions,
    citySuggestions,
  } = useLocationDataHook();

  const handleLogout = () => {
    logout();
    router.replace("/(auth)/login-screen");
  };

  const fields: { label: string; icon: JSX.Element; key: keyof FormFields }[] =
    [
      {
        label: "First Name",
        icon: <User size={18} color="#932537" />,
        key: "first_name",
      },
      {
        label: "Last Name",
        icon: <User size={18} color="#932537" />,
        key: "last_name",
      },
      {
        label: "Email",
        icon: <Mail size={18} color="#932537" />,
        key: "email",
      },
      {
        label: "Area",
        icon: <MapPin size={18} color="#932537" />,
        key: "area",
      },
    ];

  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        style={{ flex: 1 }}
      >
        <View className="flex-1 bg-gray-50">
          {isFocused && (
            <StatusBar
              barStyle="light-content"
              backgroundColor="#932537"
              translucent={false}
            />
          )}
          <ProfileHeader
            form={form}
            handleChange={handleChange}
            isEditing={isEditing}
          />
          {loading ? (
            <View className="flex-1 justify-center items-center">
              <ActivityIndicator size="large" color="#932537" />
            </View>
          ) : (
            <ScrollView
              contentContainerStyle={{ paddingBottom: 40 }}
              className="px-5 mt-6"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View className="flex-row justify-between items-center mb-3">
                <Text className="text-lg font-semibold text-gray-800">
                  Profile Details
                </Text>
                {isEditing ? (
                  <View className="flex-row gap-2">
                    <TouchableOpacity
                      onPress={handleSubmit}
                      className="bg-[#932537] p-2 rounded-full"
                    >
                      <Check size={18} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={handleCancelEdit}
                      className="bg-gray-400 p-2 rounded-full"
                    >
                      <X size={18} color="white" />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => setIsEditing(true)}
                    className="bg-[#932537] p-2 rounded-full"
                  >
                    <Pencil size={18} color="white" />
                  </TouchableOpacity>
                )}
              </View>
              {fields.map((field) => (
                <View
                  key={field.key}
                  className="bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-start gap-3"
                >
                  <View className="pt-1">{field.icon}</View>
                  <View className="flex-1">
                    <Text className="text-gray-500 text-sm mb-1">
                      {field.label}
                    </Text>
                    {isEditing ? (
                      <TextInput
                        value={form[field.key]}
                        onChangeText={(v) => handleChange(field.key, v)}
                        placeholder={field.label}
                        className="border-b border-[#932537]/20 text-gray-800 mb-1"
                      />
                    ) : (
                      <Text className="text-gray-800 text-base">
                        {form[field.key]}
                      </Text>
                    )}
                    {errors[field.key] && (
                      <Text className="text-red-500 text-xs mt-1">
                        {errors[field.key]}
                      </Text>
                    )}
                  </View>
                </View>
              ))}

              <View className="bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-start gap-3">
                <View className="pt-1">
                  <MapPin size={18} color="#932537" />
                </View>
                <View
                  className="flex-1"
                  style={{ zIndex: 3000, marginBottom: 16 }}
                >
                  <Text className="text-gray-500 text-sm mb-1">Country</Text>
                  {isEditing ? (
                    <View style={{ zIndex: 3000 }}>
                      <AuthPicker
                        selectedValue={form.country || ""}
                        onValueChange={(value) =>
                          handleChange("country", value as string)
                        }
                        options={countries.map((c) => ({
                          label: c.country,
                          value: c.country,
                        }))}
                        placeholder="Select Country"
                      />
                    </View>
                  ) : (
                    <Text className="text-gray-800 text-base">
                      {form.country || "—"}
                    </Text>
                  )}

                  {errors.country && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.country}
                    </Text>
                  )}
                </View>
              </View>
              {/* city */}
              <View
                style={{ zIndex: 2000, marginBottom: 16 }}
                className="bg-white rounded-2xl p-4 mb-3 shadow-sm flex-row items-start gap-3"
              >
                <View className="pt-1">
                  <MapPin size={18} color="#932537" />
                </View>
                <View className="flex-1">
                  <Text className="text-gray-500 text-sm mb-1">City</Text>

                  {isEditing ? (
                    <>
                      <TextInput
                        value={form.city}
                        onChangeText={(text) => {
                          handleChange("city", text);
                          fetchCitySuggestions(text, form.country);
                        }}
                        placeholder="Search city..."
                        className="border-b border-[#932537]/20 text-gray-800 mb-1"
                        editable={!!form.country}
                      />

                      {isFetchingCities && (
                        <View className="flex-row items-center mt-2">
                          <ActivityIndicator size="small" color="#932537" />
                          <Text className="ml-2 text-gray-500 text-sm">
                            Searching cities...
                          </Text>
                        </View>
                      )}

                      {!isFetchingCities &&
                        showCitySuggestions &&
                        citySuggestions?.length > 0 && (
                          <View className="rounded-lg mt-2 border border-gray-200 bg-white">
                            <TouchableOpacity
                              key={`${citySuggestions[0].name}-0`}
                              onPress={() => {
                                handleChange("city", citySuggestions[0].name);
                                fetchCitySuggestions("", form.country);
                              }}
                              className="px-3 py-2 border-b border-gray-200 active:bg-gray-50"
                            >
                              <Text className="text-gray-800 font-medium">
                                {citySuggestions[0].name}
                              </Text>

                              {citySuggestions[0].state ? (
                                <Text className="text-xs text-gray-500 mt-0.5">
                                  {citySuggestions[0].state},
                                  {citySuggestions[0].country}
                                </Text>
                              ) : null}
                            </TouchableOpacity>
                          </View>
                        )}

                      {!isFetchingCities &&
                        showCitySuggestions &&
                        citySuggestions?.length === 0 &&
                        form.city.length >= 2 &&
                        form.city !== citySuggestions[0]?.name && (
                          <Text className="text-gray-500 text-sm mt-2">
                            No cities found. Try different spelling.
                          </Text>
                        )}

                      {!form.country && (
                        <Text className="text-gray-400 text-xs mt-1">
                          Please select a country first
                        </Text>
                      )}
                    </>
                  ) : (
                    <Text className="text-gray-800 text-base">
                      {form.city || "—"}
                    </Text>
                  )}

                  {errors.city && (
                    <Text className="text-red-500 text-xs mt-1">
                      {errors.city}
                    </Text>
                  )}
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setForgotPasswordModal(true)}
                className="flex-row items-center justify-center mt-6 mb-3"
              >
                <Lock size={18} color="#932537" />
                <Text className="ml-2 text-[#932537] font-semibold">
                  Forgot Password?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogout}
                activeOpacity={0.8}
                className="flex-row items-center justify-center bg-[#932537] rounded-2xl py-3 mt-4 shadow-md"
              >
                <LogOut size={20} color="white" />
                <Text className="ml-2 text-white font-semibold text-base">
                  Logout
                </Text>
              </TouchableOpacity>
            </ScrollView>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};

export default ProfileScreen;
