import { useLocation, useNavigate } from "react-router-dom";
import CustomAuthTab from "../../Shared/Components/CustomAuthTab/CustomAuthTab";
import { CheckIcon, SignInIcon, SignUpIcon } from "../../Shared/Components/SvgIcons/SvgIcons";
import CustomInput from "../../Shared/Components/CustomInput/CustomInput";
import CustomPasswordInput from "../../Shared/Components/CustomPasswordInput/CustomPasswordInput";
import { useForm } from "react-hook-form";
import { emailValidation } from "../../../services/validations";
export type user ={
  name: string,
  email: string,
  role : string,
  password: string
}


export const Register = () => {
  const navigate = useNavigate();
  const {pathname} = useLocation()
  const {
    register,
    handleSubmit,
    formState:{errors , isSubmitting}
  } = useForm<user>()

  const onSubmitdata = (data:user) => {
    try {
      console.log(data)
      navigate('/verify-user')
      
    } catch (error) {
      console.log(error)
      
    }
   

  }

  return(
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
      
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmitdata)}>
      <div className="flex gap-6 w-full">
        <div className="flex-1">
          <CustomInput
            label="Your first name"
            type="text"
            placeholder="Type your first name"
            inputId="firstName"
            register={register("name", {required:"First name is required"})}
            isError={errors?.name}
            errorMessage={errors?.name?.message}
          />
        </div>
       
        <div className="flex-1">
          <CustomInput
            label="Your last name"
            type="text"
            placeholder="Type your last name"
            inputId="lastName"
            register={register("name")}
          />
        </div>
      </div>

      
        <CustomInput
        label="Your email address" 
        type="email"
        placeholder="Type your email"
        inputId="email"
        register={register("email" , emailValidation )}
        isError={errors?.email}
        errorMessage={errors?.email?.message} 
        />
        
        <div className="relative">
          <label htmlFor="role" className="font-bold pl-2">Your role</label>
          <div className="relative">
            <select id="role" name="role" className="py-4 pl-12 bg-inherit border-[3px] rounded-[10px] w-full outline-none appearance-none">
              <option hidden>Choose your role</option>
              <option value="instructor" className="bg-gray-200 text-gray-800 hover:bg-green-300 ">Instructor</option>
              <option value="student" className="bg-gray-200 text-gray-800 hover:bg-green-300">Student</option>
            </select>
            <i className="fa-solid fa-envelope absolute top-1/2 transform -translate-y-1/2 left-4 text-white text-2xl"></i>
          </div>
        </div>

         <CustomPasswordInput
          label="Password"
          placeholder="Type your password"
          register={register('password' , {required:"password is required"})}
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
  )
};
