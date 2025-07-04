import intro_1 from "@/assets/solution_img/intro_1.json";
import intro_2 from "@/assets/solution_img/intro_2.json";
import intro_3 from "@/assets/solution_img/intro_3.json";
import item_2_1 from "@/assets/solution_img/item_2_1.png";
import item_2_2 from "@/assets/solution_img/item_2_2.png";
import item_2_3 from "@/assets/solution_img/item_2_3.png";
import item_3_1 from "@/assets/solution_img/item_3_1.png";
import item_3_2 from "@/assets/solution_img/item_3_2.png";
import item_3_3 from "@/assets/solution_img/item_3_3.png";
import reservation_1 from "@/assets/solution_img/so_reservation_1.png";
import reservation_2 from "@/assets/solution_img/so_reservation_2.png";
import reservation_3 from "@/assets/solution_img/so_reservation_3.png";
import item_1_icon from "@/assets/solution_img/tab_item_1_icon.json";
import item_2_icon from "@/assets/solution_img/tab_item_2_icon.json";
import cafe_1 from "@/assets/solution_img/cafe_1.jpg";
import cafe_3 from "@/assets/solution_img/cafe_3.jpg";

import i18n from "i18next";

export const SOLUTION_DETAILS = [
	{
		id: "Smart_Office",
		banner: i18n.t("solution.so.banner.header"),
		title: i18n.t("solution.so.banner.title", { returnObjects: true }),
		description: i18n.t("solution.so.banner.desc"),
		button: i18n.t("solution.so.banner.contact_us"),
		boxIntro: {
			1: {
				title: i18n.t("solution.so.boxIntro.1.title"),
				desc: i18n.t("solution.so.boxIntro.1.desc"),
				icon: intro_1,
			},
			2: {
				title: i18n.t("solution.so.boxIntro.2.title"),
				desc: i18n.t("solution.so.boxIntro.2.desc"),
				icon: intro_2,
			},
			3: {
				title: i18n.t("solution.so.boxIntro.3.title"),
				desc: i18n.t("solution.so.boxIntro.3.desc"),
				icon: intro_3,
			},
		},
		officeIntro: {
			title_1: i18n.t("solution.so.officeIntro.title_1"),
			title_2: i18n.t("solution.so.officeIntro.title_2"),
			desc: i18n.t("solution.so.officeIntro.desc"),
		},
		video: {
			title: i18n.t("solution.so.video.title", { returnObjects: true }),
		},
		menu_sub: {
			header: {
				1: i18n.t("solution.so.tab.1.tab_sub"),
				2: i18n.t("solution.so.tab.2.tab_sub"),
				3: i18n.t("solution.so.tab.3.tab_sub"),
				4: i18n.t("solution.so.tab.4.tab_sub"),
			},
			1: {
				title: i18n.t("solution.so.tab.1.title"),
				item: {
					1: {
						title: i18n.t("solution.so.tab.1.item.1.title"),
						desc: i18n.t("solution.so.tab.1.item.1.desc"),
						icon: item_1_icon,
					},
					2: {
						title: i18n.t("solution.so.tab.1.item.2.title"),
						desc: i18n.t("solution.so.tab.1.item.2.desc"),
						icon: item_1_icon,
					},
					3: {
						title: i18n.t("solution.so.tab.1.item.3.title"),
						desc: i18n.t("solution.so.tab.1.item.3.desc"),
						icon: item_1_icon,
					},
				},
				img_1: reservation_1,
				img_2: reservation_2,
				img_3: reservation_3,
			},
			2: {
				title: i18n.t("solution.so.tab.2.title"),
				item: {
					1: {
						title: i18n.t("solution.so.tab.2.item.1.title"),
						desc: i18n.t("solution.so.tab.2.item.1.desc"),
						icon: item_2_icon,
					},
					2: {
						title: i18n.t("solution.so.tab.2.item.2.title"),
						desc: i18n.t("solution.so.tab.2.item.2.desc"),
						icon: item_2_icon,
					},
					3: {
						title: i18n.t("solution.so.tab.2.item.3.title"),
						desc: i18n.t("solution.so.tab.2.item.3.desc"),
						icon: item_2_icon,
					},
					4: {
						title: i18n.t("solution.so.tab.2.item.4.title"),
						desc: i18n.t("solution.so.tab.2.item.4.desc"),
						icon: item_2_icon,
					},
				},
				img_1: item_2_1,
				img_2: item_2_2,
				img_3: item_2_3,
			},
			3: {
				title: i18n.t("solution.so.tab.3.title"),
				item: {
					1: {
						title: i18n.t("solution.so.tab.3.item.1.title"),
						desc: i18n.t("solution.so.tab.3.item.1.desc"),
						icon: item_1_icon,
					},
					2: {
						title: i18n.t("solution.so.tab.3.item.2.title"),
						desc: i18n.t("solution.so.tab.3.item.2.desc"),
						icon: item_1_icon,
					},
				},
				img_1: item_3_1,
				img_2: item_3_2,
				img_3: item_3_3,
			},
			4: {
				title: i18n.t("solution.so.tab.4.title"),
				item: {
					1: {
						title: i18n.t("solution.so.tab.4.item.1.title"),
						desc: i18n.t("solution.so.tab.4.item.1.desc"),
						icon: item_2_icon,
					},
					2: {
						title: i18n.t("solution.so.tab.4.item.2.title"),
						desc: i18n.t("solution.so.tab.4.item.2.desc"),
						icon: item_2_icon,
					},
					3: {
						title: i18n.t("solution.so.tab.4.item.3.title"),
						desc: i18n.t("solution.so.tab.4.item.3.desc"),
						icon: item_2_icon,
					},
					4: {
						title: i18n.t("solution.so.tab.4.item.4.title"),
						desc: i18n.t("solution.so.tab.4.item.4.desc"),
						icon: item_2_icon,
					},
				},
				img_1: cafe_1,
				img_3: cafe_3,
			},
		},
	},
];
