import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

export default function SidebarLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
    </SidebarProvider>
  )
}
