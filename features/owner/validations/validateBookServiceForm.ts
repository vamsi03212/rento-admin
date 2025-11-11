export interface BookServiceFormData {
  date: number;
  time: string;
  address: string;
  problem: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: {
    date?: string;
    time?: string;
    address?: string;
    problem?: string;
  };
}

export const validateBookServiceForm = (
  formData: BookServiceFormData
): ValidationResult => {
  const errors: ValidationResult["errors"] = {};

  // --- Date validation ---
  if (!formData.date || isNaN(formData.date)) {
    errors.date = "Please select a valid date.";
  } else {
    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      errors.date = "Date cannot be in the past.";
    }
  }

  // --- Time validation ---
  if (!formData.time || formData.time.trim() === "") {
    errors.time = "Please select a time.";
  }

  // --- Address validation ---
  if (!formData.address || formData.address.trim().length < 5) {
    errors.address = "Please enter a valid service address.";
  }

  // --- Problem validation ---
  if (!formData.problem || formData.problem.trim().length < 5) {
    errors.problem = "Please describe the issue briefly.";
  }

  const isValid = Object.keys(errors).length === 0;
  return { isValid, errors };
};
