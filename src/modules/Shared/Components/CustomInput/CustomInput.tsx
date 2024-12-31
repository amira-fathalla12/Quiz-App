import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface CustomInputProps {
  label?: string;
  type: string;
  register?: ReturnType<UseFormRegister<FieldValues>>;
  isError?: FieldError | undefined | boolean;
  errorMessage?: string;
  placeholder?: string;
  inputId: string;
  readonly?: boolean;
  value?: string;
}

const CustomInput = ({
  label,
  type,
  placeholder,
  register,
  isError,
  errorMessage,
  inputId,
  readonly,
  value,
}: CustomInputProps) => {
  return (
    <div className="flex flex-col gap-[5px] ">
      <label htmlFor={inputId} className="font-bold pl-2">
        {label}
      </label>
      <div className="relative ">
        <i
          className="fa-solid fa-envelope absolute 
            top-1/2 transform -translate-y-1/2 left-4 text-white text-2xl"
        />
        <input
          type={type}
          placeholder={placeholder}
          id={inputId}
          readOnly={readonly}
          value={value}
          className="py-4 pl-12 bg-inherit border-[3px] rounded-[10px] w-full outline-none"
          {...register}
        />
      </div>
      {isError && (
        <p className="text-red-500 pl-4">{errorMessage?.toString()}</p>
      )}
    </div>
  );
};

export default CustomInput;
