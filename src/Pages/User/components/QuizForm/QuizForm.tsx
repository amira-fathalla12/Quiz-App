import { getRequiredMessage } from "../../../../services/validations";
import CustomFormInput from "../../../components/CustomFormInput/CustomFormInput";
import CustomFormSelect from "../../../components/CustomFormSelect/CustomFormSelect";
import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Quiz } from "../../../../services/interfaces";
import CustomDateTimePicker from "../CustomDateTimePicker/CustomDateTimePicker";
import {
  useAllGroupsQuery,
  useAllQuestionsQuery,
} from "../../../../redux/apis/apis";

interface Props {
  register: UseFormRegister<Quiz>;
  errors: FieldErrors<Quiz>;
  control: Control<Quiz>;
}

const QuizForm = ({ register, errors, control }: Props) => {
  const { data: groups, isLoading: isGroupsLoading } = useAllGroupsQuery();
  const { data: questions } = useAllQuestionsQuery();

  return (
    <>
      <h3 className="mb-2 font-medium text-lg">Details</h3>
      <div className="flex flex-col gap-2">
        <CustomFormInput
          label="Title:"
          width="w-full"
          height="h-10"
          {...register("title", {
            required: getRequiredMessage("Title"),
          })}
          isError={errors?.title}
          errorMessage={errors?.title?.message}
          name="title"
        />
        <div className="flex flex-wrap gap-3">
          <CustomFormInput
            label="Duration"
            width="w-full sm:w-[35.5%]"
            height="h-10"
            labelWidth="w-40"
            {...register("duration", {
              required: getRequiredMessage("Duration"),
            })}
            isError={errors?.duration}
            errorMessage={errors?.duration?.message}
            name="duration"
          />
          <CustomFormSelect
            label="No. of questions"
            slotProps={{
              inputProps: {
                className: "w-full sm:w-[30%]",
                defaultValue: "",
              },
            }}
            labelWidth="w-44"
            {...register("questions_number", {
              required: getRequiredMessage("Questions No"),
            })}
            isError={errors?.questions_number}
            errorMessage={errors?.questions_number?.message}
            selectValues={Array.from(
              { length: questions?.length ?? 0 },
              (_, i) => (i + 1).toString()
            )}
          />
          <CustomFormInput
            label="Score per question"
            width="w-full sm:w-[30.5%]"
            height="h-10"
            labelWidth="w-40"
            {...register("score_per_question", {
              required: getRequiredMessage("Score"),
            })}
            isError={errors?.score_per_question}
            errorMessage={errors?.score_per_question?.message}
            name="score_per_question"
          />
        </div>
        <div className="mb-2 w-full flex overflow-hidden">
          <label
            className="flex-shrink-0 flex items-center p-2.5 pointer-events-none 
           border-y border-l border-[#0000004D] bg-linen rounded-l-lg 
           font-bold text-sm sm:text-base"
          >
            Description
          </label>
          <textarea
            className="block w-full p-2.5 border-y border-r border-[#0000004D] 
            rounded-r-lg resize-none "
            {...register("description")}
            name="description"
          ></textarea>
        </div>
        <CustomDateTimePicker
          label="Schadule"
          width="w-full"
          control={control}
          isError={errors?.schadule}
          errorMessage={errors?.schadule?.message}
        />
        <div className="flex flex-wrap gap-4 ">
          <CustomFormSelect
            label="Difficulty level"
            slotProps={{
              inputProps: {
                className: "w-full sm:w-[31.7%] ",
                defaultValue: "",
              },
            }}
            labelWidth="w-44"
            {...register("difficulty", {
              required: getRequiredMessage("Difficulty"),
            })}
            isError={errors?.difficulty}
            errorMessage={errors?.difficulty?.message}
            selectValues={["easy", "medium", "hard"]}
          />
          <CustomFormSelect
            label="Category type"
            slotProps={{
              inputProps: {
                className: "w-full sm:w-[31.7%] ",
                defaultValue: "",
              },
            }}
            labelWidth="w-44"
            {...register("type", {
              required: getRequiredMessage("Type"),
            })}
            isError={errors?.type}
            errorMessage={errors?.type?.message}
            selectValues={["FE", "BE", "DO"]}
          />
          <CustomFormSelect
            label="Group name"
            slotProps={{
              inputProps: {
                className: "w-full sm:w-[31.7%] ",
                defaultValue: "",
              },
            }}
            labelWidth="w-44"
            {...register("group", {
              required: getRequiredMessage("Group"),
            })}
            isError={errors?.group}
            selectValues={
              !isGroupsLoading ? groups?.map((group) => group.name) : []
            }
            selectType="group"
            groupValue={groups}
            errorMessage={errors?.group?.message}
          />
        </div>
      </div>
    </>
  );
};

export default QuizForm;
