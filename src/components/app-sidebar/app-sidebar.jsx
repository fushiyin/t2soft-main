import {
	Users,
	Shield,
	BookOpen,
	FileText,
	MessageSquare,
	CreditCard,
	BarChart2,
	Package,
	Settings,
	FileWarning,
	List,
	AlertTriangle,
	ThumbsUp,
	ChevronUp,
	UserRoundCog,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const sidebarSections = [
	{
		label: "Người dùng",
		icon: Users,
		items: [
			{ label: "Quản lý user", icon: List, url: "/admin/users" },
			{
				label: "Phân quyền (admin / giảng viên / học viên)",
				icon: Shield,
				url: "/admin/roles",
			},
		],
	},
	{
		label: "Học tập",
		icon: BookOpen,
		items: [
			{ label: "Post", icon: FileText, url: "/admin/posts" },
			{ label: "Reaction", icon: ThumbsUp, url: "/admin/reactions" },
			{ label: "Khóa học", icon: BookOpen, url: "/admin/courses" },
			{ label: "Bài học", icon: FileText, url: "/admin/lessons" },
			{ label: "Phòng thảo luận", icon: MessageSquare, url: "/admin/discussions" },
		],
	},
	{
		label: "Tài chính (nếu có)",
		icon: CreditCard,
		items: [
			{ label: "Thanh toán", icon: CreditCard, url: "/admin/payments" },
			{ label: "Doanh thu", icon: BarChart2, url: "/admin/revenue" },
			{ label: "Gói học tập", icon: Package, url: "/admin/packages" },
		],
	},
	{
		label: "Hệ thống",
		icon: Settings,
		items: [
			{ label: "Cấu hình chung", icon: Settings, url: "/admin/settings" },
			{ label: "Logs", icon: FileWarning, url: "/admin/logs" },
			{ label: "Báo cáo nội dung vi phạm", icon: AlertTriangle, url: "/admin/reports" },
		],
	},
];

export function AppSidebar() {
	const { state } = useSidebar();
	const isCollapsed = state === "collapsed";
	const location = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useState(null);
	const [showToast, setShowToast] = useState(false);

	useEffect(() => {
		import("firebase/auth").then(({ onAuthStateChanged }) => {
			onAuthStateChanged(auth, (u) => setUser(u));
		});
	}, []);

	const handleSignOut = async () => {
		setShowToast(true);
		await signOut(auth);
		setTimeout(() => setShowToast(false), 1500);
		navigate("/login", { replace: true });
	};

	return (
		<Sidebar
			className="backdrop-blur-lg bg-white/60 dark:bg-[#181a20]/60 border-r border-gray-200 dark:border-gray-800 shadow-xl transition-all duration-300"
		>
			<SidebarContent>
				{sidebarSections.map((section) => (
					<SidebarGroup key={section.label}>
						<SidebarGroupLabel>
							<section.icon className="w-4 h-4 mr-2 text-pink-500 inline-block" />
							{section.label}
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{section.items.map((item) => (
									<SidebarMenuItem key={item.label}>
										<Tooltip>
											<TooltipTrigger asChild>
												<SidebarMenuButton asChild>
													<Link
														to={item.url}
														className={`group-data-[collapsible=icon]:justify-center ${
															location.pathname === item.url ? "bg-gradient-to-r from-pink-500/10 to-orange-400/10 dark:from-pink-700/20 dark:to-orange-700/20" : ""
														}`}
													>
														<item.icon />
														<span className="group-data-[collapsible=icon]:hidden">
															{item.label}
														</span>
													</Link>
												</SidebarMenuButton>
											</TooltipTrigger>
											<TooltipContent
													 side="right"
													 className={isCollapsed ? "block" : "hidden"}
											>
													{item.label}
												</TooltipContent>
										</Tooltip>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
			<SidebarFooter>
				<div className="flex flex-col items-center gap-2 p-4">
					{user && (
						<div className="flex flex-col items-center w-full">
							<img
								src={user.photoURL || "https://ui-avatars.com/api/?name=User"}
								alt="avatar"
								className="w-12 h-12 rounded-full border-2 border-pink-400 shadow-md mb-2 bg-white/80 dark:bg-gray-900/80 object-cover"
							/>
							<span className="font-semibold text-gray-900 dark:text-white text-sm truncate w-full text-center">
								{user.displayName || user.email}
							</span>
							<span className="text-xs text-gray-500 dark:text-gray-400 truncate w-full text-center">
								{user.email}
							</span>
						</div>
					)}
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton className="w-full mt-2 bg-white/70 dark:bg-gray-900/70 hover:bg-pink-100 dark:hover:bg-pink-900/30 border border-gray-200 dark:border-gray-800 shadow rounded-lg flex items-center justify-center gap-2">
								<UserRoundCog className="text-pink-500" />
								<span>Account</span>
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							side="top"
							className="w-[250px] p-4 shadow-2xl rounded-2xl bg-white/80 dark:bg-gray-900/90 border border-gray-200 dark:border-gray-800 backdrop-blur-lg"
						>
							<DropdownMenuItem className="cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900/30 rounded flex items-center gap-2">
								<UserRoundCog className="text-pink-500" />
								<span>Profile</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer hover:bg-pink-100 dark:hover:bg-pink-900/30 rounded flex items-center gap-2">
								<Settings className="text-gray-500" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuItem className="cursor-pointer hover:bg-red-100 dark:hover:bg-red-900/30 rounded flex items-center gap-2" onClick={handleSignOut}>
								<svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" /></svg>
								<span className="text-red-500">Sign out</span>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
				{showToast && (
					<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-2xl bg-white/90 dark:bg-gray-900/90 border border-pink-400 text-pink-600 dark:text-pink-300 font-semibold backdrop-blur-lg animate-fadeIn">
						Signing out...
					</div>
				)}
			</SidebarFooter>
		</Sidebar>
	);
}
