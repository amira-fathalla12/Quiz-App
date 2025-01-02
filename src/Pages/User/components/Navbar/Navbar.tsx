import { useLocation } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { AlarmIcon } from "../../../components/SvgIcons/SvgIcons";

export const Navbar = () => {
  const { pathname } = useLocation();
  const navTitle = () => {
    switch (pathname) {
      case "/dashboard":
        return "Dashboard";
      case "/students":
        return "Students";
      case "/groups":
        return "Groups";
      case "/result-list":
        return "Results";
      case "/quzzies":
        return "Quizzes";
      case "/questions":
        return "Questions";
      default:
        return "Dashboard";
    }
  };
  return (
    <div className="flex p-4  items-center justify-between border-b border-gray-300">
      <p className="text-xl font-bold">{navTitle()}</p>

      <div className="flex gap-2 items-center ">
        <div className="flex gap-2 items-center border-2 border-gray-300 px-5 py-2 rounded-3xl ">
          <AlarmIcon />
          <p>New quiz</p>
        </div>
        <DropdownMenu />
      </div>
    </div>
  );
};
