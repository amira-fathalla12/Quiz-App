import { BankIcon, ClockIcon } from "../../../components/SvgIcons/SvgIcons";
import CustomQuizesTab from "../../components/CustomQuizesTabs/CustomQuizesTabs";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Comingquizes from "./Comingquizes";
import AllQuizzes from "./AllQuizzes";
import CompletedQuizzes from "./CompletedQuizzes";
import { useAppSelector } from "../../../../redux/store";
import { twMerge } from "tailwind-merge";

export const QuizzesSetup = () => {
  const { user } = useAppSelector((state) => state.user);
  console.log(user?.role);
  return (
    <div className="flex flex-wrap lg:flex-nowrap gap-5 lg:gap-0 justify-between pt-5 ps-2">
      <div className="flex gap-2 sm:gap-5">
        <CustomQuizesTab
          icon={<ClockIcon />}
          label={
            user!.role === "Instructor" ? "Set up a new quiz" : "Join Quiz"
          }
          border="border-r-2"
          role={user!.role}
        />
        {user?.role === "Instructor" && (
          <CustomQuizesTab
            icon={<BankIcon />}
            label="Question Bank"
            border="border-r-2"
          />
        )}
      </div>
      <div className="w-full md:w-3/5 pr-3 ">
        <Tabs className="w-full">
          <TabList
            className={twMerge(
              user?.role === "Instructor"
                ? "justify-between"
                : "gap-1 sm:gap-7",
              "flex border-opacity-5"
            )}
          >
            <Tab>Upcoming quizzes</Tab>
            <Tab>Completed Quizzes</Tab>
            {user?.role === "Instructor" && <Tab>All Quizzes</Tab>}
          </TabList>

          <TabPanel>
            <Comingquizes role={user!.role} />
          </TabPanel>
          <TabPanel>
            <CompletedQuizzes />
          </TabPanel>
          {user?.role === "Instructor" && (
            <TabPanel>
              <AllQuizzes />
            </TabPanel>
          )}
        </Tabs>
      </div>
    </div>
  );
};
