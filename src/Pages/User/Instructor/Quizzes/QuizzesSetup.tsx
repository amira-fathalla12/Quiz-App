import { BankIcon, ClockIcon } from "../../../components/SvgIcons/SvgIcons";
import CustomQuizesTab from "../../components/CustomQuizesTabs/CustomQuizesTabs";

export const QuizzesSetup = () => {
  return (
    <div className="flex gap-7 pt-5 ps-5">
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
  );
};
