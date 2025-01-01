import { Outlet } from "react-router-dom";
import authImage from "../../assets/Images/authImage.svg";
import Logo from "../../assets/Images/Logo-white.png";

export const AuthLayout = () => {
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5 bg-dark ">
        {/* Left Section */}

        <div className="text-white p-12 lg:col-span-3 custom:col-span-12">
          <img src={Logo} alt="Logo" className="w-48 pb-12 " />

          <Outlet />
        </div>

        {/* Right Section */}
        <div className="p-6 lg:col-span-2 custom:col-span-12 px-11 sm:px-6 ">
          <img
            src={authImage}
            alt="Quiz app Illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </>
  );
};
