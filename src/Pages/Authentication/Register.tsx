import { useLocation, useNavigate } from "react-router-dom";
import CustomAuthTab from "./Components/CustomAuthTab/CustomAuthTab";
import {
  CheckIcon,
  SignInIcon,
  SignUpIcon,
} from "../components/SvgIcons/SvgIcons";
import CustomInput from "./Components/CustomInput/CustomInput";
import { useForm } from "react-hook-form";
import { emailValidation } from "../../services/validations";
import CustomPasswordInput from "./Components/CustomPasswordInput/CustomPasswordInput";
import { ApiError, registerCredentials } from "../../services/interfaces";
import { useRegisterMutation } from "../../redux/apis/apis";
import { toast } from "react-toastify";


export const Register = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<registerCredentials>();

  const [registeUser] = useRegisterMutation();

  const onSubmitData = async (data: registerCredentials) => {
    // console.log(data);
    try {
      const result = await registeUser(data).unwrap();
      console.log(result);
      if (result.message) {
        toast.success(result.message);
        navigate('/login');
      }
    } catch (err: unknown) {
      const error = err as ApiError;
      console.log(error);
      toast.error(error.data?.message[0] || 'Something went wrong');
    }
  };

  return (
    <section>
      <h1 className="auth-label">
        Continue your learning journey with QuizWiz!
      </h1>
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

      <form
        className="flex flex-col gap-6"
        onSubmit={handleSubmit(onSubmitData)}>
        <div className="flex gap-6 w-full">
          <div className="flex-1">
            <CustomInput
              label="Your first name"
              type="text"
              placeholder="Type your first name"
              inputId="firstName"
              register={register("first_name", {
                required: "First name is required",
              })}
              isError={errors?.first_name}
              errorMessage={errors?.first_name?.message}
            />
          </div>

          <div className="flex-1">
            <CustomInput
              label="Your last name"
              type="text"
              placeholder="Type your last name"
              inputId="lastName"
              register={register("last_name")}
            />
          </div>
        </div>

        <CustomInput
          label="Your email address"
          type="email"
          placeholder="Type your email"
          inputId="email"
          register={register("email", emailValidation)}
          isError={errors?.email}
          errorMessage={errors?.email?.message}
        />

        <div className="relative">
          <label htmlFor="role" className="font-bold pl-2">
            Your role
          </label>
          <div className="relative">
            <select
              id="role"
              {...register("role", { required: "Role is required" })}
              className="py-4 pl-12 bg-inherit border-[3px] rounded-[10px] w-full outline-none appearance-none">
              <option hidden>Choose your role</option>
              <option
                value="Instructor"
                className="bg-gray-200 text-gray-800 hover:bg-green-300 ">
                Instructor
              </option>
              <option
                value="Student"
                className="bg-gray-200 text-gray-800 hover:bg-green-300">
                Student
              </option>
            </select>
            <i className="fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 left-4 text-white text-2xl"></i>
          </div>
        </div>

        <CustomPasswordInput
          label="Password"
          placeholder="Type your password"
          register={register("password", { required: "password is required" })}
          inputId="password"
          isError={errors?.password}
          errorMessage={errors?.password?.message}
        />
        <button type="submit" disabled={isSubmitting} className="auth-button">
          {isSubmitting ? "Signing up..." : "Sign Up"}
          <CheckIcon />
        </button>
      </form>
    </section>
  );
};
