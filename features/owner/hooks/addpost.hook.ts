import { useAuthStore } from "@/features/auth/store/useAuthStore";
import { useState } from "react";
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
  availabilityDate: "",
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
  const [form, setForm] = useState<AddPropertyForm>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

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

  const handleSubmit = () => {
    setLoading(true);
    const validationErrors = validateAddPostForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      console.log("❌ Validation failed", validationErrors);
      setLoading(false);
      return false;
    }
    console.log("form", form);
  };

  return {
    form,
    setForm,
    errors,
    loading,
    handleChange,
    handleSubmit,
  };
};
