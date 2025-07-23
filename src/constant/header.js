import { idRouter } from "@/routes/idRouter";
import { Home, Users, Briefcase, Layers, Newspaper, Contact, BadgeCheck } from "lucide-react";

export const NAV_LINKS = [
	{
		name: "Home",
		path: idRouter?.home,
		i18nKey: "menu.home",
		icon: Home,
	},
	{
		name: "Courses",
		path: idRouter?.courses || "/courses",
		i18nKey: "menu.courses",
		icon: Briefcase,
		dropdown: [
			{ name: "All Courses", path: "/courses", i18nKey: "menu.courses_all" },
			{ name: "My Courses", path: "/my-courses", i18nKey: "menu.courses_my" },
		],
	},
	{
		name: "Blog",
		path: idRouter?.blog,
		i18nKey: "menu.blog",
		icon: Newspaper,
		dropdown: [
			{ name: "All Posts", path: "/blog", i18nKey: "menu.blog_all" },
			{ name: "Categories", path: "/blog/categories", i18nKey: "menu.blog_categories" },
		],
	},
	{
		name: "Documents",
		path: idRouter?.category,
		i18nKey: "menu.documents",
		icon: Newspaper,
	},
	{
		name: "Community",
		path: "/community",
		i18nKey: "menu.community",
		icon: Users,
		dropdown: [
			{ name: "Forum", path: "/community/forum", i18nKey: "menu.community_forum" },
			{ name: "Events", path: "/community/events", i18nKey: "menu.community_events" },
		],
	},
	{
		name: "member",
		path: idRouter?.member,
		i18nKey: "menu.member",
		icon: Contact,
	},
];
