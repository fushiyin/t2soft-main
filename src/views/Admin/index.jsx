import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router";

export default function Admin() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<main className="flex-1 overflow-auto">
				<SidebarTrigger />
				<Outlet />
			</main>
		</SidebarProvider>
	);
}
