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
import { Link, useLocation } from "react-router-dom";

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

	return (
		<Sidebar>
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
															location.pathname === item.url
																? "bg-gray-100"
																: ""
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
				<SidebarMenu>
					<SidebarMenuItem>
						<Tooltip>
							<TooltipTrigger asChild>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<SidebarMenuButton>
											<UserRoundCog />
											Username
											<ChevronUp className="ml-auto" />
										</SidebarMenuButton>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										side="top"
										className="w-[250px] p-4 shadow-lg bg-white dark:bg-gray-800"
									>
										<DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
											<span>Account</span>
										</DropdownMenuItem>
										<DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
											<span>Billing</span>
										</DropdownMenuItem>
										<DropdownMenuItem className="cursor-pointer hover:bg-gray-100">
											<span>Sign out</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</TooltipTrigger>
							<TooltipContent
								side="right"
								className={isCollapsed ? "block" : "hidden"}
							>
								Username
							</TooltipContent>
						</Tooltip>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
