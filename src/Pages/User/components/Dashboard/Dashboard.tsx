import { useAppSelector } from "../../../../redux/store";
import TopStudents from "../../Instructor/TopStudents/TopStudents";
import UpComingQuizzes from "../../Instructor/UpComingQuizzes/UpComingQuizzes";

export const Dashboard = () => {
    const { user } = useAppSelector((state) => state.user);
    
  
  return (
    <div className="flex flex-col md:flex-row gap-x-8 p-5 justify-center gap-y-8">

      {
        user!.role == 'Instructor' ?    <>
           <UpComingQuizzes />


<TopStudents />
        </>
:   <UpComingQuizzes /> 
      }
   
    </div>
  );
};
