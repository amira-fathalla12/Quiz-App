import { useAllCompletedQuizzesQuery } from "../../../../redux/apis/apis";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { formatDate } from "../../../../helperFunctions/helperFunctions";

const CompletedQuizzes = () => {
  const { isError, data, isLoading } = useAllCompletedQuizzesQuery();
  const tableData = data?.slice(0.3);

  return (
    <div className="border border-gray-300 rounded-md p-4 w-full mb-2 h-fit">
      <div className="mb-5">
        <p className="text-xl font-bold">Completed Quizzes</p>
      </div>
      <CustomTable columns={["Title", "Group name", "No. of persons", "Date"]}>
        {isError && (
          <h3>Something went wrong! Could not get completed quizzes</h3>
        )}

        {tableData &&
          !isLoading &&
          tableData.map((data) => (
            <tr
              key={data?.type + data?._id}
              className="hover:bg-gray-100 transition rounded-md"
            >
              <td
                className="border border-gray-300 px-2 py-1 rounded overflow-hidden 
              text-ellipsis whitespace-nowrap"
              >
                {data?.title}
              </td>
              <td className="border border-gray-300 px-2 py-1 rounded overflow-hidden text-ellipsis whitespace-nowrap">
                {data?.group}
              </td>
              <td className="border border-gray-300 px-2 py-1 rounded overflow-hidden text-ellipsis whitespace-nowrap">
                {data?.participants}
              </td>
              <td className="border border-gray-300 px-2 py-1 rounded overflow-hidden text-ellipsis whitespace-nowrap">
                {formatDate(data?.closed_at)}
              </td>
            </tr>
          ))}
      </CustomTable>
      {tableData && !isLoading && !tableData?.length && (
        <span className=" justify-center py-3 font-medium flex ">
          No completed quizzes yet
        </span>
      )}
    </div>
  );
};

export default CompletedQuizzes;
