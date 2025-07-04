import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<main className="flex-1 overflow-auto">
					<SidebarTrigger />
					<Outlet />
				</main>
			</SidebarProvider>
		</>
	);
}
