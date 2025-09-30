import { Outlet } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function Layout() {
  return (
    <SidebarProvider>
      <div className="dark">
        <AppSidebar />
      </div>
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-5 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
