import { useAllResultsQuery } from "../../../../redux/apis/apis";
import TableHeader from "../../../components/TableHeader/TableHeader"
import CustomTable from "../../../components/CustomTable/CustomTable";
import { formatDate } from "../../../../helperFunctions/helperFunctions";
import Spinner from "../../../components/Spinner/Spinner";

export const ResultList = () => {
    const { isLoading, isError, data } = useAllResultsQuery();
    const tableData = data?.slice(0, 10);
    console.log(tableData)
  return (
    <div className="p-5">
            <TableHeader
              title="Completed Quizzes"
            />
                  <CustomTable
        columns={[
          "Title",
          "Description",
          "No. Of Participants",
          "Date",
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
          tableData?.map((result) => (
            <tr key={result.quiz._id} className="border border-gray-300">
              <td className="border border-gray-300 px-2 py-1">{result.quiz.title}</td>
              <td className="border border-gray-300 px-2 py-1">
                {result.quiz.description}
              </td>
              <td className="border border-gray-300 px-2 py-1">
                {result.participants.length}
              </td>
              <td className="border border-gray-300 px-2 py-1">{formatDate(result.quiz.closed_at)}</td>
              <td className="border border-gray-300 px-2 py-1">
                  <button className="bg-olive text-dark py-1 px-5 rounded-xl m-2 font-bold">View</button>
              </td>
            </tr>
          ))}
      </CustomTable>
    </div>
  )
}
