import { formatDate } from "../../../../helperFunctions/helperFunctions";
import { useAllQuizzesResultsQuery } from "../../../../redux/apis/apis";
import CustomTable from "../../../components/CustomTable/CustomTable";
import Spinner from "../../../components/Spinner/Spinner";

const AllQuizzes = () => {
  const { isLoading, isError, data } = useAllQuizzesResultsQuery();
  const tableData = data?.slice(0, 8);
  return (
    <div className="border border-gray-300 p-4 w-full mb-2 h-fit rounded-md">
      <div className="mb-5">
        <p className="text-xl font-bold"> All Quizzes</p>
      </div>
      <CustomTable
        columns={["Title", "Description", "No. Of Participants", "Date"]}
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
            <tr
              key={result.quiz._id}
              className="hover:bg-gray-100 transition rounded-md"
            >
              <td className="border border-gray-300 px-2 py-1 rounded">
                {result.quiz.title}
              </td>
              <td className="border border-gray-300 px-2 py-1 rounded">
                {result.quiz.description}
              </td>
              <td className="border border-gray-300 px-2 py-1 rounded text-center">
                {result.participants.length}
              </td>
              <td className="border border-gray-300 px-2 py-1 rounded">
                {formatDate(result.quiz.closed_at)}
              </td>
            </tr>
          ))}
      </CustomTable>
    </div>
  );
};

export default AllQuizzes;
