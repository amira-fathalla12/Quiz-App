import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  useAddGroupMutation,
  useAllGroupsQuery,
  useAllStudentsQuery,
  useDeleteGroupsMutation,
  useEditGroupMutation,
  useGetGroupQuery,
} from "../../../redux/apis/apis";
import Spinner from "../../components/Spinner/Spinner";
import TableHeader from "../../components/TableHeader/TableHeader";
import { DeleteConfirm } from "../components/DeleteConfirm/DeleteConfirm";
import { group } from "../../../services/interfaces";
import Modal from "../../components/ModalForm/ModalForm";
import { useForm } from "react-hook-form";
import FormGroup from "../../components/FormGroup/FormGroup";

export const GroupsList = () => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<group>({ mode: "onChange" });

  const { data: studentsData } = useAllStudentsQuery();
  const [deleteGroup, { isLoading: isLoadingDell }] = useDeleteGroupsMutation();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [openAdd, setOpenAdd] = useState(false);
  const [addGroup] = useAddGroupMutation();
  const [editGroup] = useEditGroupMutation();
  const [openEdit, setOpenEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const { isLoading, isError, data: fetchedData } = useAllGroupsQuery();
  const { data: groupData, isFetching: isFetchingGroup } =
    useGetGroupQuery(editId);
  const [groups, setGroups] = useState<group[]>(fetchedData || []);

  const openAddModal = () => {
    reset();
    setOpenAdd(true);
  };

  const closeAddModal = () => {
    setOpenAdd(false);
    reset();
  };

  const openEditModal = (id: string) => {
    setEditId(id);
    setOpenEdit(true);
  };

  const closeEditModal = () => {
    setOpenEdit(false);
    reset();
  };

  const handleAddGroup = async (data: group) => {
    try {
      const result = await addGroup(data).unwrap();
      toast.success(result.message);
      closeAddModal();
    } catch (error: any) {
      const serverErrorMessage =
        error?.data?.error ||
        error?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(serverErrorMessage);
    }
  };

  const handleEditGroup = async (data: group) => {
    try {
      const result = await editGroup({ id: editId, data }).unwrap();
      toast.success(result.message);
      closeEditModal();
    } catch (error: any) {
      const serverErrorMessage =
        error?.data?.error ||
        error?.data?.message ||
        error?.message ||
        "Something went wrong";
      toast.error(serverErrorMessage);
    }
  };

  useEffect(() => {
    if (fetchedData) {
      setGroups(fetchedData);
    }
  }, [fetchedData]);

  const handleOpenDelete = (id: string) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  useEffect(() => {
    if (groupData) {
      setValue("name", groupData.name);

      if (Array.isArray(groupData.students)) {
        const studentIds = groupData.students.map(
          (student: any) => student._id
        );
        setValue("students", studentIds);
      }
    }
  }, [groupData, setValue]);

  const handleCloseDelete = () => setOpenDelete(false);

  const onDeleteGroup = async () => {
    try {
      const groupToDelete = groups.find((group) => group._id === selectedId);

      if (groupToDelete) {
        await deleteGroup({ id: selectedId, data: groupToDelete }).unwrap();
        toast.success("Group deleted successfully");
        // تحديث المجموعة في ال state
        setGroups((prevGroups) =>
          prevGroups.filter((group) => group._id !== selectedId)
        );
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      handleCloseDelete();
    }
  };

  return (
    <>
      <div className="p-5">
        <Modal<group>
          isOpen={openAdd}
          closeModal={closeAddModal}
          title="Set up a new group"
          handleSubmitGroup={handleSubmit}
          onSubmit={handleAddGroup}
          isSubmitting={isSubmitting}
          isLoading={isLoading}
          formType="group"
        >
          <FormGroup
            register={register}
            errors={errors}
            students={studentsData || []}
            setValue={setValue}
          />
        </Modal>

        <Modal<group>
          isOpen={openEdit}
          closeModal={closeEditModal}
          title="Update Group"
          handleSubmitGroup={handleSubmit}
          onSubmit={handleEditGroup}
          isSubmitting={isSubmitting}
          formType="group"
        >
          {isFetchingGroup ? (
            <div className="text-center">
              <Spinner size="h-20 w-20" />
            </div>
          ) : (
            <FormGroup
              register={register}
              errors={errors}
              students={studentsData || []}
              setValue={setValue}
              groupData={groupData}
            />
          )}
        </Modal>

        <TableHeader btnText="Add group" title="" handleClick={openAddModal} />

        <div className="groupWrapper border-2 rounded-lg px-[1rem] py-[1rem]">
          <h3 className="pt-[1rem] pb-[1.7rem]">Group List</h3>

          <div className="groupInfo md:flex gap-2 items-center justify-between flex-wrap">
            {isLoading && (
              <div className="mx-auto">
                <Spinner />
              </div>
            )}
            {isError && (
              <h3>
                Something went wrong! Could not get groups, please try again.
              </h3>
            )}

            {groups.map((group) => (
              <div
                key={group._id}
                className="flex justify-between items-center md:w-[49%] border-2 rounded-lg py-[0.7rem] px-[1rem]"
              >
                <div className="leftInfo">
                  <h2 className="font-bold">
                    Group: <span>{group.name}</span>
                  </h2>
                  <p className="text-xs">
                    No. of students: {group?.students?.length}
                  </p>
                </div>
                <div className="rightInfo cursor-pointer">
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => openEditModal(group._id)}
                  ></i>
                  <i
                    className="fa-regular fa-trash-can ml-[0.5rem]"
                    onClick={() => handleOpenDelete(group._id)}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>

        <DeleteConfirm
          setOpenModal={handleCloseDelete}
          openModal={openDelete}
          loading={isLoadingDell}
          onConfirm={onDeleteGroup}
          title="Group"
          modalRef={null}
        />
      </div>
    </>
  );
};
