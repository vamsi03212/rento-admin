import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import { postServiceApi } from "../services/owenr-servicesprovide.service";
import { PostServiceTypes } from "../types/service-provided.types";
import {
  BookServiceFormData,
  validateBookServiceForm,
} from "../validations/validateBookServiceForm";

interface UseBookServiceHook {
  serviceType: string;
  onClose: () => void;
}

export const useBookServiceHook = ({
  serviceType,
  onClose,
}: UseBookServiceHook) => {
  const user = useAuthStore((state) => state.user);
  const [formData, setFormData] = useState<BookServiceFormData>({
    date: 0,
    time: "",
    address: "",
    problem: "",
  });

  const [showPicker, setShowPicker] = useState({
    date: false,
    time: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker((prev) => ({ ...prev, date: Platform.OS === "ios" }));
    if (date) {
      setFormData((prev) => ({ ...prev, date: date.getTime() }));
    }
  };

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    setShowPicker((prev) => ({ ...prev, time: Platform.OS === "ios" }));
    if (date) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      setFormData((prev) => ({ ...prev, time: `${hours}:${minutes}` }));
    }
  };

  const formatDisplayDate = (timestamp: number) => {
    if (!timestamp) return "Select Date";
    const d = new Date(timestamp);
    return d.toDateString();
  };

  const updateField = (key: keyof typeof formData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const validation = validateBookServiceForm(formData);
    setErrors(validation.errors);

    if (!validation.isValid) {
      return;
    }

    const newFormData: PostServiceTypes = {
      first_name: user?.first_name ?? "",
      last_name: user?.last_name ?? "",
      phone: user?.phoneNumber ?? "+91",
      email: user?.email ?? "",
      address: formData.address,
      date: formData.date,
      time: formData.time,
      ownerId: user?.id ?? 0,
      description: formData.problem,
      serviceType,
    };
    setLoading(true);
    const apiRes = await postServiceApi(newFormData);
    if (apiRes.status) {
      onClose();
      setFormData({
        date: 0,
        time: "",
        address: "",
        problem: "",
      });
      Toast.show({
        type: "success",
        text1: "Booking successful",
        position: "top",
        visibilityTime: 2000,
      });
    }
    setLoading(false);
  };

  return {
    formData,
    setFormData,
    showPicker,
    setShowPicker,
    handleDateChange,
    handleTimeChange,
    formatDisplayDate,
    updateField,
    handleSubmit,
    errors,
    loading,
  };
};
