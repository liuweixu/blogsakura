import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "@backend/router";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "@backend/store";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    <Toaster />
  </Provider>
);
