import { useAllQuestionsQuery } from "../../../redux/apis/apis";
import ActionsMenu from "../../components/CustomTable/ActionsMenu";
import CustomTable from "../../components/CustomTable/CustomTable";
import Spinner from "../../components/Spinner/Spinner";
import TableHeader from "../../components/TableHeader/TableHeader";

export const QuestionsList = () => {
    const { isLoading, isError, data } = useAllQuestionsQuery();
    const tableData = data?.slice(0,10)
    console.log(tableData);
  return (
    <div className="p-5">
      <TableHeader title="Bank of Questions" btnText="Add Question" />
      <CustomTable columns={['Title','Description','Difficulty Level','Type','Actions']}>
      {isError && <h3>Something went wrong! Could not get questions</h3>}
      {isLoading && <tr><td colSpan={5} className="text-center py-8"><Spinner/></td></tr>}
      {tableData && tableData?.map((ques)=>(<tr className="border border-gray-300">
        <td className="border border-gray-300 px-2 py-1 px-2 py-1">{ques.title}</td>
        <td className="border border-gray-300 px-2 py-1">{ques.description}</td>
        <td className="border border-gray-300 px-2 py-1">{ques.difficulty}</td>
        <td className="border border-gray-300 px-2 py-1">{ques.type}</td>
        <td className="border border-gray-300 px-2 py-1"><ActionsMenu/></td>
      </tr>))}
      </CustomTable>
    </div>
  );
};
