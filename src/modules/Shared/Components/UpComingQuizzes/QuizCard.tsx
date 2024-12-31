import { Link } from "react-router-dom";
import quizImg from "../../../../assets/Images/quiz-img.png";
import { CircleRightArrow } from "../SvgIcons/SvgIcons";

export default function QuizCard() {
  return (
    <div className="flex mb-5 border rounded-xl border-gray-300 w-full">
      <img src={quizImg} />
      <div className="px-4 py-6">
        <p className="font-bold text-lg">
          Introduction to computer programming
        </p>
        <p className="text-sm">
          12 / 03 / 2023{" "}
          <span className="border-l border-gray-300 pl-3 ml-3">09:00 AM</span>
        </p>
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm font-bold">No. of students enrolled: 32</p>
          <Link to="/quzziesDetails/:id" className="flex items-center gap-x-1">
            Open
            <CircleRightArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
