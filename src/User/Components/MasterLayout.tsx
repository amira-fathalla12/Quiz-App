import { Outlet } from "react-router-dom";
import { SideBarMenu } from "../../Shared/Components/SideBarMenu/SideBarMenu";
import { Navbar } from "../../Shared/Components/Navbar/Navbar";

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
