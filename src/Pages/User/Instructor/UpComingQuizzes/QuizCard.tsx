import { Link } from "react-router-dom";
import quizImg from "../../../../assets/Images/quiz-img.png";
import { CircleRightArrow } from "../../../components/SvgIcons/SvgIcons";
import { formatDate, formatTime } from "../../../../helperFunctions/helperFunctions";

export interface QuizCardInterface {
  title: string;
  schadule: string;
  participants: number;
}

export default function QuizCard({
  title,
  schadule,
  participants,
}: QuizCardInterface) {
  let date = formatDate(schadule)
  let time = formatTime(schadule)
  console.log(date , time)
  return (
    <div className="flex mb-5 border rounded-xl border-gray-300 w-full">
      <img src={quizImg} />
      <div className="px-4 py-6">
        <p className="font-bold text-lg">
          {title}
        </p>
        <p className="text-sm">
         {date}{" "}
          <span className="border-l border-gray-300 pl-3 ml-3">{time}</span>
        </p>
        <div className="flex items-center justify-between mt-5">
          <p className="text-sm font-bold">No. of students enrolled: {participants}</p>
          <Link to="/quzziesDetails/:id" className="flex items-center gap-x-1">
            Open
            <CircleRightArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
