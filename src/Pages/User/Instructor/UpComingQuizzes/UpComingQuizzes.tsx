import { Link } from "react-router-dom";
import { ArrowRight } from "../../../components/SvgIcons/SvgIcons";
import QuizCard from "./QuizCard";
import { useTopUpcomingQuizzesQuery } from "../../../../redux/apis/apis";
import Spinner from "../../../components/Spinner/Spinner";

export default function UpComingQuizzes() {
  const { isLoading, isError, data } = useTopUpcomingQuizzesQuery();
  console.log(data);
  return (
    <div className="border rounded-xl border-gray-300 p-4 w-full md:w-1/2 h-fit">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl font-bold"> Upcoming 5 quizzes</p>
        <Link to="/quzzies" className="text-sm flex items-center gap-x-1">
          Quiz directory <ArrowRight />
        </Link>
      </div>
      {isError && <h3>Something went wrong! Could not get Upcoming quizzes</h3>}
      {isLoading && <div className="flex w-full justify-center"><Spinner/></div>}
      {data && data?.map((quiz) => (
        <QuizCard
          title={quiz.title}
          schadule={quiz.schadule}
          participants={quiz.participants}
          key={quiz._id}
        />
      ))}
    </div>
  );
}
