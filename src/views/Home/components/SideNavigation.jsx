import { SECTIONS, SECTIONS_KEY } from "@/constant/sideNavigation";
import { smoothScrollTo } from "@/lib/utils";
import { useEffect, useState } from "react";

const SideNavigation = () => {
	const [activeSection, setActiveSection] = useState(null);

	useEffect(() => {
		const handleScroll = () => {
			const scrollY = window.scrollY;
			const header = document.querySelector("header");
			const headerHeight = header?.offsetHeight || 0;
			const viewportMiddle = scrollY + window.innerHeight / 2 - headerHeight;
			let currentSection = null;
			for (let section of SECTIONS) {
				const el = document.getElementById(section.id);
				if (el) {
					const offsetTop = el.offsetTop;
					const offsetHeight = el.offsetHeight;
					if (viewportMiddle >= offsetTop && viewportMiddle < offsetTop + offsetHeight) {
						currentSection = section.id;
						break;
					}
				}
			}
			if (currentSection) {
				setActiveSection(currentSection);
			} else {
				setActiveSection(null);
			}
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // set initial
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			const y = section.offsetTop;
			smoothScrollTo(y - 60, 800);
		}
	};

	const shouldHideNav =
		activeSection === SECTIONS_KEY.HERO.id ||
		activeSection === SECTIONS_KEY.TESTIMONIALS.id ||
		activeSection === null;

	return (
		<nav
			className={`
				fixed left-0 flex flex-col items-center h-[300px] top-[271px] w-[60px] max-md:hidden z-50
				transition-opacity duration-500 ease-in-out
				${shouldHideNav ? "opacity-0 pointer-events-none" : "opacity-100"}
			`}
			aria-label="Page sections"
		>
			{SECTIONS.map((section, idx) => (
				<div key={section.id}>
					{idx !== 0 && (
						<div className="flex justify-center w-full">
							<div className="w-px h-8 bg-foreground/50" />
						</div>
					)}
					<div className="relative group flex items-center justify-center">
						<button
							onClick={() => scrollToSection(section.id)}
							className={`w-7 h-7 text-sm font-bold rounded-full text -tracking-wider flex items-center justify-center cursor-pointer transition-colors border-1 border-foreground hover:text-white ${
								activeSection === section.id
									? "bg-foreground text-slate-200"
									: "bg-white text-light hover:bg-foreground"
							}`}
							aria-label={`Go to ${section.id}`}
						>
							{section.label}
						</button>
						<span className="absolute left-9 capitalize bg-foreground text-white text-xs px-2 py-1 rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
							{section?.name || section?.id?.replace(/-/g, " ")}
						</span>
					</div>
				</div>
			))}
		</nav>
	);
};

export default SideNavigation;
