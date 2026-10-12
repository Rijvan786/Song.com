import { createBrowserRouter } from "react-router";
import Register from "../features/auth/pages/Register";
import Login from "../features/auth/pages/Login";
import Forgetmail from "../features/auth/pages/Forgetmail";
import ForgetPassword from "../features/auth/pages/ForgetPassword";
import Resend_Verifymail from "../features/auth/pages/Resend_Verifymail";
import Profile from "../features/auth/pages/Profile";
import Protected from "../features/auth/components/Protected";
import Home from "../features/Home/pages/Home";
import MyHome from "../features/Home/components/MyHome";
import ErrorBoundPage from "./Error.bound";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MyHome />,
    errorElement: <ErrorBoundPage />,
  },
  {
    path: "/Protected",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
    errorElement: <ErrorBoundPage />,
  },
  {
    path: "/Profile",
    element: (
      <Protected>
        <Profile />
      </Protected>
    ),
    errorElement: <ErrorBoundPage />,
  },

 
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorBoundPage />,
  },
 
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorBoundPage />,
  },

  {
    path: "/forgetmail",
    element: <Forgetmail />,
    errorElement: <ErrorBoundPage />,
  },


  {
    path: "/forgetpassword",
    element: <ForgetPassword />,
    errorElement: <ErrorBoundPage />,
  },
  {
    path: "/Resend_verifymail",
    element: <Resend_Verifymail />,
    errorElement: <ErrorBoundPage />,
  },

  {
    path: "/resend_verifymail",
    element: <Resend_Verifymail />,
    errorElement: <ErrorBoundPage />,
  },
  {
    path: "*",
    element: <ErrorBoundPage />,
    errorElement: <ErrorBoundPage />,
  },
]);

export default routes;
