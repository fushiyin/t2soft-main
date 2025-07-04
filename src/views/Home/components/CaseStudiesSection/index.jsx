import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import CaseStudyCard from "./CaseStudyCard";
const data = [
	{
		id: 1,
		title: "Smart Office – A Company",
		description:
			"This solution supports web, mobile (iOS/Android), kiosk, and wallpad platforms, enabling flexible office space use anytime, anywhere. It enhances operational efficiency and user convenience by digitalizing key functions like custom seating and meeting room booking",
		category: "E-commerce",
		image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5f8fffbed5d74b02e2e01bf4813f50575b941330",
		technologies: "Vue.js, Vuex, Vue Router, Vuetify, ApexCharts, HTML/CSS, JavaScript, Axios",
	},
	{
		id: 2,
		title: "Financial Web Portal - F Project",
		description:
			"The client aimed to provide users with fast, easy access to financial information. We developed a unified web and mobile platform with efficient search functions and intuitive UI/UX for an optimal user experience.",
		category: "E-commerce",
		image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5f8fffbed5d74b02e2e01bf4813f50575b941330",
		technologies: "Vue.js, Vuex, Vue Router, Vuetify, ApexCharts, HTML/CSS, JavaScript, Axios",
	},
	{
		id: 3,
		title: "Smart Office – A Company",
		description:
			"The client aimed to provide users with fast, easy access to financial information. We developed a unified web and mobile platform with efficient search functions and intuitive UI/UX for an optimal user experience.",
		category: "E-commerce",
		image: "https://cdn.builder.io/api/v1/image/assets/TEMP/5f8fffbed5d74b02e2e01bf4813f50575b941330",
		technologies: "Vue.js, Vuex, Vue Router, Vuetify, ApexCharts, HTML/CSS, JavaScript, Axios",
	},
];

const CaseStudiesSection = () => {
	return (
		<div className="w-full bg-white mt-2">
			<div className="mx-auto max-w-[1440px]">
				<header className="mb-20 text-center flex flex-col items-center justify-center">
					<h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-5xl text-dark-gray">
						Case Studies
					</h2>
					<p className="max-w-[900px] mg- text-xl font-light leading-6" style={{ color: 'var(--muted-foreground)' }}>
						{" "}
						Explore our successful projects and see how we&apos;ve helped businesses
						achieve their goals.
					</p>
				</header>

				<div className="grid gap-12 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-10">
					{data.map((item) => (
						<motion.div
							key={item.id}
							initial="offscreen"
							whileInView="onscreen"
							viewport={{ once: true, amount: 0.2 }}
						>
							<CaseStudyCard item={item} />
						</motion.div>
					))}
				</div>

				<div className="flex justify-center">
					<div
						className="
      group flex gap-2.5 items-center px-4 py-2 text-sm font-bold rounded-md
      shadow-sm bg-foreground text-white cursor-pointer
      transition-all duration-300 ease-in-out
      hover:bg-gradient-to-r hover:from-dark-blue hover:to-SecondaryBg
      hover:shadow-lg hover:scale-105
      "
					>
						View All
						<ArrowRightIcon className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default CaseStudiesSection;
