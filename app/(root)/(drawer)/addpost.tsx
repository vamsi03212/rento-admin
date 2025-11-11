import AuthButton from "@/common/components/AuthButton";
import AuthInput from "@/common/components/AuthInput";
import AddPropetyDetails from "@/features/owner/component/AddPropetyDetails";
import PostAddImages from "@/features/owner/component/PostAddImages";
import { useAddPostHook } from "@/features/owner/hooks/addpost.hook";
import { useKeyboardHook } from "@/lib/keyboard.hook";
import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Addpost = () => {
  const { form, setForm, errors, handleChange, handleSubmit, loading } =
    useAddPostHook();
  const { keyboardVisible } = useKeyboardHook();
  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["left", "right", "bottom"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              padding: 20,
              paddingBottom: keyboardVisible ? 300 : 0,
            }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <AddPropetyDetails
              form={form}
              errors={errors}
              handleChange={handleChange}
            />
            <PostAddImages form={form} setForm={setForm} errors={errors} />
            <AuthInput
              label="Description"
              placeholder="Description"
              value={form.description}
              onChangeText={(v) => handleChange("description", v)}
              error={errors.description}
              multiline
            />
            <View className="mt-4">
              <AuthButton
                onPress={handleSubmit}
                title="Add Property"
                isLoading={loading}
              />
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Addpost;
