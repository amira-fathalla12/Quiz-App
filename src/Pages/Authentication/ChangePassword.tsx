/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  getRequiredMessage,
  PasswordValidation,
} from "../../services/validations";
import { CheckIcon } from "../components/SvgIcons/SvgIcons";
import { useChangePasswordMutation } from "../../redux/apis/apis"; 
import CustomPasswordInput from "./Components/CustomPasswordInput/CustomPasswordInput";

export type User = {
  password: string;
  password_new: string;
  Confirm_Password: string;
};

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<User>({ mode: "onChange" });

  const navigate = useNavigate();
  const password = useLocation().state?.password || "";
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const onSubmit = async (data: User): Promise<void> => {
    console.log(data);
    try {
      await changePassword(data).unwrap();
      toast.success("Password changed successfully");
      navigate("/login", {
        state: { password: data.password },
      });
    } catch (error: any) {
      toast.error(error?.message || "An error occurred");
    }
  };
  const confirmPassword = watch("Confirm_Password");

  useEffect(() => {
    if (confirmPassword) trigger("Confirm_Password");
  }, [password, confirmPassword, trigger]);

  return (
    <main>
      <h1 className="auth-label mb-9">Change password</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <CustomPasswordInput
          label="Old Password"
          placeholder="Type your password"
          inputId="password"
          register={register("password", {
            required: getRequiredMessage("Password"),
          })}
          isError={errors?.password}
          errorMessage={errors?.password?.message}
        />

        <CustomPasswordInput
          label="New Password"
          placeholder="Type your new password"
          inputId="new-password"
          register={register("password_new", PasswordValidation(8))}
          isError={errors?.password_new}
          errorMessage={errors?.password_new?.message}
        />

        <CustomPasswordInput
          label="Confirm Password"
          placeholder="Re-enter your password"
          inputId="confirm-password"
          register={register("Confirm_Password", {
            required: getRequiredMessage("Confirm Password"),
            validate: (value) => value === password || "Passwords do not match",
          })}
          isError={errors?.Confirm_Password}
          errorMessage={errors?.Confirm_Password?.message}
        />

        <div className="flex items-center justify-between gap-4">
          <button 
          className="auth-button" 
          type="submit" 
					disabled={isSubmitting || isLoading}
          >
            {isLoading ? "loading" : "Change"}
            <CheckIcon />
          </button>
        </div>
      </form>
    </main>
  );
}
