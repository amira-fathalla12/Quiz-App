import {
  useAllCompletedQuizzesQuery,
  useAllGroupsQuery,
} from "../../../../redux/apis/apis";
import CustomTable from "../../../components/CustomTable/CustomTable";
import { formatDate } from "../../../../helperFunctions/helperFunctions";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../../redux/store";
import { skipToken } from "@reduxjs/toolkit/query";
import Spinner from "../../../components/Spinner/Spinner";

const CompletedQuizzes = () => {
  const { user } = useAppSelector((state) => state.user);
  const [groupId, setGroupId] = useState<string[]>([]);

  const { isError, data: quizzes, isLoading } = useAllCompletedQuizzesQuery();
  const { data: groupsData, isLoading: isGroupsLoading } = useAllGroupsQuery(
    user?.role === "Instructor" ? undefined : skipToken
  );

  useEffect(() => {
    if (user?.role === "Instructor" && !isLoading && quizzes!.length > 0) {
      const uniqueGroupIds = [...new Set(quizzes?.map((quiz) => quiz?.group))];
      setGroupId(uniqueGroupIds);
    }
  }, [isLoading, quizzes, user?.role]);

  const filteredGroups = groupsData?.filter((group) =>
    groupId.includes(group._id)
  );

  return (
    <div className="border border-gray-300 rounded-md p-4 w-full mb-2 h-fit">
      <div className="mb-5">
        <p className="text-xl font-bold">Completed Quizzes</p>
      </div>
      <CustomTable
        columns={[
          "Title",
          user?.role === "Instructor" ? "Group name" : "Difficulty",
          "No. of persons",
          "Date",
        ]}
      >
        {isError && (
          <h3>Something went wrong! Could not get completed quizzes</h3>
        )}
        {isLoading && (
          <tr>
            <td colSpan={5} className="text-center py-8">
              <Spinner />
            </td>
          </tr>
        )}
        {quizzes &&
          !isLoading &&
          quizzes.map((data) => (
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
              <td
                className="border border-gray-300 px-2 py-1 rounded overflow-hidden 
              text-ellipsis whitespace-nowrap text-center"
              >
                {user?.role === "Instructor" && !isGroupsLoading
                  ? filteredGroups?.find((g) => g?._id === data?.group)?.name ??
                    "unknown"
                  : data?.difficulty}
              </td>
              <td
                className="border border-gray-300 px-2 py-1 rounded overflow-hidden text-ellipsis
               whitespace-nowrap text-center"
              >
                {data?.participants}
              </td>
              <td className="border border-gray-300 px-2 py-1 rounded overflow-hidden text-ellipsis whitespace-nowrap">
                {formatDate(data?.closed_at)}
              </td>
            </tr>
          ))}
      </CustomTable>
      {quizzes && !isLoading && !quizzes?.length && (
        <span className=" justify-center py-3 font-medium flex ">
          No completed quizzes yet
        </span>
      )}
    </div>
  );
};

export default CompletedQuizzes;
