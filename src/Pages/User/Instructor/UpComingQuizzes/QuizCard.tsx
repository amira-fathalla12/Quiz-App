import { Link } from "react-router-dom";
import quizImg from "../../../../assets/Images/quiz-img.png";
import { CircleRightArrow } from "../../../components/SvgIcons/SvgIcons";
import {
  formatDate,
  formatTime,
} from "../../../../helperFunctions/helperFunctions";
import { twMerge } from "tailwind-merge";

export interface QuizCardInterface {
  title: string;
  schadule: string;
  participants: number;
  id: string;
  role: string;
}

export default function QuizCard({
  title,
  schadule,
  participants,
  id,
  role,
}: QuizCardInterface) {
  const date = formatDate(schadule);
  const time = formatTime(schadule);

  return (
    <div className="flex mb-5 border rounded-xl border-gray-300 w-full">
      <img src={quizImg} />
      <div className="px-4 py-6 w-full">
        <p className="font-bold text-lg">{title}</p>
        <p className="text-sm">
          {date}{" "}
          <span className="border-l border-gray-300 pl-3 ml-3">{time}</span>
        </p>
        <div
          className={twMerge(
            `${role === "Student" ? "mt-0" : " mt-5"}`,
            "flex flex-wrap justify-between items-center "
          )}
        >
          {role !== "Student" && (
            <p className="text-sm font-bold">
              No. of students enrolled: {participants}
            </p>
          )}

          <Link
            to={role === "Instructor" ? `/quzziesDetails/${id}` : `/exam-questions/${id}`}
            className={twMerge(
              `${role === "Student" && "flex w-full justify-end"}`,
              `flex items-center gap-x-1`
            )}
          >
            Open <CircleRightArrow />
          </Link>
        </div>
      </div>
    </div>
  );
}
