import { useTopUpcomingQuizzesQuery } from "../../../../redux/apis/apis";
import Spinner from "../../../components/Spinner/Spinner";
import QuizCard from "../UpComingQuizzes/QuizCard";

const Comingquizes = ({ role }: { role: string }) => {
  const { isLoading, isError, data } = useTopUpcomingQuizzesQuery();
  const tableData = data?.slice(0, 3);
  return (
    <div className="border  border-gray-300 p-4 w-full mb-2 h-fit">
      <div className="mb-5">
        <p className="text-xl font-bold"> Upcoming 5 quizzes</p>
      </div>
      {isError && <h3>Something went wrong! Could not get Upcoming quizzes</h3>}
      {isLoading && (
        <div className="flex w-full justify-center">
          <Spinner />
        </div>
      )}
      {tableData &&
        tableData?.map((quiz) => (
          <QuizCard
            title={quiz.title}
            schadule={quiz.schadule}
            participants={quiz.participants}
            key={quiz._id}
            id={quiz._id}
            role={role}
            code={quiz?.code}
          />
        ))}
    </div>
  );
};

export default Comingquizes;
