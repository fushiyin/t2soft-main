import CTA from "@/components/sections/ContactCTA";
import { SECTIONS_KEY } from "@/constant/sideNavigation";
import Challenges from "./components/Challenges";
import FocusedIndustries from "./components/FocusedIndustries";
import Hero from "./components/Hero";
import OurProcess from "./components/OurProcess";
import Services from "./components/Services";
import SideNavigation from "./components/SideNavigation";
import WhyVietnam from "./components/WhyVietnam";
import DevelopmentCapacity from "./components/DevelopmentCapacity";
import VideoIntro from "./components/VideoIntro";
import particle from "@/assets/image/particle.gif";
import bg from "@/assets/image/bg.jpg";
import bg1 from "@/assets/image/bg1.jpg";
import background from "@/assets/image/background.jpg";
import video from "@/assets/video/trading.mp4";
import MyHero from "./components/MyHero";
import YouTubePlaylist from "./components/YouTubePlaylist";
import Courses from "./components/Courses"
import CoursesHighlight from "./component/CoursesHighlight"
import CoursesSlider from "./component/CoursesSlider"
import WebIntro from "./component/WebIntro";
import Testimonials from "./component/Testimonials";
import Partner from "./component/Partner";
import ContactMe from "./component/ContactMe";
import MyCourses from "./component/MyCourses";

export const sectionClass = "flex items-center justify-center relative overflow-hidden";
export const contentClass = "container h-full px-4 py-16 md:px-6 max-w-[1440px]";

function HomePage() {
	return (
		<>
			<WebIntro />
			<Partner />
			<CoursesSlider />
			<CoursesHighlight />
			<Testimonials />
			<ContactMe />
		</>
	);
}

export default HomePage;
