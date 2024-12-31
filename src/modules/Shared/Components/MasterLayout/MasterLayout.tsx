import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";
import { SideBarMenu } from "../SideBarMenu/SideBarMenu";

export const MasterLayout = () => {
  return (
    <>
      <div className="flex h-screen">
        <SideBarMenu />
        <div className=" w-full main px-2">
          <Navbar />
          <Outlet />
        </div>
      </div>
    </>
  );
};
