import { Outlet, useNavigate } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { TbLogout } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "@/ui-backend/store/modules/user";

export function Layout() {
  const dispatch = useDispatch();

  //退出登录
  const navigator = useNavigate();
  const LoginOut = () => {
    dispatch(clearUserInfo());
    navigator("/login");
  };
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="w-full flex justify-end gap-2 items-center">
            <span>
              <Popover>
                <PopoverTrigger asChild>
                  <TbLogout className="w-4 h-4" title="是否确认退出" />
                </PopoverTrigger>
                <PopoverContent className="w-60 p-4">
                  <div className="space-y-2">
                    <p className="font-medium">是否确认退出？</p>
                    <p className="text-sm text-muted-foreground">
                      此操作不可撤销。
                    </p>
                    <div className="flex justify-end gap-2 mt-2">
                      <Button variant="outline" size="sm">
                        取消
                      </Button>
                      <Button variant="outline" size="sm" onClick={LoginOut}>
                        退出
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </span>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
