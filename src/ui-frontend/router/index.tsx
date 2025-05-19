import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { HomeTest } from "@/ui-frontend/pages/hometest";
import { Home } from "@/ui-frontend/pages/home";

export const routes: RouteObject[] = [
  {
    path: "/test",
    element: <HomeTest />,
  },
  {
    path: "/",
    element: <Home />,
  },
];

export const router = createBrowserRouter(routes);
