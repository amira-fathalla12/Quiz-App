/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";
import {
  useAllGroupsQuery,
  useDeleteGroupsMutation,
} from "../../../redux/apis/apis";
import Spinner from "../../components/Spinner/Spinner";
import TableHeader from "../../components/TableHeader/TableHeader";
import { DeleteConfirm } from "../components/DeleteConfirm/DeleteConfirm";
import { useEffect, useState } from "react";
import { group } from "../../../services/interfaces";

export const GroupsList = () => {
  const { isLoading, isError, data: fetchedData, refetch } = useAllGroupsQuery();
  const [groups, setGroups] = useState<group[]>(fetchedData || []);
  const [deleteGroup, { isLoading: isLoadingDell }] = useDeleteGroupsMutation();
  const [deleting, setDeleting] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedId, setSelectedId] = useState<string>("");

  useEffect(() => {
    if (fetchedData) {
      setGroups(fetchedData);
    }
  }, [fetchedData]);

  const handleOpenDelete = (id: string) => {
    setSelectedId(id);
    setOpenDelete(true);
  };

  const handleCloseDelete = () => setOpenDelete(false);

  // function to handle deletion
  const onDeleteGroup = async () => {
    try {
      setDeleting(true);
      const groupToDelete = groups.find((group) => group._id === selectedId);
  
      if (groupToDelete) {
        await deleteGroup({ id: selectedId, data: groupToDelete }).unwrap();
        toast.success("Group deleted successfully");
        
        // Refetch the data to update the table
        await refetch();

        // Optionally, update local state if you want to avoid refetching
        setGroups((prevGroups) =>
          prevGroups.filter((group) => group._id !== selectedId)
        );
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Something went wrong");
    } finally {
      setDeleting(false);
      handleCloseDelete();
    }
  };

  return (
    <>
      <div className="p-5">
        <TableHeader btnText="Add group" title="" />
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
                  <i className="fa-regular fa-pen-to-square"></i>
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
          loading={deleting || isLoadingDell}
          onConfirm={onDeleteGroup}
          title="Group"
          modalRef={null}
        />
      </div>
    </>
  );
};
