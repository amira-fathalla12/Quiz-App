import { BankIcon, ClockIcon } from "../../../components/SvgIcons/SvgIcons";
import CustomQuizesTab from "../../components/CustomQuizesTabs/CustomQuizesTabs";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Comingquizes from "./Comingquizes";
import AllQuizzes from "./AllQuizzes";
import CompletedQuizzes from "./CompletedQuizzes";


export const QuizzesSetup = () => {



  return (
    <div className="flex justify-between pt-5">
      <div className="flex gap-7">
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
      <div className="w-full md:w-1/2 pr-3">
        <Tabs className="w-full">
          <TabList className="flex justify-between border-opacity-5 border-b-2">
            <Tab>Upcoming quizzes</Tab>
            <Tab>Completed Quizzes</Tab>
            <Tab>All Quizzes</Tab>
          </TabList>

          <TabPanel>
            <Comingquizes />
          </TabPanel>
          <TabPanel>
            <CompletedQuizzes />    
          </TabPanel>
          <TabPanel>
            <AllQuizzes />     
          </TabPanel>
        </Tabs>
      </div>
      


  



    </div>

  )}


  