import { idRouter } from "@/routes/idRouter";

export const FOOTER = Object.freeze({
	PHONE_KR: "(KR) +82 10 4029 6760",
	PHONE_VN: "(VN) +84 984 113 769",
	EMAIL_1: "(KR) ygkim@ttwosoft.com",
	EMAIL_2: "(VN) dungnt@ttwosoft.com",
	WEB_SITE: "https://www.ttwosoft.com",
	ADDRESS: "Keangnam Landmark72, Pham Hung, Nam tu Liem, Ha Noi",
});

export const FOOTER_SECTIONS = [
	{
		id: "company",
		titleKey: "footer.company",
		links: [
			{ to: idRouter?.about, i18nKey: "menu.about" },
			{ to: idRouter?.career, i18nKey: "menu.careers" },
			{ to: idRouter?.contact, i18nKey: "menu.contact" },
		],
	},
	{
		id: "resources",
		titleKey: "footer.resources",
		links: [
			{ to: idRouter?.blog, i18nKey: "menu.blog" },
			{ to: idRouter?.documentation, i18nKey: "footer.documentation" },
		],
	},
	{
		id: "studies",
		titleKey: "footer.studies",
		links: [
			{ to: idRouter?.privacy, i18nKey: "footer.privacy" },
			// { to: idRouter?.terms, i18nKey: "footer.terms" },
		],
	},
];
