import TopStudents from "../../Instructor/TopStudents/TopStudents";
import UpComingQuizzes from "../../Instructor/UpComingQuizzes/UpComingQuizzes";

export const Dashboard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-x-8 p-5 justify-center gap-y-8">
      <UpComingQuizzes />
      <TopStudents />
    </div>
  );
};
