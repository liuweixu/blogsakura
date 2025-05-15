import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

// This is sample data.
const data = {
  navMain: [
    {
      title: "个人博客后台管理系统",
      url: "/",
      items: [
        {
          title: "首页",
          url: "/home",
          isActive: false,
        },
        {
          title: "文章管理",
          url: "/article",
          isActive: true,
        },
        {
          title: "发表文章",
          url: "/publish",
          isActive: false,
        },
        {
          title: "设置",
          url: "/setting",
          isActive: false,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();
  const navigate = useNavigate();
  const menuClick = (route: {
    title?: string;
    url: string;
    isActive?: boolean;
  }) => {
    navigate(route.url);
  };
  return (
    <div>
      <Sidebar {...props}>
        <SidebarHeader></SidebarHeader>
        <SidebarContent>
          {data.navMain.map((item) => (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          onClick={() => {
                            menuClick(item);
                          }}
                          className={classNames({
                            "bg-accent text-accent-foreground font-bold shadow-md bg-primary/15":
                              location.pathname === item.url,
                            "hover:bg-accent/00":
                              location.pathname !== item.url,
                          })}
                        >
                          {item.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarRail />
      </Sidebar>
    </div>
  );
}
