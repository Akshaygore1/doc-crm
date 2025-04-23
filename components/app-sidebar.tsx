"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  ChevronsUpDown,
  Command,
  Database,
  Frame,
  GalleryVerticalEnd,
  Home,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  User,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "@/components/nav-user";
import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { useSession } from "next-auth/react";

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Database,
    },
    {
      title: "Admin Dashboard",
      url: "/admin-dashboard",
      icon: Bot,
    },
    {
      title: "Documentation",
      url: "/documentation",
      icon: BookOpen,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex flex-row ">
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
          <Home className="size-4" />
        </div>
        <div className="grid flex-1 items-center text-left text-sm leading-tight">
          <span className="truncate font-semibold">Doctor Buddy</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            session?.user?.role === "ADMIN"
              ? data.navMain
              : data.navMain.filter((item) => item.title !== "Admin Dashboard")
          }
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: session?.user?.name || "User",
            email: session?.user?.email || "",
            avatar: session?.user?.image || "",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
