import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "./Components/CustomInput/CustomInput";
import { emailValidation } from "../../services/validations";
import { CheckIcon } from "../components/SvgIcons/SvgIcons";

interface IFormInput {
  email: string;
}

export const ForgetPassword = () => {
  const navigate = useNavigate();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<IFormInput>({
    mode: "onChange",
  });

  const onSubmit = (data: IFormInput) => {
    console.log(data);
    toast.success("Check your email");
    navigate("/reset-password", { state: { email: data.email } });
  };

  return (
    <>
      <h3 className="auth-label mb-16">Forgot Password</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-20">
        <CustomInput
          type="email"
          label="Email address"
          placeholder="Type your email"
          register={register("email", emailValidation)}
          isError={errors.email}
          errorMessage={errors?.email?.message}
          inputId="email"
        />
        <button className="auth-button">
          {" "}
          {isSubmitting ? "loading" : "Send email"} <CheckIcon />
        </button>
      </form>
      <div className="flex justify-end mt-24">
        <span>
          Login?{" "}
          <Link to="/login">
            <span className="text-olive underline font-bold">click here</span>
          </Link>
        </span>
      </div>
    </>
  );
};
