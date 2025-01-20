import { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  DashboardIcon,
  GroupsIcon,
  HelpIcon,
  MenuIcon,
  QuizzesIcon,
  ResultsIcon,
  StudentsIcon,
} from "../../../components/SvgIcons/SvgIcons";
import { useAppSelector } from "../../../../redux/store";

export const SideBarMenu = () => {
  const { pathname } = useLocation();
    const { user } = useAppSelector((state) => state.user);

  const [isCollapse, setIsCollapse] = useState<boolean>(false);
  const toggleCollapse = () => {
    setIsCollapse(!isCollapse);
  };
  return (
    <div className={`sidebar-container fixed ${isCollapse ? "collapsed" : ""}`}>
      <Sidebar collapsed={isCollapse} collapsedWidth="100px">
        <Menu>
          <MenuItem
            onClick={toggleCollapse}
            icon={<MenuIcon />}
            className="border border-gray-300 py-2"></MenuItem>
          <MenuItem
            component={<Link to="/dashboard" />}
            icon={
              <DashboardIcon
                color={pathname == "/dashboard" ? "#0D1321" : "#FFEDDF"}
                color2={pathname == "/dashboard" ? "#FFEDDF" : "#0D1321"}
              />
            }
            className={`border border-gray-300 py-2 ${
              pathname == "/dashboard" ? "border-r-4 border-r-dark" : ""
            }`}>
            {" "}
            Dashboard
          </MenuItem>
          {
            user!.role == 'Instructor' ? <>
                      <MenuItem
            component={<Link to="/students" />}
            icon={
              <StudentsIcon
                color={pathname == "/students" ? "#0D1321" : "#FFEDDF"}
                color2={pathname == "/students" ? "#FFEDDF" : "#0D1321"}
              />
            }
            className={`border border-gray-300 py-2 ${
              pathname == "/students" ? "border-r-4 border-r-dark" : ""
            }`}>
            {" "}
            Students
          </MenuItem>
          <MenuItem
            component={<Link to="/groups" />}
            icon={
              <GroupsIcon
                color={pathname == "/groups" ? "#0D1321" : "#FFEDDF"}
                color2={pathname == "/groups" ? "#FFEDDF" : "#0D1321"}
              />
            }
            className={`border border-gray-300 py-2 ${
              pathname == "/groups" ? "border-r-4 border-r-dark" : ""
            }`}>
            {" "}
            Groups
          </MenuItem>
            </> : ''
          }

          <MenuItem
            component={<Link to="/quzzies" />}
            icon={
              <QuizzesIcon
                color={pathname == "/quzzies" ? "#0D1321" : "#FFEDDF"}
                color2={pathname == "/quzzies" ? "#FFEDDF" : "#0D1321"}
              />
            }
            className={`border border-gray-300 py-2 ${
              pathname == "/quzzies" ? "border-r-4 border-r-dark" : ""
            }`}>
            {" "}
            Quizzes
          </MenuItem>
          <MenuItem
            component={<Link to="/result-list" />}
            icon={
              <ResultsIcon
                color={pathname == "/result-list" ? "#0D1321" : "#FFEDDF"}
              />
            }
            className={`border border-gray-300 py-2 ${
              pathname == "/result-list" ? "border-r-4 border-r-dark" : ""
            }`}>
            {" "}
            Results
          </MenuItem>
          <MenuItem
            icon={<HelpIcon />}
            className="border border-gray-300 py-2 help">
            {" "}
            Help
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};
