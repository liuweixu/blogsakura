import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
//在别的文件夹合并store和router
import { store } from "./storeall";

import { Toaster } from "sonner";
import "@ant-design/v5-patch-for-react-19";
import { Header } from "./ui-frontend/pages/header";
import { RouterBackend } from "@/ui-backend/router";
import { RouterFrontend } from "./ui-frontend/router";
import { BrowserRouter } from "react-router-dom";

const location = window.location;
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      {!location.pathname.startsWith("/backend/") && <Header />}
      <RouterFrontend />
      <RouterBackend />
      <Toaster />
    </BrowserRouter>
  </Provider>
);
