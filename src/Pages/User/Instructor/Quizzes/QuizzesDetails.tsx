import { Link, useNavigate, useParams } from "react-router-dom";
import {
  PencilIcon,
  RightArrowIcon,
} from "../../../components/SvgIcons/SvgIcons";
import {
  useAllGroupsQuery,
  useGetQuizQuery,
  useTopUpcomingQuizzesQuery,
  useUpdateQuizMutation,
} from "../../../../redux/apis/apis";
import CustomFormSelect from "../../../components/CustomFormSelect/CustomFormSelect";
import { Controller, useForm } from "react-hook-form";
import { Quiz } from "../../../../services/interfaces";
import { getRequiredMessage } from "../../../../services/validations";
import CustomFormInput from "../../../components/CustomFormInput/CustomFormInput";
import Spinner from "../../../components/Spinner/Spinner";
import { twMerge } from "tailwind-merge";
import DateTimePicker from "react-datetime-picker";
import { useState } from "react";

export const QuizzesDetails = () => {
  const { id } = useParams();
  const {
    data: quiz,
    isLoading: isFetchingQuiz,
    refetch: refetchQuiz,
  } = useGetQuizQuery(id!);
  const { data: groups, isLoading: isGroupsLoading } = useAllGroupsQuery();
  const { refetch } = useTopUpcomingQuizzesQuery();
  const [updateQuiz, { isLoading: isLoadingEdit }] = useUpdateQuizMutation();
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Quiz>({ mode: "onChange" });

  const onSubmit = async (data: Quiz) => {
    try {
      await updateQuiz({
        id: id ?? "",
        data: {
          ...data,
          title: quiz?.title ?? "",
        },
      });
      await refetch();
      await refetchQuiz();
      navigate(-1);
    } catch (error) {
      console.error("Failed to add quiz:", error);
    }
  };

  return (
    <div
      className={twMerge(
        "ps-2",
        isFetchingQuiz ? "w-full" : "w-[95%] sm:w-[45%] md:w-[55%] "
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
        <div className="border border-black rounded-md p-5 md:w-[23rem]  xl:w-full ">
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
                width="w-full"
                labelWidth="w-40"
                {...register("duration", {
                  required: getRequiredMessage("Duration"),
                  valueAsNumber: true,
                })}
                defaultValue={quiz?.duration.toString()}
                isError={errors?.duration}
                errorMessage={errors?.duration?.message}
              />
            </div>

            <div className="w-[80%]">
              <CustomFormInput
                label="Score per question"
                width="w-full"
                labelWidth="w-40"
                {...register("score_per_question", {
                  required: getRequiredMessage("Score"),
                })}
                defaultValue={quiz?.score_per_question.toString()}
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
                defaultValue={quiz?.description}
              ></textarea>
            </div>
            <div className="w-[80%]">
              <CustomFormSelect
                label="Group name"
                slotProps={{
                  inputProps: {
                    className: "w-full",
                    defaultValue: quiz?.group,
                  },
                }}
                labelWidth="w-48"
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
