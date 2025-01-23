import { useNavigate, useParams } from "react-router-dom";
import {
  useGetQuizWithoutAnswersQuery,
  useSubmitQuizAnswersMutation,
} from "../../../redux/apis/apis";
import Spinner from "../Spinner/Spinner";
import { useForm, FieldValues } from "react-hook-form";
import { QuizQuestion } from "../../../services/interfaces";

export default function ExamQuestions() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data,
    isLoading: isFetchingQuiz,
    error,
  } = useGetQuizWithoutAnswersQuery(id || "");

  const quiz = data?.data;

  const [submitQuizAnswers] = useSubmitQuizAnswersMutation();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<FieldValues>();

  const onSubmitHandler = async (formData: Record<string, string>) => {
    const selectedAnswers = {
      answers: Object.entries(formData).map(([question, answer]) => ({
        question,
        answer,
      })),
    };

    try {
      const response = await submitQuizAnswers({
        id: id || "",
        data: selectedAnswers,
      }).unwrap();

      navigate("/result-list", { state: { score: response?.data?.score } });
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  };

  const formValues = watch();
  const allQuestionsAnswered =
    quiz?.questions.every(
      (question: QuizQuestion) => formValues[question._id]
    ) || false;

  const questionsList = quiz?.questions.map((question, i) => {
    const options = Object.entries(question.options).slice(0, 4);
    return (
      <div
        key={question._id}
        className="w-[40%] border-black border-2 rounded-md p-2"
      >
        <p className="font-semibold text-base">
          {`${i + 1}- `} {question.title}
        </p>
        {options.map(([key, option], idx) => {
          const optionLabel = String.fromCharCode(65 + idx);
          return (
            <div key={key}>
              <input
                type="radio"
                id={`${question._id}-${optionLabel}`}
                value={optionLabel}
                {...register(question._id, {
                  required: "Please select an answer",
                })}
              />
              <label
                htmlFor={`${question._id}-${optionLabel}`}
                className="ps-1 font-medium"
              >
                {`${optionLabel}. ${option}`}
              </label>
            </div>
          );
        })}
      </div>
    );
  });

  if (!id) {
    return <div>Error: Quiz ID is missing.</div>;
  }

  if (isFetchingQuiz) {
    return (
      <div className="text-center pt-6">
        <Spinner size="h-20 w-20" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading quiz. Please try again later.</div>;
  }

  if (!quiz) {
    return <div>No quiz found.</div>;
  }

  return (
    <div className="mt-4 px-10">
      <h1 className="font-extrabold">{quiz?.title}</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="flex flex-wrap justify-center gap-4">
          {questionsList}
        </div>
        <button
          className={`text-gray-700 py-2 px-4 bg-olive rounded-md text-lg block mt-4 mx-auto ${
            !allQuestionsAnswered || isSubmitting
              ? "opacity-50 disabled:submitBtnDisabled"
              : ""
          }`}
          type="submit"
          disabled={!allQuestionsAnswered || isSubmitting}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
