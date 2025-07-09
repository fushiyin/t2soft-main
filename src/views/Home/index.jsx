import CTA from "@/components/sections/ContactCTA";
import { SECTIONS_KEY } from "@/constant/sideNavigation";
import Challenges from "./components/Challenges";
import FocusedIndustries from "./components/FocusedIndustries";
import Hero from "./components/Hero";
import OurProcess from "./components/OurProcess";
import Services from "./components/Services";
import SideNavigation from "./components/SideNavigation";
import Testimonials from "./components/Testimonials";
import WhyVietnam from "./components/WhyVietnam";
import DevelopmentCapacity from "./components/DevelopmentCapacity";
import VideoIntro from "./components/VideoIntro";
import Blog from "./components/Blog";

export const sectionClass = "flex items-center justify-center relative overflow-hidden";
export const contentClass = "container h-full px-4 py-16 md:px-6 max-w-[1440px]";

function HomePage() {
	return (
		<>
			<section id={SECTIONS_KEY.HERO.id}>
				<Hero />
			</section>
			<section>
				<VideoIntro />
			</section>
			<section>
				<Blog />
			</section>
			<section id={SECTIONS_KEY.CHALLENGES.id}>
				<Challenges />
			</section>
			<section id={SECTIONS_KEY.WHY_VIETNAM.id}>
				<WhyVietnam />
			</section>
			<section id={SECTIONS_KEY.TESTIMONIALS.id}>
				<Testimonials contentClass={contentClass} />
			</section>
			<SideNavigation />
		</>
	);
}

export default HomePage;
