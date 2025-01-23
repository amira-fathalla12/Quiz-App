/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  useAddQuestionMutation,
  useAllQuestionsQuery,
  useDeleteQuestionMutation,
  useEditQuestionMutation,
  useGetQuestionQuery,
} from "../../../redux/apis/apis";
import CustomTable from "../../components/CustomTable/CustomTable";
import Spinner from "../../components/Spinner/Spinner";
import TableHeader from "../../components/TableHeader/TableHeader";
import Modal from "../../components/ModalForm/ModalForm";
import Form from "../../components/Forms/Form";
import { useForm } from "react-hook-form";
import { Question } from "../../../services/interfaces";
import { toast } from "react-toastify";
import { DeleteConfirm } from "../components/DeleteConfirm/DeleteConfirm";
import ActionsMenu from "../../components/CustomTable/ActionsMenu";

export const QuestionsList = () => {
  const { isLoading, isError, data, refetch } = useAllQuestionsQuery();
  const tableData = data?.slice(0, 10);

  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [addQuestion] = useAddQuestionMutation();
  const [editQuestion] = useEditQuestionMutation();
  const [deleteQuestion] = useDeleteQuestionMutation();
  const { data: questionData, isFetching: isFetchingQuestion } =
    useGetQuestionQuery(editId);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Question>({ mode: "onChange" });

  const handleAddQuestion = async (data: Question) => {
    try {
      const result = await addQuestion(data).unwrap();
      toast.success(result.message);
      closeAddModal();
      refetch();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  const handleEditQuestion = async (data: Question) => {
    try {
      const result = await editQuestion({ id: editId, data }).unwrap();
      toast.success(result.message);
      closeEditModal();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    }
  };

  const deleteQuestions = async () => {
    try {
      const questionToDelete = data?.find(
        (question) => question._id === selectedId
      );

      if (questionToDelete) {
        await deleteQuestion({
          id: selectedId,
          data: questionToDelete,
        }).unwrap();
        toast.success("Question deleted successfully");
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      handleCloseDelete();
    }
  };

  const openAddModal = () => {
    reset();
    setIsOpenAdd(true);
  };

  const closeAddModal = () => {
    setIsOpenAdd(false);
    reset();
  };

  const openEditModal = (id: string) => {
    setEditId(id);
    setIsOpenEdit(true);
  };

  const closeEditModal = () => {
    setIsOpenEdit(false);
    reset();
  };

  const handleOpenDelete = (id: string) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  useEffect(() => {
    if (questionData) {
      setValue("title", questionData.title ?? "");
      setValue("description", questionData.description ?? "");
      setValue("type", questionData.type ?? "BE");
      setValue("answer", questionData.answer ?? "A");
      setValue("options.A", questionData.options?.A ?? "");
      setValue("options.B", questionData.options?.B ?? "");
      setValue("options.C", questionData.options?.C ?? "");
      setValue("options.D", questionData.options?.D ?? "");
    }
  }, [questionData, setValue]);

  return (
    <div className="p-5">
      <Modal<Question>
        isOpen={isOpenAdd}
        closeModal={closeAddModal}
        title="Set up a new question"
        handleSubmitQuestion={handleSubmit}
        onSubmit={handleAddQuestion}
        isSubmitting={isSubmitting}
        formType="question"
      >
        <Form register={register} errors={errors} />
      </Modal>
      <Modal<Question>
        isOpen={isOpenEdit}
        closeModal={closeEditModal}
        title="Update question"
        handleSubmitQuestion={handleSubmit}
        onSubmit={handleEditQuestion}
        isSubmitting={isSubmitting}
        formType="question"
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
          tableData.map((ques) => (
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
                  openEdit={() => openEditModal(ques._id)}
                  openDelete={() => handleOpenDelete(ques._id)}
                />
              </td>
            </tr>
          ))}
      </CustomTable>
      <DeleteConfirm
        setOpenModal={handleCloseDelete}
        openModal={openDelete}
        loading={false}
        onConfirm={deleteQuestions}
        title="Question"
        modalRef={null}
      />
    </div>
  );
};
