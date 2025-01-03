import quizImg from "../../../../assets/Images/quiz-img.png";
import { Link } from "react-router-dom";

export interface StudentCardInterface {
  firstName: string;
  lastName: string;
  avgScore: number;
}
export default function StudentCard({
  firstName,
  lastName,
  avgScore,
}: StudentCardInterface) {
  const percentage = (avgScore * 10).toFixed(2);
  return (
    <div className="flex mb-5 border rounded-xl border-gray-300 w-full">
      <img src={quizImg} width={70} height={70} />
      <div className="px-4 py-6 flex justify-between items-center w-full">
        <div>
          <p className="font-bold text-lg">
            {firstName} {lastName}
          </p>
          <p className="text-sm text-gray-500">
            Class rank: 2nd{" "}
            <span className="border-l border-gray-300 pl-3 ml-3">
              Average score: {percentage}%
            </span>
          </p>
        </div>
        <Link to="/studentsDetails/:id">
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 0C15.5242 0 20 4.47581 20 10C20 15.5242 15.5242 20 10 20C4.47581 20 0 15.5242 0 10C0 4.47581 4.47581 0 10 0ZM8.83468 5.79032L11.879 8.70968H4.51613C3.97984 8.70968 3.54839 9.14113 3.54839 9.67742V10.3226C3.54839 10.8589 3.97984 11.2903 4.51613 11.2903H11.879L8.83468 14.2097C8.44355 14.5847 8.43548 15.2097 8.81855 15.5927L9.2621 16.0323C9.64113 16.4113 10.254 16.4113 10.629 16.0323L15.9798 10.6855C16.3589 10.3065 16.3589 9.69355 15.9798 9.31855L10.629 3.96371C10.25 3.58468 9.6371 3.58468 9.2621 3.96371L8.81855 4.40323C8.43548 4.79032 8.44355 5.41532 8.83468 5.79032Z"
              fill="#0D1321"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
