<<<<<<< HEAD
=======
/* eslint-disable @typescript-eslint/no-explicit-any */
>>>>>>> d4e0e5e65eb1da7c21e456a1d653a2728e981c72
import { useEffect, useState } from "react";
import {
  useAddQuestionMutation,
  useAllQuestionsQuery,
  useEditQuestionMutation,
  useGetQuestionQuery,
} from "../../../redux/apis/apis";
import ActionsMenu from "../../components/CustomTable/ActionsMenu";
import CustomTable from "../../components/CustomTable/CustomTable";
import Spinner from "../../components/Spinner/Spinner";
import TableHeader from "../../components/TableHeader/TableHeader";
import Modal from "../../components/ModalForm/ModalForm";
import Form from "../../components/Forms/Form";
import { useForm } from "react-hook-form";
import { Question } from "../../../services/interfaces";
import { toast } from "react-toastify";
<<<<<<< HEAD
=======
import { axiosInstance, QUESTIONS_URLS } from "../../../services/urls";
import { DeleteConfirm } from "../components/DeleteConfirm/DeleteConfirm";
>>>>>>> d4e0e5e65eb1da7c21e456a1d653a2728e981c72

export const QuestionsList = () => {
  const { isLoading, isError, data, refetch } = useAllQuestionsQuery();
  const tableData = data?.slice(0, 10);
<<<<<<< HEAD
  console.log(tableData);
=======
>>>>>>> d4e0e5e65eb1da7c21e456a1d653a2728e981c72

  const [isOpenAdd, setIsOpenAdd] = useState<boolean>(false);
  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
  const [editId, setEditId] = useState<string>("");
<<<<<<< HEAD

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Question>({ mode: "onChange" });

  const [addQuestion, { isLoading: isLoadingAdd }] = useAddQuestionMutation();
  const [editQuestion, { isLoading: isLoadingEdit }] =
    useEditQuestionMutation();
  const { data: questionData, isFetching: isFetchingQuestion } =
    useGetQuestionQuery(editId);

  const handleAddQuestion = async (data: Question) => {
    try {
      const result = await addQuestion(data).unwrap();
      console.log(result);
      closeAddModal();
      refetch();
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditQuestion = async (data: Question) => {
    console.log(editId);
    try {
      const result = await editQuestion({ id: editId, data }).unwrap();
      console.log(result);
      closeEditModal();
      refetch();
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  function openAddModal() {
    reset();
    setIsOpenAdd(true);
  }

  function closeAddModal() {
    setIsOpenAdd(false);
    reset();
  }

  function openEditModal(id: string) {
    setEditId(id);
    setIsOpenEdit(true);
  }

  useEffect(() => {
    if (!openEditModal) return;
    setValue("title", questionData?.title);
    setValue("description", questionData?.description);
    setValue("type", questionData?.type);
    setValue("answer", questionData?.answer);
    setValue("options.A", questionData?.options?.A);
    setValue("options.B", questionData?.options?.B);
    setValue("options.C", questionData?.options?.C);
    setValue("options.D", questionData?.options?.D);
  }, [questionData, setValue]);

  function closeEditModal() {
    setIsOpenEdit(false);
    reset();
  }

=======
  const [deleting, setDeleting] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  const handleOpenDelete = (id: string) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Question>({ mode: "onChange" });

  const [addQuestion, { isLoading: isLoadingAdd }] = useAddQuestionMutation();
  const [editQuestion, { isLoading: isLoadingEdit }] =
    useEditQuestionMutation();
  const { data: questionData, isFetching: isFetchingQuestion } =
    useGetQuestionQuery(editId);

  const handleAddQuestion = async (data: Question) => {
    try {
      const result = await addQuestion(data).unwrap();
      closeAddModal();
      refetch();
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditQuestion = async (data: Question) => {
    try {
      const result = await editQuestion({ id: editId, data }).unwrap();
      closeEditModal();
      refetch();
      toast.success(result.message);
    } catch (error) {
      console.log(error);
    }
  };

  // function delete
  const deleteQuestions = async () => {
    try {
      setDeleting(true);
      await axiosInstance.delete(QUESTIONS_URLS.deleteQuestion(selectedId));
      toast.success("Question deleted successfully");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "something went wrong");
    } finally {
      setDeleting(false);
      handleCloseDelete();
    }
  };

  function openAddModal() {
    reset();
    setIsOpenAdd(true);
  }

  function closeAddModal() {
    setIsOpenAdd(false);
    reset();
  }

  function openEditModal(id: string) {
    setEditId(id);
    setIsOpenEdit(true);
  }

  useEffect(() => {
    if (!openEditModal) return;
    setValue("title", questionData?.title);
    setValue("description", questionData?.description);
    setValue("type", questionData?.type);
    setValue("answer", questionData?.answer);
    setValue("options.A", questionData?.options?.A);
    setValue("options.B", questionData?.options?.B);
    setValue("options.C", questionData?.options?.C);
    setValue("options.D", questionData?.options?.D);
  }, [questionData, setValue]);

  function closeEditModal() {
    setIsOpenEdit(false);
    reset();
  }

>>>>>>> d4e0e5e65eb1da7c21e456a1d653a2728e981c72
  return (
    <div className="p-5">
      <Modal
        isOpen={isOpenAdd}
        closeModal={closeAddModal}
        title="Set up a new question"
<<<<<<< HEAD
        handleSubmitQuestion={handleSubmit}
        onSubmit={handleAddQuestion}
        isSubmitting={isSubmitting}
        isLoading={isLoadingAdd}
        formType="question"
=======
        handleSubmit={handleSubmit}
        onSubmit={handleAddQuestion}
        isSubmitting={isSubmitting}
        isLoading={isLoadingAdd}
>>>>>>> d4e0e5e65eb1da7c21e456a1d653a2728e981c72
      >
        <Form register={register} errors={errors} />
      </Modal>
      <Modal
        isOpen={isOpenEdit}
        closeModal={closeEditModal}
        title="Update question"
<<<<<<< HEAD
        handleSubmitQuestion={handleSubmit}
        onSubmit={handleEditQuestion}
        isSubmitting={isSubmitting}
        isLoading={isLoadingEdit}
        formType="question"
=======
        handleSubmit={handleSubmit}
        onSubmit={handleEditQuestion}
        isSubmitting={isSubmitting}
        isLoading={isLoadingEdit}
>>>>>>> d4e0e5e65eb1da7c21e456a1d653a2728e981c72
      >
        {isFetchingQuestion ? (
          <div className="text-center">
            <Spinner size="h-20 w-20" />
          </div>
        ) : (
          <Form register={register} errors={errors} />
        )}
      </Modal>
      <TableHeader
        title="Bank of Questions"
        btnText="Add Question"
        handleClick={openAddModal}
      />
      <CustomTable
        columns={[
          "Title",
          "Description",
          "Difficulty Level",
          "Type",
          "Actions",
        ]}
      >
        {isError && <h3>Something went wrong! Could not get questions</h3>}
        {isLoading && (
          <tr>
            <td colSpan={5} className="text-center py-8">
              <Spinner />
            </td>
          </tr>
        )}
        {tableData &&
          tableData?.map((ques) => (
            <tr key={ques._id} className="border border-gray-300">
              <td className="border border-gray-300 px-2 py-1">{ques.title}</td>
              <td className="border border-gray-300 px-2 py-1">
                {ques.description}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {ques.difficulty}
              </td>
              <td className="border border-gray-300 px-2 py-1">{ques.type}</td>
              <td className="border border-gray-300 px-2 py-1">
                <ActionsMenu
<<<<<<< HEAD
                  openEdit={() => {
                    openEditModal(ques._id);
                  }}
                />
=======
                  openEdit={() => openEditModal(ques._id)}
				  openDelete={() => handleOpenDelete(ques._id)}                />
>>>>>>> d4e0e5e65eb1da7c21e456a1d653a2728e981c72
              </td>
            </tr>
          ))}
      </CustomTable>
<<<<<<< HEAD
=======
      <DeleteConfirm
        setOpenModal={handleCloseDelete} 
        openModal={openDelete} 
        loading={deleting} 
        onConfirm={deleteQuestions} 
        title="Question" 
        modalRef={null} 
      />
>>>>>>> d4e0e5e65eb1da7c21e456a1d653a2728e981c72
    </div>
  );
};
