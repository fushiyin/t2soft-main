import video_services from "@/assets/video/Services.mp4";
import AnimatedSection from "@/components/AnimatedSection";
import CTA from "@/components/sections/ContactCTA";
import DotLoader from "@/components/ui/DotLoader";
import { SECTIONS_KEY } from "@/constant/sideNavigation";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, BrainCircuit, Code, Database, Globe, Layers } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router";
import { contentClass, sectionClass } from "../Home";
import CompetitiveEdges from "../Home/components/CompetitiveEdges";
import DevelopmentCapacity from "../Home/components/DevelopmentCapacity";

const services = [
	{
		id: 1,
		name: "Global Development Center",
		description: "",
		icon: Code,
		details: [
			"Frontend & Backend Development",
			"Hybrid & Native App Development",
			"UI/UX Design & Optimization",
			"Managed Global Development Center",
		],
	},
	{
		id: 2,
		name: "System Integration (SI)",
		description: "",
		icon: Globe,
		details: [
			"Integrated System Development",
			"Data Integration & Management",
			"Solution Customization & Optimization",
		],
	},
	{
		id: 3,
		name: "IT Consulting",
		description: "",
		icon: Database,
		details: [
			"IT Strategy Development",
			"System Diagnosis & Improvement",
			"Solution Selection & Implementation Support",
		],
	},
	{
		id: 4,
		name: "Solution Provider",
		description: "",
		icon: Layers,
		details: [
			"Smart Office, Smart Factory, Banking solution",
			"Modular/Scalable Software Supply",
			"Enterprise Solutions (CRM, ERP,MES, HRM, WMS, FMS, iBEEMS, etc)",
		],
	},
	{
		id: 5,
		name: "AI & Machine Learning",
		description: "Cutting-edge AI solutions for modern businesses",
		icon: BrainCircuit,
		details: [
			"Machine Learning Model Development",
			"Natural Language Processing",
			"Computer Vision Solutions",
			"AI-powered Automation",
			"Predictive Analytics",
		],
	},
	{
		id: 6,
		name: "Big Data & Data Analysis",
		description: "Transform your data into actionable insights",
		icon: BarChart3,
		details: [
			"Big Data Processing & Analytics",
			"Business Intelligence Solutions",
			"Data Visualization & Reporting",
			"Real-time Data Analysis",
			"Data Mining & Pattern Recognition",
		],
	},
];

export default function ServicesPage() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [videoLoading, setVideoLoading] = useState(true);

	const [heroRef, heroInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const handleGetStarted = () => {
		navigate("/contact");
	};

	return (
		<>
			<div className="w-full mt-[64px]">
				<AnimatedSection className="w-full flex flex-col items-center">
					<motion.div
						ref={heroRef}
						initial={{ opacity: 0, y: -20 }}
						animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
						transition={{ duration: 0.6 }}
						className="relative mb-8 flex flex-col items-center justify-center text-center h-[500px] md:h-[700px] w-full"
					>
						{/* Background image */}
						<motion.div className="absolute inset-0 w-full h-full bg-cover bg-center overflow-hidden">
							{videoLoading && (
								<div className="absolute inset-0 flex items-center justify-center bg-dark-blue/50 z-20">
									<DotLoader />
								</div>
							)}
							<video
								src={video_services}
								autoPlay
								loop
								muted
								playsInline
								className={`w-full h-full object-cover transition-opacity duration-500 ${
									videoLoading ? "opacity-0" : "opacity-100"
								}`}
								onLoadedData={() => setVideoLoading(false)}
								onCanPlay={() => setVideoLoading(false)}
								onPlaying={() => setVideoLoading(false)}
								onWaiting={() => setVideoLoading(true)}
								onError={() => setVideoLoading(false)}
							/>
						</motion.div>

						{/* Overlay */}
						<div className="absolute inset-0 bg-dark-blue/50" />
						{/* Content */}
						<div className="relative z-10 flex flex-col justify-center items-center h-full max-w-4xl mx-auto text-center space-y-3">
							<h2
								className="px-4 md:pb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans break-keep whitespace-normal leading-tight break-words text-white"
								style={{
									textShadow:
										"0 2px 8px rgba(0,0,0,0.9), 0 0px 2px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.7)",
								}}
								dangerouslySetInnerHTML={{ __html: t("services.hero.title") }}
							></h2>
							<p
								className="px-4 text-xl md:text-2xl tracking-tighter font-sans break-keep whitespace-normal break-words text-white"
								dangerouslySetInnerHTML={{ __html: t("services.hero.description") }}
							></p>
							<div className="flex flex-wrap justify-center gap-4 mt-2">
								<button
									onClick={handleGetStarted}
									className="cursor-pointer inline-flex border border-white items-center gap-2 px-4 py-2 md:px-8 md:py-4 rounded-4xl text-primary-foreground transition-colors text-lg font-medium font-sans break-keep whitespace-normal break-words"
								>
									{t("services.hero.cta")}
									<ArrowRight className="w-5 h-5" />
								</button>
							</div>
						</div>
					</motion.div>
				</AnimatedSection>
				<section className="w-full pt-4 pb-12 bg-background">
					<div className="container max-w-[1440px] mx-auto px-4">
						<div className="text-center mb-16">
							<h2 className="text-4xl md:text-5xl font-bold mb-4 font-sans break-keep whitespace-normal break-words">
								{t("services.section.title")}
							</h2>
							<p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-sans break-keep whitespace-normal break-words">
								{t("services.section.description")}
							</p>
						</div>

						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
							{services.map((service) => (
								<motion.div
									key={service.id}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									whileHover={{ scale: 1.03 }}
									viewport={{ once: true }}
									transition={{
										type: "spring",
										stiffness: 200,
										damping: 15,
									}}
									className="bg-white/80 cursor-pointer rounded-2xl shadow-lg flex flex-col items-stretch relative border-t group transform transition duration-500 hover:bg-gradient-to-br hover:from-gray-900 hover:via-gray-800 hover:to-gray-900"
								>
									<div className="p-8 transition-all duration-500">
										<div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 transition-colors duration-500  group-hover:text-white">
											<service.icon className="w-6 h-6 transition-colors duration-500" />
										</div>
										<h3 className="text-2xl md:text-2xl font-bold mb-3 group-hover:text-white transition-colors duration-500 font-sans break-keep whitespace-normal break-words">
											{t(`services.items.${service.id}.name`)}
										</h3>
										<ul className="space-y-3">
											{service.details.map((detail, idx) => (
												<li
													key={idx}
													className="flex items-center gap-2 text-base md:text-[18px] group-hover:text-white transition-colors duration-500"
												>
													<span className="mt-1 w-1.5 h-1.5 rounded-full bg-primary shrink-0 group-hover:bg-white transition-colors duration-500" />
													<span className="font-sans break-words whitespace-normal">
														{t(
															`services.items.${service.id}.details.${idx}`,
														)}
													</span>
												</li>
											))}
										</ul>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>
			</div>
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
			<CTA />
		</>
	);
}
