/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { getRequiredMessage, PasswordValidation } from "../../../services/validations";
import CustomPasswordInput from "../../Shared/Components/CustomPasswordInput/CustomPasswordInput";
import { CheckIcon } from "../../Shared/Components/SvgIcons/SvgIcons";
import { useNavigate } from "react-router-dom";
import { AUTH_URLS, axiosInstance } from "../../../services/urls";
import { toast } from "react-toastify";
import { useEffect } from "react";

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

  const onSubmit = async (data: User): Promise<void> => {
    console.log(data);
    try {
      await axiosInstance.put<string>(AUTH_URLS.changePassword, data);
      toast.success("Password changed successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "An error occurred");
    }
  };

  const password = watch("password_new");
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
            validate: (value) =>
              value === password || "Passwords do not match",
          })}
          isError={errors?.Confirm_Password}
          errorMessage={errors?.Confirm_Password?.message}
        />

        <div className="flex items-center justify-between gap-4">
          <button className="auth-button" type="submit">
            {isSubmitting ? "loading" : "Change"}
            <CheckIcon />
          </button>
        </div>
      </form>
    </main>
  );
}
