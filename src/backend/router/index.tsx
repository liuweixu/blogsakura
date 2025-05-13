import { Login } from "@backend/pages/Login";
import { Layout } from "@backend/pages/Layout";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "../components/AuthRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
