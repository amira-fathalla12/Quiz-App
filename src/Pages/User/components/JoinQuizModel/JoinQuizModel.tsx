import { Button, Modal, TextInput } from "flowbite-react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type Props = {
  openModal: boolean;
  setOpenModal: () => void;
  title: string;
  onJoin: (code: string) => void;
};

const JoinQuizModel = ({ openModal, setOpenModal, title, onJoin }: Props) => {
  const [code, setCode] = useState("");

  const handleJoin = async () => {
    if (code.trim() === "") {
      toast.error("Code cannot be empty!");
      return;
    }
    try {
      await onJoin(code); // Passing the code to joinQuiz
      
    } catch (error) {
      console.error("Error while joining quiz:", error);
    }
  };

  return (
    <div
      className={twMerge(
        `fixed inset-0 flex items-center justify-center`,
        openModal ? "bg-black/30 z-10" : "hidden"
      )}
    >
      <Modal
        show={openModal}
        className="mx-auto h-fit my-auto w-fit border-0 z-20"
        popup
      >
        <Modal.Header onClick={() => setOpenModal()} />
        <Modal.Body className="">
          <div className="flex flex-col w-[370px] justify-center items-center text-center">
            {/* Content */}
            <div className="flex flex-col gap-2 items-center pb-11 font-Inter">
              <h3 className="text-xl font-bold text-black">{title}</h3>
              <p className="text-gray-500 mb-4">
                Input the code received for the quiz below to join
              </p>
              <div className="flex justify-between items-center w-[300px] h-10 rounded-full border border-black bg-linen overflow-hidden">
                {/* Label Code */}
                <span className="font-bold text-lg bg-linen px-4 py-1 rounded-l-full">
                  CODE:
                </span>
                {/* Text Input Field */}
                <TextInput
                  type="text"
                  placeholder="Enter your code here"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 bg-transparent font-bold text-lg px-3 outline-none focus:ring-2 focus:ring-olive"
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={handleJoin}
                className="w-36 h-9  text-gray-700 py-0
                bg-olive hover:bg-gray-300 rounded-full text-lg"
              >
                Join
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JoinQuizModel;
