import { UseFormWatch } from "react-hook-form";
import { IFormInput } from "../Pages/Authentication/ResetPassword";

export const getRequiredMessage = (filedName: string) =>
  `${filedName} is required`;

export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: "Invalid Email",
  },
};

export const PasswordValidation = (minLength: number = 8) => ({
  required: "Password is required",
  minLength: {
    value: minLength,
    message: `Password must be at least ${minLength} characters long`,
  },
  validate: {
    hasUpperCase: (value: string) =>
      /[A-Z]/.test(value) ||
      "Password must contain at least one uppercase letter",
    hasLowerCase: (value: string) =>
      /[a-z]/.test(value) ||
      "Password must contain at least one lowercase letter",
    hasNumber: (value: string) =>
      /\d/.test(value) || "Password must contain at least one number",
    hasSpecialChar: (value: string) =>
      /[!@#$%^&*]/.test(value) ||
      "Password must contain at least one special character",
  },
});

export const passwordConfirmation = (
  watch: UseFormWatch<IFormInput> | null
) => {
  return {
    required: getRequiredMessage("Confirm Password"),
    validate: (value: string) =>
      value === watch!("password") || "The passwords do not match ",
  };
};
