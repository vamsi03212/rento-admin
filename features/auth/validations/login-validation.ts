interface LoginValues {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}
export const validateLogin = (values: LoginValues): LoginErrors => {
  const errors: LoginErrors = {};

  // Email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(values.email)) errors.email = "Invalid email address";
  }

  // Password validation
  if (!values.password) errors.password = "Password is required";

  return errors;
};
