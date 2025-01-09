import { useEffect, useState } from "react";
import StudentCardSkeleton from "../Instructor/TopStudents/StudentCardSkeleton";
import StudentCard from "../Instructor/TopStudents/StudentCard";
import { useAllStudentsQuery } from "../../../redux/apis/apis";

export default function StudentsList() {
  const { isLoading, isError, data } = useAllStudentsQuery();
  
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Handle error state
  useEffect(() => {
    if (isError) {
      // Optionally handle error (e.g., toast.error or display a message)
    }
  }, [isError]);

  // Filter students based on the search query
  const filteredStudents = data?.filter((student) => {
    const fullName = `${student.first_name} ${student.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <div className="border p-7 min-h-[38rem] m-5 rounded-xl">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl">Students list</h3>
        </div>

        <div className="mt-8 mb-3">
          <div className="flex flex-col gap-1">
            <div className="relative w-full">
              <input
                type="text"
                className={`w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[6rem] py-2 focus:border-[#C5D86D] focus:outline-none focus:ring-1 focus:ring-[#C5D86D]`}
                placeholder="Search by first name or last name"
                onChange={handleSearchChange}
              />
              <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                Search:
              </label>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
          {isLoading ? (
            Array.from({ length: 15 }, (_, index) => <StudentCardSkeleton key={index} />)
          ) : filteredStudents && filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <StudentCard student={student} index={index} key={index} />
            ))
          ) : (
            <p>No students found</p>
          )}
        </div>
      </div>
    </>
  );
}
