import { useForm } from "react-hook-form"
import CustomInput from "../../Shared/Components/CustomInput/CustomInput"
import { user } from "../Register/Register"
import { emailValidation } from "../../../services/validations"
import { CheckIcon } from "../../Shared/Components/SvgIcons/SvgIcons";
export type verifyUser = user & {
  otp: string; 
};

export const VerifyRegister = () => {
    const {
      register,
      handleSubmit,
      formState:{errors , isSubmitting}
    } = useForm<verifyUser>()
  
    const onSubmitdata = (data:verifyUser) => {
      try {
        console.log(data)        
      } catch (error) {
        console.log(error)
      }
     
    }

  return (
    <section>
      <h1 className="auth-label">
        Verify Account
        <br />
        <span className="text-gray-500 text-sm">Please Enter Your Otp or Check Your Inbox</span>
      </h1>
      <form onSubmit={handleSubmit(onSubmitdata)} className="pt-8 flex flex-col gap-6">
        <CustomInput
          label="Your email address" 
          type="email"
          placeholder="Type your email"
          className="fa-solid fa-envelope absolute 
            top-1/2 transform -translate-y-1/2 left-4 text-white text-2xl"
          inputId="email"
          register={register("email" , emailValidation )}
          isError={errors?.email}
          errorMessage={errors?.email?.message} 
          />

        <CustomInput
					type='text'
					label='OTP'
					placeholder='OTP'
					register={register('otp', { required: 'OTP is required' })}
					isError={errors.otp}
					errorMessage={errors?.otp?.message}
					inputId='otp'
				/>
        <button type="submit" disabled={isSubmitting} className="auth-button">
            {isSubmitting ? "Loading..." : "Submit"}
            <CheckIcon />
        </button>

      </form>
      

    </section>
  )
}
