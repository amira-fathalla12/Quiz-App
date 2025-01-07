import { useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { AlarmIcon } from "../../../components/SvgIcons/SvgIcons";
import Modal from "../../../components/ModalForm/ModalForm";
import QuizForm from "../QuizForm/QuizForm";
import { useForm } from "react-hook-form";
import { ApiError, Quiz } from "../../../../services/interfaces";
import { toast } from "react-toastify";
import { useAddQuizMutation } from "../../../../redux/apis/apis";
import { useAppDispatch, useAppSelector } from "../../../../redux/store";
import { openCodeModal, openModal } from "../../../../redux/slices/modalSlice";
import { useState } from "react";
import CodeModal from "../CodeModal/CodeModal";

export const Navbar = () => {
  const { pathname } = useLocation();
  const [code, setCode] = useState("");
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.modal.isOpen);
  const isCodeModalOpen = useAppSelector(
    (state) => state.modal.isCodeModalOpen
  );
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
  } = useForm<Quiz>({ mode: "onChange" });
  // const { isLoading, isError, data, refetch } = useAllQuizesQuery();
  const [addQuiz, { isLoading }] = useAddQuizMutation();

  const handleOpenModal = () => {
    reset();
    dispatch(openModal());
  };
  const handleOpenCodeModal = () => {
    dispatch(openCodeModal());
  };

  const handleAddQuestion = async (data: Quiz) => {
    try {
      const result = await addQuiz(data).unwrap();
      console.log(result);
      handleOpenModal();
      // refetch();
      toast.success(result?.message || "Quiz created successfully");
      setCode(result?.data?.code);
      dispatch(openCodeModal());
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="flex p-4  items-center justify-between border-b border-gray-300">
      <p className="text-xl font-bold">{navTitle()}</p>

      <div className="flex gap-2 items-center ">
        <div
          className="flex gap-2 items-center border-2 border-gray-300 
         px-5 py-2 rounded-3xl cursor-pointer"
          onClick={handleOpenModal}
        >
          <AlarmIcon />
          <p>New quiz</p>
        </div>
        <DropdownMenu />
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={handleOpenModal}
        title="Set up a new quiz"
        handleSubmitQuiz={handleSubmit}
        onSubmit={handleAddQuestion}
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
