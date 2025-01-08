import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import StudentCard from "./StudentCard";
import Skeleton from "react-loading-skeleton";
import StudentCardSkeleton from "./StudentCardSkeleton";
import { toast } from "react-toastify";
import { useTopStudentsQuery } from "../../../../redux/apis/apis";
import { useEffect } from "react";

export default function TopFiveStudents() {
  const { isLoading, isError, data } = useTopStudentsQuery();
  const arr = [1, 2, 3, 4, 5];

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred while fetching top students");
    }
  }, [isError]);

  return (
    <div className="w-full p-3 border-[1px] border-gray-300 rounded-[10px] lg:min-h-[607px]">
      <div className="flex justify-between items-center">
        {isLoading ? (
          <>
            <Skeleton count={1} height={24} width={200} />
            <Skeleton count={1} height={18} width={100} />
          </>
        ) : (
          <>
            <h6 className="text-xl font-medium">Top 5 Students</h6>
            <Link
              to="/dashboard/Students"
              className="flex gap-1 items-center font-normal text-xs"
            >
              All Students
              <MoveRight color="#C5D86D" height={"30px"} width={"18.31px"} />
            </Link>
          </>
        )}
      </div>

      <div>
        {isLoading ? (
          arr.map((index) => <StudentCardSkeleton key={index} />)
        ) : data?.length ? (
          data.map((student, index) => (
            <StudentCard student={student} index={index} key={index} />
          ))
        ) : (
          <p>No top students found</p>
        )}
      </div>
    </div>
  );
}
