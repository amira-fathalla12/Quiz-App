import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { QuizzesSetup } from "./User/Components/Instructor/Quizzes/QuizzesSetup";
import { StudentList } from "./User/Components/Instructor/StudentList";
import { GroupsList } from "./User/Components/Instructor/GroupsList";
import { ResultList } from "./User/Components/Instructor/Results/ResultList";
import { ResultDetails } from "./User/Components/Instructor/Results/ResultDetails";
import { QuestionsList } from "./User/Components/Instructor/QuestionsList";
import { QuizzesDetails } from "./User/Components/Instructor/Quizzes/QuizzesDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NotFound } from "./Shared/Components/NotFound/NotFound";
import { Login } from "./Authentication/Components/Login";
import { Register } from "./Authentication/Components/Register";
import { VerifyRegister } from "./Authentication/Components/VerifyRegister";
import { ResetPassword } from "./Authentication/Components/ResetPassword";
import { ForgetPassword } from "./Authentication/Components/ForgetPassword";
import ChangePassword from "./Authentication/Components/ChangePassword";
import { AuthLayout } from "./Authentication/Components/AuthLayout";
import { MasterLayout } from "./User/Components/MasterLayout";
import { Dashboard } from "./Shared/Components/Dashboard/Dashboard";

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
