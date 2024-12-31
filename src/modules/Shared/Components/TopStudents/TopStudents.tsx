import { Link } from "react-router-dom";
import { ArrowRight } from "../SvgIcons/SvgIcons";
import StudentCard from "./StudentCard";

export default function TopStudents() {
  return (
    <div className="border rounded-xl border-gray-300 p-4 w-full md:w-1/2 h-fit">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl font-bold"> Top 5 students</p>
        <Link to="/students" className="text-sm flex items-center gap-x-1">
          All Students <ArrowRight />
        </Link>
      </div>
      <StudentCard />
      <StudentCard />
      <StudentCard />
      <StudentCard />
      <StudentCard />
    </div>
  );
}
