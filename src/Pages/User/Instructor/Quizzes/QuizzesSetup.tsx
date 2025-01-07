import { BankIcon, ClockIcon } from "../../../components/SvgIcons/SvgIcons";
import CustomQuizesTab from "../../components/CustomQuizesTabs/CustomQuizesTabs";

export const QuizzesSetup = () => {
  return (
    <div className="flex pt-5 ps-5">
      <div className="flex flex-wrap gap-7  ">
        <CustomQuizesTab
          icon={<ClockIcon />}
          label="Set up a new quiz"
          border="border-r-2"
        />
        <CustomQuizesTab
          icon={<BankIcon />}
          label="Question Bank"
          border="border-r-2"
        />
      </div>
    </div>
  );
};
