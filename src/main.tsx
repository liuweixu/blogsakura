import "./index.css";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
//在别的文件夹合并store和router
import { store } from "./storeall";
import { router } from "./routerall";
import { Toaster } from "sonner";
import "@ant-design/v5-patch-for-react-19";
import "./statics/iconfont/iconfont.css";
// import { Header } from "@/ui-frontend/pages/header";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    {/* <BrowserRouter> */}
    {/* <Header /> */}
    <RouterProvider router={router}></RouterProvider>
    <Toaster />

    {/* </BrowserRouter> */}
  </Provider>
);
