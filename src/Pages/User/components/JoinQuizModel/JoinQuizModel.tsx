import { Button, Modal, TextInput } from "flowbite-react";
import { CheckIcon } from "../../../components/SvgIcons/SvgIcons";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

type Props = {
  openModal: boolean;
  setOpenModal: () => void;
  title: string;
  onJoin: (code:string) => void;
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
              <div className="text-4xl">
                <CheckIcon width={"60"} height={"60"} />
              </div>
              <h3 className="text-xl font-bold text-black">{title}</h3>
              <TextInput
                type="text"
                placeholder="Enter your code here"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-[300px] h-10 border border-black rounded-full px-4 text-center text-xl"
              />
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button
                onClick={handleJoin}
                className="w-36 h-9 text-gray-700 bg-olive hover:bg-gray-300 rounded-full text-lg"
              >
                Join
              </Button>
              ;
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default JoinQuizModel;
