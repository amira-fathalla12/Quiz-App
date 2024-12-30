import { Outlet } from "react-router-dom"
import authImage from '../../../../assets/Images/authImage.svg'

export const AuthLayout = () => {
  return <>
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-5 bg-dark">
      {/* Left Section */}
      <div className="text-white p-6 lg:col-span-3">
        <Outlet />
      </div>

      {/* Right Section */}
      <div className="p-6 lg:col-span-2">
        <img
          src={authImage}
          alt="Quiz app Illustration"
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  
  </>
}
