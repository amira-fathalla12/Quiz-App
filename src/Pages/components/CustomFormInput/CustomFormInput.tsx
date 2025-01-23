import { forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Iprops {
  label: string;
  width: string;
  height?: string;
  isError?: FieldError | undefined | boolean;
  errorMessage?: string;
  labelWidth?: string;
  defaultValue?: string;
  name?: string;
}

const CustomFormInput = forwardRef<HTMLInputElement, Iprops>(
  (
    { label, width, height, isError, errorMessage, labelWidth, ...rest },
    ref
  ) => {
    return (
      <div className={`flex flex-col ${width} mb-2`}>
        <div className={`flex ${height}`}>
          <label
            className={twMerge(
              `flex-shrink-0 flex items-center p-2.5 
            pointer-events-none border-y border-l border-[#0000004D]
            bg-linen rounded-l-lg font-bold text-sm sm:text-base`,
              `w-20 sm:${labelWidth}`
            )}
          >
            {label === "Duration" ? (
              <>
                {label}
                <span className="font-normal hidden sm:flex sm:ps-1 text-nowrap">
                  (in mins)
                </span>
              </>
            ) : label === "Score per question" ? (
              <div className="flex items-center">
                Score
                <span className="hidden sm:flex sm:ps-1 "> per question</span>
              </div>
            ) : (
              label
            )}
          </label>
          <input
            type="text"
            className="block w-full p-2.5 border-y border-r border-[#0000004D] rounded-r-lg"
            {...rest}
            ref={ref}
          />
        </div>
        {isError && <p className="text-red-500">{errorMessage?.toString()}</p>}
      </div>
    );
  }
);

export default CustomFormInput;
