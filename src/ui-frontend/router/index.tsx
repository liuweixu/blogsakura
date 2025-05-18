import { createBrowserRouter, type RouteObject } from "react-router-dom";
import { Home } from "@/ui-frontend/pages/home";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
];

export const router = createBrowserRouter(routes);
