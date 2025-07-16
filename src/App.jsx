import "@/i18n";
import AppRouter from "@/routes";
import "lenis/dist/lenis.css";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Newsletter from '@/views/Home/component/Newsletter'

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

	return (
		<>
			{/* <div className="aurora-bg" /> */}
			<div className="bg-[#01070c]"/>
			<AppRouter />
		</>
	);
}

export default App;
