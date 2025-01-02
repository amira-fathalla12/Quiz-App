import { Link } from "react-router-dom";
import { ArrowRight } from "../../../components/SvgIcons/SvgIcons";
import StudentCard from "./StudentCard";
import { useTopStudentsQuery } from "../../../../redux/apis/apis";
import Spinner from "../../../components/Spinner/Spinner";

export default function TopStudents() {
  const { isLoading, isError, data } = useTopStudentsQuery();
  console.log(data);
  return (
    <div className="border rounded-xl border-gray-300 p-4 w-full md:w-1/2 h-fit">
      <div className="flex justify-between items-center mb-5">
        <p className="text-xl font-bold"> Top 5 students</p>
        <Link to="/students" className="text-sm flex items-center gap-x-1">
          All Students <ArrowRight />
        </Link>
      </div>
      {isError && (
        <h3>Something went wrong! Could not get top five students</h3>
      )}
      {isLoading && (
        <div className="flex w-full justify-center">
          <Spinner />
        </div>
      )}
      {data &&
        data?.map((student) => (
          <StudentCard
            key={student._id}
            firstName={student.first_name}
            lastName={student.last_name}
            avgScore={student.avg_score}
          />
        ))}
    </div>
  );
}
