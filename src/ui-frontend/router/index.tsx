import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { HomeTest } from "@/ui-frontend/pages/hometest";
import { Home } from "@/ui-frontend/pages/home";
import { Article } from "@/ui-frontend/pages/article";

export const routes: RouteObject[] = [
  {
    path: "/test",
    element: <HomeTest />,
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/article/:id", // 注意这里添加了斜杠和冒号
    element: <Article />,
  },
];

export const router = createBrowserRouter(routes);
