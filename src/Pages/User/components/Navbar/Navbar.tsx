import { useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { AlarmIcon } from "../../../components/SvgIcons/SvgIcons";
import Modal from "../../../components/ModalForm/ModalForm";
import QuizForm from "../QuizForm/QuizForm";
import { useForm } from "react-hook-form";
import { useAddQuizMutation } from "../../../../redux/apis/apis";
import { useState } from "react";
import CodeModal from "../CodeModal/CodeModal";
import { Quiz } from "../../../../services/interfaces";
import { useAppSelector } from "../../../../redux/store";

export const Navbar = () => {
  const { user } = useAppSelector((state) => state.user);
  
  const { pathname } = useLocation();
  const [code, setCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  const navTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/students":
        return "Students";
      case "/groups":
        return "Groups";
      case "/result-list":
        return "Results";
      case "/quzzies":
        return "Quizzes";
      case "/questions":
        return "Questions";
      default:
        return "Dashboard";
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Quiz>({
    mode: "onChange",
  });
  const [addQuiz, { isLoading }] = useAddQuizMutation();

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
      setIsCodeModalOpen(true);
    } catch (error) {
      console.error("Failed to add quiz:", error);
    }
  };

  return (
    <div className="flex p-4  items-center justify-between border-b border-gray-300">
      <p className="text-xl font-bold">{navTitle()}</p>


      <div className="flex gap-2 items-center ">
     {
      user!.role ==  'Instructor' ?    <button
      className="flex gap-2 items-center border-2 border-gray-300 
     px-5 py-2 rounded-3xl cursor-pointer"
      onClick={handleOpenModal}
    >
      <span className="sr-only">Add quiz</span>

      <AlarmIcon />
      <p>New quiz</p>
    </button> : ''
     }
        <DropdownMenu />
      </div>
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
        <QuizForm register={register} errors={errors} control={control} />
      </Modal>
      <CodeModal
        openModal={isCodeModalOpen}
        setOpenModal={handleOpenCodeModal}
        title="Quiz was successfully created"
        code={code}
      />
    </div>
  );
};
