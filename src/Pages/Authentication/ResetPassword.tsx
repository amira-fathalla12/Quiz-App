import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "./Components/CustomInput/CustomInput";
import {
  getRequiredMessage,
  passwordConfirmation,
} from "../../services/validations";
import { CheckIcon } from "../components/SvgIcons/SvgIcons";
import CustomPasswordInput from "./Components/CustomPasswordInput/CustomPasswordInput";

export interface IFormInput {
  email: string;
  otp: string;
  password: string;
  passwordConf: string;
}

export const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    watch,
  } = useForm<IFormInput>({
    mode: "onChange",
  });
  const email = useLocation()?.state?.email;

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    toast.success("Password resseted successfully");
    navigate("/login", {
      state: { email: data.email, password: data.password },
    });
  };

  return (
    <>
      <h3 className="auth-label mb-9">Reset Password</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <CustomInput
          type="email"
          label="Your email address"
          register={register("email")}
          inputId="email"
          readonly={true}
          value={email}
        />
        <CustomInput
          type="text"
          label="OTP"
          placeholder="OTP"
          register={register("otp", { required: getRequiredMessage("OTP") })}
          isError={errors.otp}
          errorMessage={errors?.otp?.message}
          inputId="otp"
        />
        <CustomPasswordInput
          label="Password"
          register={register("password", {
            required: getRequiredMessage("Password"),
          })}
          placeholder="Type your password"
          isError={errors.password}
          errorMessage={errors?.password?.message}
          inputId="password"
        />
        <CustomPasswordInput
          label="Confirm Password"
          register={register("passwordConf", passwordConfirmation(watch))}
          placeholder="Type your confirm password"
          isError={errors.passwordConf}
          errorMessage={errors?.passwordConf?.message}
          inputId="confirm-password"
        />
        <button className="auth-button">
          {isSubmitting ? "loading" : "Reset"} <CheckIcon />
        </button>
      </form>
    </>
  );
};