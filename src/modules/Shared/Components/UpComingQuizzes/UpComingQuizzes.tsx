import { Link } from "react-router-dom";
import { ArrowRight } from "../SvgIcons/SvgIcons";
import QuizCard from "./QuizCard";

export default function UpComingQuizzes() {
  return (
    <div className="border rounded-xl border-gray-300 p-4 w-full md:w-1/2 h-fit">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl font-bold"> Upcoming 5 quizzes</p>
        <Link to="/quzzies" className="text-sm flex items-center gap-x-1">
          Quiz directory <ArrowRight />
        </Link>
      </div>
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
    </div>
  );
}
