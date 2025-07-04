import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import Eng from "./languages/en.json";
import Vie from "./languages/vi.json";

// Only Vietnamese and English
const resources = {
	en: {
		translation: Eng,
	},
	vi: {
		translation: Vie,
	},
};

i18n
	// load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
	// learn more: https://github.com/i18next/i18next-http-backend
	// want your translations to be loaded from a professional CDN? => https://github.com/locize/react-tutorial#step-2---use-the-locize-cdn
	// detect user language
	// learn more: https://github.com/i18next/i18next-browser-languageDetector
	.use(LanguageDetector)
	// pass the i18n instance to react-i18next.
	.use(initReactI18next)
	// init i18next
	// for all options read: https://www.i18next.com/overview/configuration-options
	.init({
		fallbackLng: "vi",
		supportedLngs: ["vi", "en"],
		debug: window.location.hostname === "localhost",
		interpolation: {
			escapeValue: false, // not needed for react as it escapes by default
		},
		detection: {
			order: ["localStorage", "navigator"], // Priority: localStorage first, then browser language
		},
		resources,
	});

export default i18n;
