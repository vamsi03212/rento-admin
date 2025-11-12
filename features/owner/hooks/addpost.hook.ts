import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { getImageUrl } from "@/lib/imageUrl";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import {
  createProperty,
  updateProperty,
} from "../services/fetch-properties.service";
import { AddPropertyForm } from "../types/add-property.types";
import { validateAddPostForm } from "../validations/add-post.validation";

const initialFormState: AddPropertyForm = {
  rentType: "",
  propertyType: "",
  bedrooms: "",
  bathrooms: "",
  furnishing: "",
  projectName: "",
  totalFloors: "",
  floorNo: "",
  facing: "",
  propertyLength: "",
  propertyAge: "",
  amenities: [],
  availability: "",
  nearbySchool: "",
  nearbyHospital: "",
  nearbyParks: "",
  nearbyMalls: "",
  advanceAmount: "",
  monthsAdvance: "",
  maintenance: "",
  country: "",
  location: "",
  area: "",
  latitude: "",
  longitude: "",
  images: [],
  description: "",
  currency: "",
  rentAmount: "",
};

export const useAddPostHook = () => {
  const { user } = useAuthStore();
  const { property } = useLocalSearchParams();
  const parsedProperty = property
    ? JSON.parse(Array.isArray(property) ? property[0] : property)
    : null;
  const [form, setForm] = useState<AddPropertyForm>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (parsedProperty) {
      setEditable(true);
      setForm({
        ...initialFormState,
        ...parsedProperty,
        images:
          parsedProperty.images?.map(
            (img: any) => getImageUrl(img.image).uri
          ) || [],
      });
    }
  }, [parsedProperty]);

  useEffect(() => {
    return () => {
      setForm(initialFormState);
      setErrors({});
      setLoading(false);
      setEditable(false);
    };
  }, []);

  const handleChange = <K extends keyof AddPropertyForm>(
    field: K,
    value: AddPropertyForm[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    const validationErrors = validateAddPostForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("❌ Validation failed", validationErrors);
      setLoading(false);
      return false;
    }
    const formData = new FormData();
    formData.append("userId", String(user?.id ?? ""));
    formData.append("rentType", form.rentType || "");
    formData.append("propertyType", form.propertyType || "");
    formData.append("bedrooms", form.bedrooms || "");
    formData.append("bathrooms", form.bathrooms || "");
    formData.append("furnishing", form.furnishing || "");
    formData.append("projectName", form.projectName || "");
    formData.append("description", form.description || "");
    formData.append("rentAmount", form.rentAmount || "");
    formData.append("latitude", form.latitude || "");
    formData.append("longitude", form.longitude || "");
    formData.append("country", form.country || "");
    formData.append("location", form.location || "");
    formData.append("area", form.area || "");
    formData.append("availability", form.availability || "");
    formData.append("currency", form.currency || "");

    if (form.rentType === "Monthly") {
      formData.append("totalFloors", form.totalFloors || "");
      formData.append("floorNo", form.floorNo || "");
      formData.append("facing", form.facing || "");
      formData.append("nearbySchool", form.nearbySchool || "");
      formData.append("nearbyHospital", form.nearbyHospital || "");
      formData.append("nearbyParks", form.nearbyParks || "");
      formData.append("nearbyMalls", form.nearbyMalls || "");
      formData.append("propertyLength", form.propertyLength || "");
      formData.append("propertyAge", form.propertyAge || "");
      formData.append("advanceAmount", form.advanceAmount || "");
      formData.append("monthsAdvance", form.monthsAdvance || "");
      formData.append("maintenance", form.maintenance || "");
    }

    if (Array.isArray(form.amenities)) {
      form.amenities.forEach((item) => {
        if (item) formData.append("amenities", item);
      });
    }

    if (Array.isArray(form.images)) {
      form.images.forEach((image) => {
        if (image) formData.append("image", image);
      });
    }

    const apiRes = editable
      ? await updateProperty(parsedProperty?.id, formData)
      : await createProperty(formData);

    if (apiRes?.status) {
      Toast.show({
        type: "success",
        text1: editable
          ? "Property Edit successfully"
          : "Property created successfully!",
        position: "bottom",
        visibilityTime: 3000,
      });
      setForm(initialFormState);
    }
    setLoading(false);
    return true;
  };

  return {
    form,
    setForm,
    errors,
    loading,
    handleChange,
    handleSubmit,
    editable,
  };
};
