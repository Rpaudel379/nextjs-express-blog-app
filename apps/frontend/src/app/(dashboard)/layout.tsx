import DashboardSidebar from "@components/dashboard/SideBar";
import { SidebarProvider, SidebarTrigger } from "@components/ui/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="w-full min-h-full mt-2 p-2">
        <SidebarTrigger />
        {children}
      </div>
    </SidebarProvider>
  );
}
