import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QuizzesSetup } from "./Pages/User/Instructor/Quizzes/QuizzesSetup";
import { StudentList } from "./Pages/User/Instructor/StudentList";
import { GroupsList } from "./Pages/User/Instructor/GroupsList";
import { ResultList } from "./Pages/User/Instructor/Results/ResultList";
import { ResultDetails } from "./Pages/User/Instructor/Results/ResultDetails";
import { QuestionsList } from "./Pages/User/Instructor/QuestionsList";
import { QuizzesDetails } from "./Pages/User/Instructor/Quizzes/QuizzesDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotFound } from "./Pages/components/NotFound/NotFound";
import { Login } from "./Pages/Authentication/Login";
import { Register } from "./Pages/Authentication/Register";
import { ResetPassword } from "./Pages/Authentication/ResetPassword";
import { ForgetPassword } from "./Pages/Authentication/ForgetPassword";
import ChangePassword from "./Pages/Authentication/ChangePassword";
import { AuthLayout } from "./Pages/Authentication/AuthLayout";
import { MasterLayout } from "./Pages/User/MasterLayout";
import { Dashboard } from "./Pages/User/components/Dashboard/Dashboard";
import { VerifyRegister } from "./Pages/Authentication/VerifyRegister";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "verify-user", element: <VerifyRegister /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },

    {
      path: "",
      element: <MasterLayout />,

      errorElement: <NotFound />,
      children: [
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "quzzies",
          element: <QuizzesSetup />,
        },
        {
          path: "quzziesDetails/:id",
          element: <QuizzesDetails />,
        },
        {
          path: "students",
          element: <StudentList />,
        },
        {
          path: "groups",
          element: <GroupsList />,
        },
        {
          path: "result-list",
          element: <ResultList />,
        },
        { path: "resultDetails/:id", element: <ResultDetails /> },
        {
          path: "questions",
          element: <QuestionsList />,
        },
      ],
    },
  ]);
  return (
    <>
      <ToastContainer />
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
};

export default App;
