import { Login } from "@backend/pages/Login";
import { Layout } from "@backend/pages/Layout";
import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "../components/AuthRoute";
import { Home } from "@backend/pages/Home";
import { Article } from "@backend/pages/Article";
import { Publish } from "@backend/pages/Publish";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
