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
import CompetitiveEdges from "./components/CompetitiveEdges";
import DevelopmentCapacity from "./components/DevelopmentCapacity";

export const sectionClass = "flex items-center justify-center relative overflow-hidden";
export const contentClass = "container h-full px-4 py-16 md:px-6 max-w-[1440px]";

function HomePage() {
	return (
		<>
			<section
				id={SECTIONS_KEY.HERO.id}
				className={sectionClass + " h-screen"}
			>
				<Hero />
			</section>
			<section
				id={SECTIONS_KEY.CHALLENGES.id}
				className={`${sectionClass} h-auto md:min-h-[960px] xl:h-screen`}
			>
				<Challenges />
			</section>
			<section
				id={SECTIONS_KEY.WHY_VIETNAM.id}
				// className={sectionClass}
			>
				<WhyVietnam />
			</section>
			<section
				id={SECTIONS_KEY.SERVICES.id}
				className={sectionClass}
			>
				<Services contentClass={contentClass} />
			</section>
			<section
				id={SECTIONS_KEY.FOCUSED_INDUSTRIES.id}
				className={sectionClass}
			>
				<FocusedIndustries contentClass={contentClass} />
			</section>

			<section
				id={SECTIONS_KEY.DEVELOPMENT_CAPACITY.id}
				className={sectionClass}
			>
				<DevelopmentCapacity contentClass={contentClass} />
			</section>
			<section
				id={SECTIONS_KEY.COMPETITIVE_EDGE.id}
				className={sectionClass}
			>
				<CompetitiveEdges />
			</section>
			<section
				id={SECTIONS_KEY.OUR_PROCESS.id}
				className={sectionClass}
			>
				<OurProcess contentClass={contentClass} />
			</section>
			<section
				id={SECTIONS_KEY.TESTIMONIALS.id}
				className={sectionClass}
			>
				<Testimonials contentClass={contentClass} />
			</section>

			<section
				id="contact-section"
				className="flex items-center justify-center"
			>
				<CTA />
			</section>
			{/* <section className="snap-start flex items-center justify-center 
			px-16 h-[calc(100vh-64px)]">
				<ContactCTA />
				<LoadingDemoButton />
				<ResetOnBoardingButton />
			</section> */}
			<SideNavigation />
		</>
	);
}

export default HomePage;
