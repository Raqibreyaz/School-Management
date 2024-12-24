import { AiOutlineDashboard as DashboardIcon } from "react-icons/ai";
import { FaBookBookmark as ChapterIcon } from "react-icons/fa6";
import { PiNotebookBold as StudentIcon } from "react-icons/pi";
import { IoMdHelpCircleOutline as HelpIcon } from "react-icons/io";
import { AiOutlinePieChart as ReportsIcon } from "react-icons/ai";
import { RiSettingsLine as SettingsIcon } from "react-icons/ri";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSidebar } from "@/state/useSidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: DashboardIcon,
  },
  {
    title: "Students",
    url: "#",
    icon: StudentIcon,
  },
  {
    title: "Chapter",
    url: "#",
    icon: ChapterIcon,
  },
  {
    title: "Help",
    url: "#",
    icon: HelpIcon,
  },
  {
    title: "Reports",
    url: "#",
    icon: ReportsIcon,
  },
  {
    title: "Settings",
    url: "#",
    icon: SettingsIcon,
  },
];

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const { sidebarOpen } = useSidebar();

  return (
    <SidebarProvider open={sidebarOpen}>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <img
            src="/logo.png"
            className={`${!sidebarOpen && "hidden"} mt-4 h-10 w-20`}
            alt=""
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="p-2 gap-y-5">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span className="text-lg font-semibold">
                          {item.title}
                        </span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main>{children}</main>
    </SidebarProvider>
  );
}
