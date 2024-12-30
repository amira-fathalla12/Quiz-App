import { Outlet } from "react-router-dom"
import authImage from '../../../../assets/Images/authImage.svg'

export const AuthLayout = () => {
  return <>
  
  <div className="bg-dark text-white min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8  p-8 rounded-lg shadow-md">
          {/* Left Section */}

          <Outlet/>

          {/* Right Section */}
          <div className="flex justify-center">
            <img
              src={authImage}
              alt="quiz app illustration"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  
  </>
}
