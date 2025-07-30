import WebIntro from "./component/WebIntro";
import Partner from "./component/Partner";
import Testimonials from "./component/Testimonials";
import SloganRunning from "./component/SloganRunning";
import CoursesSlider from "./component/CoursesSlider";
import BlogPosts from "./component/BlogPosts";
import BlogTest from "./component/BlogTest";

export const sectionClass = "flex items-center justify-center relative overflow-hidden";
export const contentClass = "container h-full px-4 py-16 md:px-6 max-w-[1440px]";

function HomePage() {
	return (
		<div className="overflow-x-hidden">
			<WebIntro />
			{/* <Partner /> */}
			<CoursesSlider />
			<BlogTest />
			<BlogPosts />
			<SloganRunning />
			<div className="w-full">
				<Testimonials />
			</div>
		</div>
	);
}

export default HomePage;
