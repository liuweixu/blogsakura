// 在新文件中合并路由
import { createBrowserRouter } from "react-router-dom";
import { routes as routes1 } from "@/ui-backend/router";
import { routes as routes2 } from "@/ui-frontend/router";

// 合并路由
export const router = createBrowserRouter([
  ...routes1,
  ...routes2,
  // 或者按你的需求组织
]);
