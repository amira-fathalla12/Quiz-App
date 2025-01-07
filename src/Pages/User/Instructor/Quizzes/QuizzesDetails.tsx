import { Link, useParams } from "react-router-dom";
import {
  PencilIcon,
  RightArrowIcon,
} from "../../../components/SvgIcons/SvgIcons";
import {
  useAllGroupsQuery,
  useGetQuizQuery,
  useUpdateQuizMutation,
} from "../../../../redux/apis/apis";
import CustomFormSelect from "../../../components/CustomFormSelect/CustomFormSelect";
import { Controller, useForm } from "react-hook-form";
import { ApiError, Quiz } from "../../../../services/interfaces";
import { getRequiredMessage } from "../../../../services/validations";
import CustomFormInput from "../../../components/CustomFormInput/CustomFormInput";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import { twMerge } from "tailwind-merge";
import DateTimePicker from "react-datetime-picker";
import { useState } from "react";

export const QuizzesDetails = () => {
  const { id } = useParams();
  const { data: quiz, isLoading: isFetchingQuiz } = useGetQuizQuery(id!);
  const { data: groups, isLoading: isGroupsLoading } = useAllGroupsQuery();
  const [updateQuiz, { isLoading: isLoadingEdit }] = useUpdateQuizMutation();
  const [dateTime, setDateTime] = useState(new Date());

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Quiz>({ mode: "onChange" });

  const onSubmit = async (data: Quiz) => {
    console.log(quiz?.questions, "quiz?.question");
    try {
      const result = await updateQuiz({
        id: id ?? "",
        data: {
          ...data,
          title: quiz?.title ?? "",
        },
      }).unwrap();

      toast.success(result?.message || "Quiz updated successfully");
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <div
      className={twMerge(
        "ps-2",
        isFetchingQuiz ? "w-full" : "w-full sm:w-[45%] md:w-[55%] "
      )}
    >
      <div className="flex items-center gap-4 pt-5 pb-6">
        <Link
          to="/quzzies"
          className="font-medium  hover:underline underline-offset-2"
        >
          Quizzes
        </Link>
        <RightArrowIcon />
        <span className="font-medium underline underline-offset-2">
          {quiz?.title}
        </span>
      </div>
      {isFetchingQuiz && (
        <div className="text-center">
          <Spinner size="h-20 w-20" />
        </div>
      )}
      {quiz && (
        <div className="border border-black rounded-md p-5 ">
          <h1 className="text-2xl font-bold">{quiz?.title}</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 "
          >
            <div>
              <Controller
                name="schadule"
                control={control}
                defaultValue={quiz?.schadule || ""}
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
                    value={field.value || dateTime}
                    minDate={new Date()} // Disable previous days
                    className="block w-full font-bold"
                  />
                )}
              />
              {errors?.schadule && (
                <p className="text-red-500">
                  {errors?.schadule?.message?.toString()}
                </p>
              )}
            </div>

            <div className="w-[80%]">
              <CustomFormInput
                label="Duration"
                width="w-[35%]"
                labelWidth="w-48"
                register={register("duration", {
                  required: getRequiredMessage("Duration"),
                })}
                value={quiz?.duration.toString()}
                isError={errors?.duration}
                errorMessage={errors?.duration?.message}
              />
            </div>
            {/* <div className="w-[80%]">
              <CustomFormSelect
                label="No. of questions"
                width="w-[34%]"
                labelWidth="w-48"
                register={register("questions_number", {
                  required: getRequiredMessage("Questions No"),
                })}
                value={quiz?.questions_number}
                isError={errors?.questions_number}
                errorMessage={errors?.questions_number?.message}
                selectValues={Array.from(
                  { length: questions?.length ?? 0 },
                  (_, i) => (i + 1).toString()
                )}
              />
            </div> */}
            <div className="w-[80%] ">
              <CustomFormInput
                label="Score per question"
                width="w-[34%]"
                labelWidth="w-48"
                register={register("score_per_question", {
                  required: getRequiredMessage("Score"),
                })}
                value={quiz?.score_per_question.toString()}
                isError={errors?.score_per_question}
                errorMessage={errors?.score_per_question?.message}
              />
            </div>
            <div className="mb-2 w-[80%] flex flex-col overflow-hidden">
              <label
                className="flex-shrink-0 flex items-center p-2.5 pointer-events-none
              border  border-[#0000004D] bg-linen rounded-l-lg 
              rounded-r-lg rounded-b-none font-bold"
              >
                Description
              </label>
              <textarea
                className="block w-full p-2.5 border border-t-0 border-[#0000004D] 
                rounded-r-lg rounded-l-lg rounded-t-none resize-none"
                {...register("description")}
                name="description"
                value={quiz?.description}
              ></textarea>
            </div>
            {/* <div className="w-[80%]">
              <CustomFormSelect
                label="Difficulty level"
                width="w-[31.7%]"
                labelWidth="w-48"
                register={register("difficulty", {
                  required: getRequiredMessage("Difficulty"),
                })}
                value={quiz?.difficulty}
                isError={errors?.difficulty}
                errorMessage={errors?.difficulty?.message}
                selectValues={["easy", "medium", "hard"]}
              />
            </div>
            <div className="w-[80%]">
              <CustomFormSelect
                label="Category type"
                width="w-[31.7%]"
                labelWidth="w-48"
                register={register("type", {
                  required: getRequiredMessage("Type"),
                })}
                value={quiz?.type}
                isError={errors?.type}
                errorMessage={errors?.type?.message}
                selectValues={["FE", "BE", "DO"]}
              />
            </div> */}
            <div className="w-[80%]">
              <CustomFormSelect
                label="Group name"
                width="w-[31.7%]"
                labelWidth="w-48"
                register={register("group", {
                  required: getRequiredMessage("Group"),
                })}
                value={quiz?.group}
                isError={errors?.group}
                selectValues={
                  !isGroupsLoading ? groups?.map((group) => group.name) : []
                }
                selectType="group"
                groupValue={groups}
                errorMessage={errors?.group?.message}
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="font-bold bg-dark text-white 
              w-[100px] h-[30px] rounded-[10px]  flex items-center justify-center"
                disabled={isSubmitting || isLoadingEdit}
              >
                {isSubmitting || isLoadingEdit ? (
                  <Spinner size="h-3 w-3" color="border-white" />
                ) : (
                  <span className="flex items-center gap-2">
                    <PencilIcon />
                    Edit
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
