import about_img from "@/assets/img/About_us.png";
import image from "@/assets/img/bg-about-us.png";
import video_about from "@/assets/video/About_us.mp4";
import AnimatedSection from "@/components/AnimatedSection";
import CTA from "@/components/sections/ContactCTA";
import FAQ from "@/components/sections/FAQ";
import { FAQs } from "@/constant/common";
import useResponsive from "@/hooks/useResponsive";
import { motion } from "framer-motion";
import { Award, CheckCircle2, Globe, Users } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import CompetitiveEdges from "../Home/components/CompetitiveEdges";
import VisionJourney from "../Home/components/Vision";
import DotLoader from "@/components/ui/DotLoader";

export default function AboutPage() {
	const { t } = useTranslation();
	const { isMobile, isLg } = useResponsive();
	const iconList = [CheckCircle2, Users, Globe, Award];
	const [videoLoading, setVideoLoading] = useState(true);

	const [titleRef, titleInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [contentRef, contentInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [imageRef, imageInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [experienceRef, experienceInView] = useInView({ triggerOnce: true, threshold: 0.1 });
	const [faqRef, faqInView] = useInView({ triggerOnce: true, threshold: 0.1 });

	return (
		<div className="w-full flex flex-col gap-6 md:gap-10 items-center mt-[64px]">
			<AnimatedSection className="w-full flex flex-col items-center">
				<motion.div
					ref={titleRef}
					initial={{ opacity: 0, y: -20 }}
					animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
					transition={{ duration: 0.6 }}
					className="relative mb-8 flex flex-col items-center justify-center text-center h-[500px] md:h-[700px] w-full"
				>
					{/* Background video */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6 }}
						className="absolute inset-0 w-full h-full bg-cover bg-center overflow-hidden"
					>
						{videoLoading && (
							<div className="absolute inset-0 flex items-center justify-center bg-dark-blue/80 z-20">
								<DotLoader />
							</div>
						)}

						<video
							src={video_about}
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
					<div className="absolute inset-0 bg-black/30" />

					{/* Content */}
					<div className="relative z-10 flex flex-col justify-center items-center h-full max-w-3xl mx-auto text-center space-y-3">
						<h2
							className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-sans break-keep whitespace-normal break-words text-white"
							style={{
								textShadow:
									"0 2px 8px rgba(0,0,0,0.9), 0 0px 2px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.7)",
							}}
						>
							{t("about.title")}
						</h2>
						<p
							className="p-2 text-xl md:text-2xl tracking-tighter font-sans break-keep whitespace-normal break-words text-white"
							style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
						>
							{t("about.title_sub")}
						</p>
					</div>
				</motion.div>

				<div className="max-w-[1440px] container px-[20px] md:px-0 flex flex-col justify-center min-h-[50vh]">
					<div className="flex flex-col lg:flex-row">
						{isMobile && (
							<div className="w-[90%] border-l-4 border-dark-blue pl-4">
								<motion.h2
									initial={{ opacity: 0, y: 20 }}
									animate={
										isMobile
											? { opacity: 1, y: 0 }
											: imageInView
												? { opacity: 1, y: 0 }
												: { opacity: 0, y: 20 }
									}
									transition={{ duration: 0.5, delay: 0.3 }}
									className="text-3xl md:text-4xl font-bold tracking-tighter pb-2 bg-gradient-to-r from-[var(--color-light-mint)] to-[var(--color-light-green)] bg-clip-text text-transparent font-sans break-keep whitespace-normal break-words"
								>
									{t("about.description.title")}
								</motion.h2>
								<motion.p
									initial={{ opacity: 0, y: 20 }}
									animate={
										isMobile
											? { opacity: 1, y: 0 }
											: imageInView
												? { opacity: 1, y: 0 }
												: { opacity: 0, y: 20 }
									}
									transition={{ duration: 0.5, delay: 0.4 }}
									className="text-left text-gray-900 text-3xl md:text-4xl font-bold font-sans break-keep whitespace-normal break-words"
								>
									{t("about.description.explain")}
								</motion.p>
							</div>
						)}

						<motion.div
							ref={contentRef}
							initial={{ opacity: 0, x: -50 }}
							animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className={`w-full ${isMobile ? "px-0" : "px-4 2xl:px-0"} lg:w-[50%] order-2 lg:order-1`}
						>
							{!isMobile && (
								<div className="w-[90%] border-l-4 border-dark-blue pl-4">
									<motion.h2
										initial={{ opacity: 0, y: 20 }}
										animate={
											contentInView
												? { opacity: 1, y: 0 }
												: { opacity: 0, y: 20 }
										}
										transition={{ duration: 0.5, delay: 0.3 }}
										className="text-3xl md:text-4xl font-bold tracking-tighter pb-4 bg-gradient-to-r from-[var(--color-light-mint)] to-[var(--color-light-green)] bg-clip-text text-transparent font-sans break-keep whitespace-normal break-words"
									>
										{t("about.description.title")}
									</motion.h2>
									<motion.p
										initial={{ opacity: 0, y: 20 }}
										animate={
											contentInView
												? { opacity: 1, y: 0 }
												: { opacity: 0, y: 20 }
										}
										transition={{ duration: 0.5, delay: 0.4 }}
										className="text-left text-gray-900 font-bold text-3xl md:text-4xl font-sans break-keep whitespace-normal break-words"
									>
										{t("about.description.explain")}
									</motion.p>
								</div>
							)}

							<motion.p
								initial={{ opacity: 0, y: 20 }}
								animate={
									contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.5, delay: 0.5 }}
								className="ml-0 md:ml-6 mt-6 w-full md:w-[90%] text-muted-foreground text-sx text-left font-sans break-keep whitespace-normal break-words"
							>
								{t("about.content")}
							</motion.p>

							<motion.h2
								ref={experienceRef}
								initial={{ opacity: 0, y: 20 }}
								animate={
									experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
								}
								transition={{ duration: 0.5, delay: 0.6 }}
								className="w-full md:w-[90%] flex font-bold mt-4 md:mt-8 text-2xl sm:text-3xl md:text-4xl tracking-tighter justify-center font-sans break-keep whitespace-normal break-words"
							>
								{t("about.experience")}
							</motion.h2>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								animate={
									experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
								}
								transition={{ duration: 0.6, delay: 0.7 }}
								className="flex w-full md:w-[90%] flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-6 mt-4 sm:mt-8"
							>
								{iconList.map((Icon, i) => (
									<motion.p
										key={i}
										initial={{ opacity: 0, y: 20 }}
										animate={
											experienceInView
												? { opacity: 1, y: 0 }
												: { opacity: 0, y: 20 }
										}
										transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
										className="text-sm md:text-base lg:text-xl/relaxed font-sans text-left break-keep whitespace-normal break-words w-full sm:w-[calc(50%-12px)] flex gap-3"
									>
										<Icon className="w-6 h-6 sm:w-7 sm:h-7 text-light-green shrink-0" />
										{t(`about.experience_list.${i + 1}`)}
									</motion.p>
								))}
							</motion.div>
						</motion.div>

						<motion.div
							ref={imageRef}
							initial={{ opacity: 0, x: 50 }}
							animate={imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className={`${isLg ? "pl-8 lg:pl-12" : isMobile ? "pl-0 pt-6" : "pl-6 pb-6"} w-full lg:w-[50%] relative h-[300px] md:h-[400px] lg:h-[600px] order-1 lg:order-2`}
						>
							<div className="relative w-full h-full">
								<img
									src={about_img}
									alt="Mobile Screen"
									className="absolute left-0 w-full h-full object-cover"
									style={{
										clipPath:
											"polygon(100% 0, 60% 0, 40% 50%, 60% 100%, 100% 100%)",
										transform: "translateX(5px)",
									}}
								/>
								<img
									src={about_img}
									alt="Mobile Screen"
									className="absolute right-0 w-full h-full object-cover"
									style={{
										clipPath: "polygon(0 0, 60% 0, 40% 50%, 60% 100%, 0 100%)",
										transform: "translateX(-5px)",
									}}
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</AnimatedSection>

			<VisionJourney />
			<CompetitiveEdges />

			<motion.div
				ref={faqRef}
				initial={{ opacity: 0, y: 30 }}
				animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
				transition={{ duration: 0.6 }}
				className="flex flex-col items-center px-[20px] md:px-4 lg:px-0"
			>
				<motion.h2
					initial={{ opacity: 0, y: 20 }}
					animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
					transition={{ duration: 0.5, delay: 0.2 }}
					className="text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl text-center"
				>
					{t("faq.title")}
				</motion.h2>
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={faqInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="max-w-[1440px] grid gap-6 lg:grid-cols-2 sm:mt-8 md:mt-16 lg:gap-12 items-start mt-6 lg:px-0 md:px-4"
				>
					<motion.img
						initial={{ opacity: 0, x: -30 }}
						animate={faqInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						src={image}
						alt={t("about.faq.imageAlt")}
						whileHover={{ scale: 1.02 }}
						className="transition-all duration-300"
					/>
					<motion.div
						initial={{ opacity: 0, x: 30 }}
						animate={faqInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
						transition={{ duration: 0.6, delay: 0.5 }}
					>
						<FAQ faqs={FAQs} />
					</motion.div>
				</motion.div>
			</motion.div>

			<CTA />
		</div>
	);
}
