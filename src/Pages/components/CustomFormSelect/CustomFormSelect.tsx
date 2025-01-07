import { Select } from "@headlessui/react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { group } from "../../../services/interfaces";

type Props = {
  register: ReturnType<UseFormRegister<FieldValues>>;
  label: string;
  width: string;
  isError: FieldError | undefined;
  errorMessage?: string;
  selectValues?: string[];
  selectType?: string;
  groupValue?: group[];
  labelWidth?: string;
  value?: string | number;
  height?: string;
};
const CustomFormSelect = ({
  register,
  label,
  width,
  isError,
  errorMessage,
  selectValues,
  selectType,
  groupValue,
  labelWidth,
  value,
  height,
}: Props) => {
  return (
    <div className={` flex flex-col ${width}  mb-2 `}>
      <div className={` flex ${height}`}>
        <label
          className={`flex-shrink-0 flex items-center p-2.5
      pointer-events-none border-y border-l border-[#0000004D] bg-linen
      rounded-l-lg font-bold h-10 sm:${labelWidth} text-sm sm:text-base`}
        >
          {label}
        </label>

        <Select
          className="block w-full ps-1 border-y border-r border-[#0000004D]
        rounded-r-lg h-10"
          {...register}
          defaultValue={value ? value : ""}
          // value={value}
        >
          <option value="" disabled>
            {" "}
          </option>
          {selectValues?.map((value, index) => (
            <option
              key={value}
              value={
                selectType === "group"
                  ? groupValue?.map((g) => g._id)[index]
                  : value
              }
            >
              {value}
            </option>
          ))}
        </Select>
      </div>
      {isError && <p className="text-red-500">{errorMessage?.toString()}</p>}
    </div>
  );
};

export default CustomFormSelect;
