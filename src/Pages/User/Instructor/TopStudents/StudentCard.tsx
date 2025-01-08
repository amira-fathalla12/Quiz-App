import { useState } from "react";
import user1 from "../../../../assets/Images/user1.png";
import user2 from "../../../../assets/Images/user2.png";
import user3 from "../../../../assets/Images/user3.png";
import user4 from "../../../../assets/Images/user4.png";
import user5 from "../../../../assets/Images/user5.png";
import { CircleArrowRight } from "lucide-react";
import { Student } from "../../../../services/interfaces";
import StudentModalDetails from "./StudentModalDetails";

interface IProps {
  student: Student;
  index: number;
}

export default function StudentCard({ student, index }: IProps) {
  const userImages = [user1, user2, user3, user4, user5];
  const selectedImage = userImages[index % userImages.length];
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => setOpenModal(true);

  const handelCloseModle = () => setOpenModal(false);

  return (
    <>
      <StudentModalDetails
        handelCloseModle={handelCloseModle}
        openModal={openModal}
        student={student}
      />

      <div className="w-full mt-5">
        <div className="flex h-[70px] border border-gray-300 rounded-[10px]">
          <div className="w-[70px] h-full rounded-[10px] bg-[#FFEDDF] flex-shrink-0">
            <img
              className="w-full h-full object-cover"
              src={selectedImage}
              alt="User"
            />
          </div>

          <div className="flex items-center justify-between w-full px-3">
            <div>
              <h6 className="text-lg font-bold">{`${student.first_name} ${student.last_name}`}</h6>
              <div className="flex gap-[10px]">
                <p className="font-normal text-xs">
                  Class rank: {student?.group?.name}
                </p>
                <p className="font-normal text-xs">|</p>
                <p className="font-normal text-xs">
                  Average score: {Math.floor(student.avg_score) * 10}%
                </p>
              </div>
            </div>
            <button onClick={handleOpenModal}>
              <CircleArrowRight size={30} color="#0D1321" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
