import { Link, useLocation } from "react-router-dom";
import CustomAuthTab from "./Components/CustomAuthTab/CustomAuthTab";
import {
  CheckIcon,
  SignInIcon,
  SignUpIcon,
} from "../components/SvgIcons/SvgIcons";
import { useForm } from "react-hook-form";
import {
  emailValidation,
  getRequiredMessage,
} from "../../services/validations";
import CustomInput from "./Components/CustomInput/CustomInput";
import CustomPasswordInput from "./Components/CustomInput/CustomInput";
import { useEffect } from "react";
export type User = {
  email: string;
  password: string;
};
export const Login = () => {
  const { pathname } = useLocation();
  const email = useLocation().state?.email || "";
  const password = useLocation().state?.password || "";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    mode: "onChange",
    defaultValues: {
      email,
      password,
    },
  });

  const onSubmit = (data: User) => {
    console.log(data);
  };

  useEffect(() => {
    setValue("email", email);
    setValue("password", password);
  }, [setValue, email, password]);

  return (
    <main>
      <h1 className="auth-label">
        Continue your learning journey with QuizWiz!
      </h1>
      {/* Custom taps */}
      <div className="flex gap-7 pt-8 pb-6">
        <CustomAuthTab
          icon={
            <SignInIcon
              color={
                pathname === "/login" || pathname === "/" ? "#C5D86D" : "#fff"
              }
            />
          }
          label="Sign in"
          border={
            pathname === "/login" || pathname === "/"
              ? "border-[#C5D86D] border-4"
              : ""
          }
        />
        <CustomAuthTab
          icon={
            <SignUpIcon color={pathname === "/register" ? "#C5D86D" : "#fff"} />
          }
          label="Sign up"
          border={pathname === "/register" ? "border-[#C5D86D] border-4" : ""}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <CustomInput
          label="Registered email address"
          type="email"
          placeholder="Type your email"
          register={register("email", emailValidation)}
          isError={errors?.email}
          errorMessage={errors?.email?.message}
          inputId="email"
        />
        <CustomPasswordInput
          label="Password"
          placeholder="Type your password"
          register={register("password", {
            required: getRequiredMessage("Password"),
          })}
          isError={errors?.password}
          errorMessage={errors?.password?.message}
          inputId="password"
        />
        <div className="flex items-center justify-between gap-4">
          <button type="submit" disabled={isSubmitting} className="auth-button">
            {isSubmitting ? "Signing in..." : "Sign In"}
            <CheckIcon />
          </button>
          <span className="whitespace-pre-line ">
            Forgot password?
            <Link
              to={"/forget-password"}
              className="text-olive font-bold underline">
              {" "}
              click here
            </Link>{" "}
          </span>
        </div>
      </form>
    </main>
  );
};
