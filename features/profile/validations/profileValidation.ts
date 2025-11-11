import { FormFields } from "../hooks/profile.hook";

export type Errors = Partial<Record<keyof FormFields, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ValidationRule =
  | { required: boolean; min: number; max: number }
  | { required: boolean; regex: RegExp };

const rules: Record<keyof FormFields, ValidationRule | undefined> = {
  first_name: { required: true, min: 2, max: 20 },
  last_name: { required: true, min: 2, max: 20 },
  email: { required: true, regex: emailRegex },
  area: { required: true, min: 3, max: 50 },
  city: { required: true, min: 2, max: 30 },
  country: { required: true, min: 2, max: 30 },
  upload_document: undefined,
  role: undefined,
};

/**
 * Validates the form fields and returns an object of errors.
 * Returns an empty object if all fields are valid.
 */
export const validateProfileForm = (form: FormFields): Errors => {
  const newErrors: Errors = {};

  for (const key in rules) {
    const rule = rules[key as keyof typeof rules];
    if (!rule) continue;

    const value = form[key as keyof FormFields]?.trim() || "";

    // Required check
    if (rule.required && !value) {
      newErrors[key as keyof FormFields] = "This field is required";
      continue;
    }

    // Min check
    if ("min" in rule && value.length < rule.min) {
      newErrors[key as keyof FormFields] =
        `Minimum ${rule.min} characters required`;
    }

    // Max check
    if ("max" in rule && value.length > rule.max) {
      newErrors[key as keyof FormFields] =
        `Maximum ${rule.max} characters allowed`;
    }

    // Regex check
    if ("regex" in rule && !rule.regex.test(value)) {
      newErrors[key as keyof FormFields] = "Invalid format";
    }
  }

  return newErrors;
};
