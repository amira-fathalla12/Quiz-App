import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";
import CustomFormInput from "../CustomFormInput/CustomFormInput";
import { group } from "../../../services/interfaces";
import { getRequiredMessage } from "../../../services/validations";
import { Listbox } from "@headlessui/react";
import { useEffect, useState } from "react";

interface Iprops {
  register: UseFormRegister<group>;
  errors: FieldErrors<group>;
  students: { _id: string; first_name: string; last_name: string }[];
  setValue: UseFormSetValue<group>;
  groupData?: group;
}

const FormGroup = ({ register, errors, students , setValue , groupData }: Iprops) => {
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);


  useEffect(() => {
    if (groupData) {

      setValue("name", groupData.name);

      if (Array.isArray(groupData.students)) {

        const studentIds = groupData.students.map((student: any) => student._id);
        setSelectedStudents(studentIds); 
        setValue("students", studentIds);
      }
    }
  }, [groupData, setValue]);

  return (
    <div className="mb-12">
      <CustomFormInput
        label="Group Name"
        {...register("name", { required: getRequiredMessage("name") })}
        isError={errors?.name}
        errorMessage={errors?.name?.message}
        width="w-full"
        height="h-12"
        labelWidth="w-40"
      />

      <div className="flex items-center w-full mt-6 ">
        <label className="flex-shrink-0 p-2.5 border-y border-l border-[#0000004D] bg-linen rounded-l-lg font-bold w-40 sm:w-40">
          List Students
        </label>


        <Listbox 
          value={selectedStudents}
          {...register("students", { required: getRequiredMessage("students") })}
          onChange={(selected) => setSelectedStudents(selected)}
          multiple
        >
          <div className="relative flex-1">
            <Listbox.Button className="block w-full p-2.5 border-y border-r border-[#0000004D] rounded-r-lg text-left">
              {selectedStudents.length === 0
                ? <span className="text-gray-100">Select students</span>
                : selectedStudents
                    .map((id) =>
                      students.find((student) => student._id === id)?.first_name + " " + students.find((student) => student._id === id)?.last_name
                    )
                    .join(", ")}
            </Listbox.Button>

            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
              {students.map((student) => (
                <Listbox.Option
                  key={student._id}
                  value={student._id}
                  className={({ active }) =>
                    `cursor-pointer select-none p-2 ${active ? "bg-blue-500 text-white" : "text-black"}`
                  }
                >
                  {student.first_name} {student.last_name}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {errors.students && (
        <p className="text-red-500">{errors.students.message}</p>
      )}
    </div>
  );
};

export default FormGroup;
