import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../../components/ModalForm/ModalForm";
import QuizForm from "../QuizForm/QuizForm";
import CodeModal from "../CodeModal/CodeModal";
import { useForm } from "react-hook-form";
import { Quiz } from "../../../../services/interfaces";
import {
  useAddQuizMutation,
  useJoinQuizMutation,
} from "../../../../redux/apis/apis"; // Import API mutations
import JoinQuizModel from "../JoinQuizModel/JoinQuizModel";

const CustomQuizesTab = ({
  icon,
  label,
  border,
  role,
}: {
  icon: React.ReactNode;
  label: string;
  border: string;
  role?: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);
  const [isJoinQuizModalOpen, setIsJoinQuizModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [addQuiz, { isLoading }] = useAddQuizMutation();
  const [joinQuiz] = useJoinQuizMutation(); // Import joinQuiz mutation
  

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Quiz>({ mode: "onChange" });

  const handleClick = () => {
    if (label === "Question Bank") {
      navigate("/questions");
    } else if (label === "Join Quiz") {
      setIsJoinQuizModalOpen(true);
    } else {
      setIsModalOpen(!isModalOpen);
    }
  };

  const handleOpenModal = () => {
    reset();
    setIsModalOpen(!isModalOpen);
  };

  const handleOpenCodeModal = () => {
    setIsCodeModalOpen(!isCodeModalOpen);
  };

  const handleAddQuiz = async (data: Quiz) => {
    try {
      const result = await addQuiz(data).unwrap();
      handleOpenModal();
      setCode(result?.data?.code);
      if (pathname === "/quzzies") {
        setIsCodeModalOpen(true);
      }
    } catch (error) {
      console.error("Failed to add quiz:", error);
    }
  };

  // Modify: handleJoinQuiz now accepts 'code' (string)
  const handleJoinQuiz = async (data: string) => {
    try {
      const result = await joinQuiz({ data
  
       }).unwrap(); // Call the API with code
      if (result?.success) {
        navigate(`exam-questions`);
      }
    } catch (error) {
      console.error("Failed to join quiz:", error);
    }
  };

  return (
    <>
      <div
        onClick={handleClick}
        className={`bg-white border w-[200px] h-[150px] rounded-lg cursor-pointer
         flex flex-col space-y-2 justify-center items-center  ${border}`}
      >
        <div className={`${label === "Sign up" && "pl-3"}`}>{icon}</div>
        <span className="font-bold text-xl">{label}</span>
      </div>
      <div className="flex justify-center items-center bg-red-200 ">
        <Modal
          isOpen={isModalOpen}
          closeModal={handleOpenModal}
          title="Set up a new quiz"
          handleSubmitQuiz={handleSubmit}
          onSubmit={handleAddQuiz}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          formType={"quiz"}
        >
          {role === "Instructor" && (
            <QuizForm register={register} errors={errors} control={control} />
          )}
        </Modal>
        <CodeModal
          openModal={isCodeModalOpen}
          setOpenModal={handleOpenCodeModal}
          title="Quiz was successfully created"
          code={code}
        />
        <JoinQuizModel
          openModal={isJoinQuizModalOpen}
          setOpenModal={() => setIsJoinQuizModalOpen(!isJoinQuizModalOpen)}
          title="Join a Quiz"
          onJoin={handleJoinQuiz} // يتم تمرير دالة handleJoinQuiz كما هي
        />
      </div>
    </>
  );
};

export default CustomQuizesTab;
