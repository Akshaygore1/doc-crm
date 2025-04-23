import { getServerSession } from "next-auth";
import { option } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "@/components/ui/sonner";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(option);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="p-4 w-full">
        <SidebarTrigger />
        {children}
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
