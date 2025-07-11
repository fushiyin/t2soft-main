import { AppSidebar } from "@/components/app-sidebar/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate, Outlet } from "react-router";

export default function Admin() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
			if (!user) {
				navigate("/login", { replace: true });
			} else if (
				user.providerData[0]?.providerId === "google.com" &&
				!["thehungdzhome@gmail.com", "trucongftu@gmail.com"].includes(user.email)
			) {
				alert("Access denied: Only specific Google accounts can access admin.");
				auth.signOut();
				navigate("/login", { replace: true });
			}
		});
		return () => unsubscribe();
	}, [navigate]);

	if (loading) return null;
	if (!user) return null;

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
