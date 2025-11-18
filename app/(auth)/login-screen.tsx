import AuthButton from "@/common/components/AuthButton";
import AuthInput from "@/common/components/AuthInput";
import AuthHeader from "@/features/auth/components/AuthHeader";
import { useLoginScreenHook } from "@/features/auth/hooks/login-screen.hook";
import { useKeyboardHook } from "@/lib/keyboard.hook";
import { useRouter } from "expo-router";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const LoginScreen = () => {
  const router = useRouter();
  const {
    loading,
    email,
    setEmail,
    password,
    setPassword,
    errors,
    handleSubmit,
    apiErr,
  } = useLoginScreenHook();
  const { keyboardVisible } = useKeyboardHook();

  return (
    <SafeAreaView className="w-full h-full bg-white">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        // keyboardVerticalOffset={Platform.OS === "ios" ? 20 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: keyboardVisible ? 20 : 0,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex-1 justify-center p-8">
              <AuthHeader
                title="Rento"
                subtitleTop="Hey"
                subtitleBottom="Login Now."
              />

              <View className="flex gap-6 mt-6">
                <AuthInput
                  placeholder="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  error={errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <AuthInput
                  placeholder="Password"
                  value={password}
                  onChangeText={setPassword}
                  error={errors.password}
                  secureTextEntry
                />

                {/* <Pressable className="w-full flex justify-end items-end -mt-3">
                  <Text
                    style={{ fontFamily: "poppins-medium" }}
                    className="text-sm text-primary-100 "
                  >
                    Forgot Password
                  </Text>
                </Pressable> */}
                {apiErr && (
                  <Text
                    style={{ fontFamily: "poppins-medium" }}
                    className="text-red-800 text-sm"
                  >
                    {apiErr}
                  </Text>
                )}
                <AuthButton
                  isLoading={loading}
                  title="Login"
                  onPress={handleSubmit}
                  disabled={false}
                />

                <Pressable
                  // onPress={() => router.push("/(auth)/signup-screen")}
                  className="w-full items-center"
                >
                  <Text
                    style={{ fontFamily: "poppins-medium" }}
                    className="text-sm"
                  >
                    Do not have account
                    <Text className="text-primary-100">Sign Up</Text>
                  </Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
