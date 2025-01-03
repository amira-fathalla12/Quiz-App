import { useAllGroupsQuery } from "../../../redux/apis/apis"

import Spinner from "../../components/Spinner/Spinner"
import TableHeader from "../../components/TableHeader/TableHeader"

export const GroupsList = () => {
    const { isLoading, isError, data } = useAllGroupsQuery()
      console.log(data);
      
  return <>
    <div className="p-5">
      <TableHeader btnText="Add group" title=""/>
      <div className="groupWrapper border-2 rounded-lg px-[1rem] py-[1rem]">
      <h3 className="pt-[1rem] pb-[1.7rem] ">Group List</h3>

      <div className="groupInfo md:flex gap-2 items-center justify-between flex-wrap ">
      {
        isLoading &&   <div className="mx-auto">
        <Spinner/>
        </div>
      }
      {isError && <h3>Something went wrong! Could not get group please try again</h3>}

      {
        data?.map((group)=>  <div key={group._id} className="flex justify-between items-center md:w-[49%] border-2 rounded-lg py-[0.7rem] px-[1rem]">
        <div className="leftInfo">
              <h2 className="font-bold">Group : <span>{group.name}</span></h2>
              <p className="text-xs	">No.of students :{group?.students?.length}</p>
              </div>
              <div className="rightInfo cursor-pointer">
              <i className="fa-regular fa-pen-to-square"></i>
              <i className="fa-regular fa-trash-can ml-[0.5rem]"></i>
              </div>
        </div>)
      }




      </div>
    </div>
    </div>

  
  </>
}
