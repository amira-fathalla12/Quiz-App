import { useState } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import { Control, Controller, FieldError } from "react-hook-form";
import { Quiz } from "../../../../services/interfaces";

type Props = {
  label: string;
  width: string;
  isError: FieldError | undefined;
  errorMessage?: string;
  control: Control<Quiz>;
};
const CustomDateTimePicker = ({ control, isError, errorMessage }: Props) => {
  const [dateTime, setDateTime] = useState(new Date());

  return (
    <div className="flex flex-col mb-2">
      <div className="w-full flex ">
        <label
          className="flex-shrink-0 flex items-center  
        p-2.5 pointer-events-none border-y border-l
         border-[#0000004D] bg-linen rounded-l-lg font-bold"
        >
          Schedule
        </label>

        <Controller
          name="schadule"
          control={control}
          defaultValue={""}
          rules={{ required: "Schadule are required" }}
          render={({ field }) => (
            <DateTimePicker
              {...field}
              onChange={(date) => {
                field.onChange(date);
                if (date !== null) {
                  setDateTime(date);
                }
              }}
              value={dateTime}
              minDate={new Date()} // Disable previous days
              className="block w-full  border-y border-r border-[#0000004D] rounded-r-lg 
              h-10 font-bold ps-0 sm:ps-5"
            />
          )}
        />
      </div>
      {isError && <p className="text-red-500">{errorMessage?.toString()}</p>}
    </div>
  );
};

export default CustomDateTimePicker;
