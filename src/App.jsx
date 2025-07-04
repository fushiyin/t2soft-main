import "@/i18n";
import AppRouter from "@/routes";
import "lenis/dist/lenis.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

function App() {
	const { i18n } = useTranslation();
	const [isLanguageReady, setIsLanguageReady] = useState(false);

	useEffect(() => {
		const storedLanguage = localStorage.getItem("language");

		if (storedLanguage && i18n.language !== storedLanguage) {
			i18n.changeLanguage(storedLanguage).then(() => {
				setIsLanguageReady(true);
			});
		} else if (!storedLanguage) {
			i18n.changeLanguage("ko").then(() => {
				localStorage.setItem("language", "ko");
				setIsLanguageReady(true);
			});
		} else {
			setIsLanguageReady(true);
		}
	}, [i18n]);

	if (!isLanguageReady) {
		return null;
	}

	return <AppRouter />;
}

export default App;
