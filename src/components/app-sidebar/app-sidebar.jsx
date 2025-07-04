import {
	Calendar,
	ChevronDown,
	ChevronUp,
	Home,
	Inbox,
	Phone,
	Settings,
	User2,
	UserRoundCog,
	UsersRound,
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

// Menu items.
const items = [
	{
		title: "Home",
		icon: Home,
		url: "/admin/dashboard",
	},
	{
		title: "Inbox",
		icon: Inbox,
		url: "/admin/inbox",
	},
	{
		title: "Calendar",
		icon: Calendar,
		url: "/admin/calendar",
	},
	{
		title: "Careers",
		icon: UsersRound,
		url: "/admin/careers",
	},
];

const itemsHelp = [
	{
		title: "Contact",
		icon: Phone,
		url: "/admin/contact",
	},
	{
		title: "Settings",
		icon: Settings,
		url: "/admin/settings",
	},
];

export function AppSidebar() {
	const { state } = useSidebar();
	const isCollapsed = state === "collapsed";
	const location = useLocation();

	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
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
														{item.title}
													</span>
												</Link>
											</SidebarMenuButton>
										</TooltipTrigger>
										<TooltipContent
											side="right"
											className={isCollapsed ? "block" : "hidden"}
										>
											{item.title}
										</TooltipContent>
									</Tooltip>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
						<Collapsible
							defaultOpen
							className="group/collapsible"
						>
							<SidebarGroup>
								<SidebarGroupLabel asChild>
									<CollapsibleTrigger>
										Help
										<ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
									</CollapsibleTrigger>
								</SidebarGroupLabel>
								<CollapsibleContent className="group-data-[collapsible=icon]:hidden">
									<SidebarGroupContent>
										<SidebarMenu className="group-data-[collapsible=icon]:shadow-none shadow-[-4px_0_2px_-2px_rgba(0,0,0,0.3)]">
											{itemsHelp.map((item) => (
												<SidebarMenuItem key={item.title}>
													<Tooltip>
														<TooltipTrigger asChild>
															<SidebarMenuButton asChild>
																<Link
																	to={item.url}
																	className={`group-data-[collapsible=icon]:justify-center ${
																		location.pathname ===
																		item.url
																			? "bg-gray-100"
																			: ""
																	}`}
																>
																	<item.icon />
																	<span className="group-data-[collapsible=icon]:hidden">
																		{item.title}
																	</span>
																</Link>
															</SidebarMenuButton>
														</TooltipTrigger>
														<TooltipContent
															side="right"
															className={
																isCollapsed ? "block" : "hidden"
															}
														>
															{item.title}
														</TooltipContent>
													</Tooltip>
												</SidebarMenuItem>
											))}
										</SidebarMenu>
									</SidebarGroupContent>
								</CollapsibleContent>
							</SidebarGroup>
						</Collapsible>
					</SidebarGroupContent>
				</SidebarGroup>
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
