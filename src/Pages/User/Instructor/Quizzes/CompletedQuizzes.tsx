import {  useAllCompletedQuizzesQuery } from "../../../../redux/apis/apis"
import CustomTable from "../../../components/CustomTable/CustomTable"
import { formatDate } from "../../../../helperFunctions/helperFunctions"


const CompletedQuizzes = () => {
  const { isError , data} = useAllCompletedQuizzesQuery() 
  const tableData = data?.slice(0.3)
  return (
    <div className="border border-gray-300 rounded-md p-4 w-full mb-2 h-fit">
      <div className="mb-5">
        <p className="text-xl font-bold">Completed Quizzes</p>
      </div>
      <CustomTable
      columns = {[
        "Title",
        "Group name",
        "No. of persons",
        "Date"
      ]}
      >
      {isError && <h3>Something went wrong! Could not get completed quizzes</h3>}
      {tableData && tableData.map((data) => (
        <tr key={data.quiz._id}  className="hover:bg-gray-100 transition rounded-md" >
          <td className="border border-gray-300 px-2 py-1 rounded overflow-hidden text-ellipsis whitespace-nowrap">
            {data.quiz.title}
          </td>
          <td className="border border-gray-300 px-2 py-1 rounded overflow-hidden text-ellipsis whitespace-nowrap">
            {data.quiz.group}
          </td>
          <td className="border border-gray-300 px-2 py-1 rounded overflow-hidden text-ellipsis whitespace-nowrap">
            {data.participants.length}
          </td>
          <td className="border border-gray-300 px-2 py-1 rounded overflow-hidden text-ellipsis whitespace-nowrap">
            {formatDate(data.quiz.closed_at)}
          </td>
        </tr>


      ))}
      </CustomTable>
    </div>
  )
}

export default CompletedQuizzes