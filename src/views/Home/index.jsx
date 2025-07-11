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
import particle from "@/assets/image/particle.gif";
import bg from "@/assets/image/bg.jpg";
import background from "@/assets/image/pxfuel.jpg";
import video from "@/assets/video/trading.mp4";
import MyHero from "./components/MyHero";
import YouTubePlaylist from "./components/YouTubePlaylist";

export const sectionClass = "flex items-center justify-center relative overflow-hidden";
export const contentClass = "container h-full px-4 py-16 md:px-6 max-w-[1440px]";

function HomePage() {
	return (
		<>
			<section>
				<MyHero />
			</section>
			<YouTubePlaylist />
			<section id={SECTIONS_KEY.HERO.id}>
				<Hero />
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
