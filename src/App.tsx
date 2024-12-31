import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Login } from './modules/AuthComponents/Login/Login';
import { Register } from "./modules/AuthComponents/Register/Register"
import { VerifyRegister } from "./modules/AuthComponents/VerifyRegister/VerifyRegister"
import { ForgetPassword } from "./modules/AuthComponents/ForgetPassword/ForgetPassword"
import { ResetPassword } from "./modules/AuthComponents/ResetPassword/ResetPassword"
import { ChangePassword } from "./modules/AuthComponents/ChangePassword/ChangePassword"
import { Dashboard } from "./modules/Dashboard/Dashboard"
import { QuizzesSetup } from "./modules/Quizzes/QuizzesSetup"
import { StudentList } from "./modules/Students/StudentList"
import { GroupsList } from "./modules/Groups/GroupsList"
import { ResultList } from "./modules/Results/ResultList"
import { ResultDetails } from "./modules/Results/ResultDetails"
import { QuestionsList } from "./modules/Questions/QuestionsList"
import { QuizzesDetails } from "./modules/Quizzes/QuizzesDetails"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";
import { AuthLayout } from './modules/Shared/Components/AuthLayout/AuthLayout';
import { NotFound } from './modules/Shared/Components/NotFound/NotFound';
import { MasterLayout } from './modules/Shared/Components/MasterLayout/MasterLayout';
import ProtectedRoute from "./modules/Shared/Components/ProtectedRoute/ProtectedRoute";

const App = () => {

  const routes = createBrowserRouter([ {
    path: "",
    element: <AuthLayout />,
    errorElement: <NotFound
     />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "verify-user", element: <VerifyRegister /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "change-password", element: <ChangePassword /> },
    ],
  }

,
{
  path:'',
  element: <ProtectedRoute>
    <MasterLayout/>
  </ProtectedRoute>
  ,
  errorElement:<NotFound/>,
  children : [
    {
      path : 'dashboard',element : <Dashboard/>,
    
    },
    {
      path : 'quzzies' , element : <QuizzesSetup/>
    },
    {
      path : 'quzziesDetails/:id' , element : <QuizzesDetails/>
    },
    {
      path:'students' , element : <StudentList/>,
    },
    {
      path :'groups' , element : <GroupsList/>
    },
    {
      path:'result-list' , element : <ResultList/>
    },
    { path: "resultDetails/:id", element: <ResultDetails /> },
    {
      path : 'questions' , element : <QuestionsList/>

    }
    
  ]
}


])
 return <>
 <ToastContainer />
 <RouterProvider router={routes}></RouterProvider>
 
 

 
 </>
}

export default App
