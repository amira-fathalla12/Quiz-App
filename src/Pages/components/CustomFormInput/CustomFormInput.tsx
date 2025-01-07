import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";

interface Iprops {
  label: string;
  width: string;
  height?: string;
  register?: ReturnType<UseFormRegister<FieldValues>>;
  isError?: FieldError | undefined | boolean;
  errorMessage?: string;
  labelWidth?: string;
  value?: string;
}

const CustomFormInput = ({
  label,
  width,
  height,
  register,
  isError,
  errorMessage,
  labelWidth,
  value,
}: Iprops) => {
  return (
    <div className={`md:${width}  mb-2  `}>
      <div className={`flex ${height} `}>
        <label
          className={`flex-shrink-0 flex items-center p-2.5 
		pointer-events-none border-y border-l border-[#0000004D]
		 bg-linen rounded-l-lg font-bold ${labelWidth}  `}
        >
          {label}
        </label>
        <input
          type="text"
          className="block w-full p-2.5 border-y border-r border-[#0000004D] rounded-r-lg"
          {...register}
          defaultValue={value}
        />
      </div>
      {isError && <p className="text-red-500">{errorMessage?.toString()}</p>}
    </div>
  );
};

export default CustomFormInput;
