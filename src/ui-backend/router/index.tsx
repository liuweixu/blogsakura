import { Login } from "@/ui-backend/pages/Login";
import { Layout } from "@/ui-backend/pages/Layout";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { AuthRoute } from "@/ui-backend/components/AuthRoute";
import { Home } from "@/ui-backend/pages/Home";
import { ArticleList } from "@/ui-backend/pages/ArticleList";
import { Publish } from "@/ui-backend/pages/Publish";
import { Setting } from "@/ui-backend/pages/Setting";
import { Test } from "@/ui-backend/pages/Test";

export const routes: RouteObject[] = [
  {
    path: "/backend/",
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
        path: "articlelist",
        element: <ArticleList />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
      {
        path: "setting",
        element: <Setting />,
      },
      {
        path: "test",
        element: <Test />,
      },
    ],
  },
  {
    path: "/backend/login",
    element: <Login />,
  },
];

export const router = createBrowserRouter(routes);
