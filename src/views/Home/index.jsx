import CoursesSlider from "./component/CoursesSlider";
import WebIntro from "./component/WebIntro";
import Partner from "./component/Partner";
import Testimonials from "./component/Testimonials";
import SloganRunning from "./component/SloganRunning";
import Courses from "@/components/Courses";

export const sectionClass = "flex items-center justify-center relative overflow-hidden";
export const contentClass = "container h-full px-4 py-16 md:px-6 max-w-[1440px]";

function HomePage() {
	return (
		<>
			<WebIntro />
			<Partner />
			<CoursesSlider />
			<Courses />
			<SloganRunning />
			<Testimonials />
		</>
	);
}

export default HomePage;
