import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import useToggle from "../../../../hooks/useToggle";

interface CustomInputProps {
  label: string;
  register: ReturnType<UseFormRegister<FieldValues>>;
  placeholder: string;
  isError?: FieldError | undefined;
  errorMessage?: string;
  inputId: string;
}

const CustomPasswordInput = ({
  label,
  register,
  isError,
  errorMessage,
  placeholder,
  inputId,
}: CustomInputProps) => {
  const [value, toggleFunction] = useToggle(false);
  return (
    <div className="flex flex-col gap-[5px] ">
      <label htmlFor={inputId} className="font-bold pl-2">
        {label}
      </label>
      <div className="relative ">
        <i
          className="fa-solid fa-key absolute 
      top-1/2 transform -translate-y-1/2 left-4 text-white text-2xl"
        />
        <input
          type={value ? "text" : "password"}
          placeholder={placeholder}
          id={inputId}
          className="py-4 pl-12 bg-inherit border-[3px] rounded-[10px] w-full outline-none"
          {...register}
        />
        <button type="button" onClick={toggleFunction}>
          <span className="sr-only">
            {value ? "Hide password" : "Show password"}
          </span>
          <i
            className={`fa-solid ${
              value ? "fa-eye" : "fa-eye-slash"
            } absolute top-1/2 transform -translate-y-1/2 right-4 text-white text-2xl`}
          />
        </button>
      </div>
      {isError && <p className="text-red-500 pl-4">{errorMessage}</p>}
    </div>
  );
};

export default CustomPasswordInput;
