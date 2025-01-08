import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
import { Student } from "../../../../services/interfaces";

import { CheckCircle, Loader, XCircle } from "lucide-react";

interface Props {
  handelCloseModle: () => void;
  openModal: boolean;
  student: Student;
}

export default function StudentModalDetails({
  handelCloseModle,
  openModal,
  student,
}: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (openModal) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [openModal]);

  return (
    <Modal show={openModal} className="max-w-[600px] mx-auto pt-8" onClose={handelCloseModle} popup>
      <div className="flex justify-between border-b items-center">
        <h5 className="font-bold text-xl leading-6 p-5">Student Details</h5>
        <button
          type="button"
          className="text-2xl font-extrabold border-l py-5 w-[80px]"
          onClick={handelCloseModle}
        >
          ✗
        </button>
      </div>
      <Modal.Body className="my-10 flex flex-col gap-4">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <Loader className="loader-spin" color="#C5D86D" size={100} />
          </div>
        ) : (
          <>
            <div className="relative w-full col-span-1 md:col-span-2 flex gap-4">
              <div className="w-full relative">
                <div className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[8.2rem] py-2">
                  {student?.first_name}
                </div>
                <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                  First Name:
                </label>
              </div>
              <div className="w-full relative">
                <div className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[8.2rem] py-2">
                  {student?.last_name}
                </div>
                <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                  Last Name:
                </label>
              </div>
            </div>

            <div className="relative w-full col-span-1">
              <div className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[6rem] py-2">
                {student?.email}
              </div>
              <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                Email:
              </label>
            </div>

            <div className="relative w-full col-span-1">
              <div className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[6rem] py-2">
                {student?.group?.name}
              </div>
              <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                Group:
              </label>
            </div>

            <div className="relative w-full col-span-1 flex items-center">
              <div className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-lg border border-slate-400 rounded-md pr-3 pl-[6rem] py-2 flex justify-between items-center">
                <span>{student.status || "N/A"}</span>
                {student.status === "active" ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <XCircle className="text-red-500" />
                )}
              </div>
              <label className="font-extrabold absolute left-2 top-[0.5rem] text-black bg-[#FFEDDF] py-1 px-3 rounded-lg">
                Status:
              </label>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}