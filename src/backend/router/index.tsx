import { Login } from "@backend/pages/Login";
import { Layout } from "@backend/pages/Layout";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
