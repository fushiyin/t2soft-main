import bg_banner from "@/assets/solution_img/SO_Solution.png";
import Video_SO from "@/assets/solution_img/Video_SO.mp4";
import AnimatedSection from "@/components/AnimatedSection";
import CTA from "@/components/sections/ContactCTA";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SOLUTION_DETAILS } from "@/constant/solution";
import useResponsive from "@/hooks/useResponsive";
import { idRouter } from "@/routes/idRouter";
import { motion } from "framer-motion";
import { ArrowRight, ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import Lottie from "react-lottie";
import { useNavigate, useParams } from "react-router";
import Slide_Swiper from "./Slide_Swiper";
import DotLoader from "@/components/ui/DotLoader";

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

const SolutionDetail = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { isMobile } = useResponsive();

	const solution = SOLUTION_DETAILS.find((solution) => solution.id === id);
	// const solution = SOLUTION_DETAILS.find((solution) => solution.id === parseInt(id));

	const [videoLoading, setVideoLoading] = useState(true);
	const [imageLoaded, setImageLoaded] = useState(false);

	const [heroRef, heroInView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const { ref: bannerRef, inView: bannerInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const { ref: boxIntroRef, inView: boxIntroInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const { ref: tabsRef, inView: tabsInView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	const { ref: ref3 } = useInView({
		threshold: 0.1,
	});

	return (
		<div className="w-full flex flex-col items-center mt-[64px]">
			<motion.div
				ref={bannerRef}
				className="w-full relative"
				initial={{ opacity: 0, y: 20 }}
				animate={bannerInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.6 }}
			>
				<div className="relative w-full h-[500px] md:h-[800px]">
					{!imageLoaded && (
						<div className="absolute inset-0 flex items-center justify-center bg-dark-blue/50 z-10">
							<DotLoader />
						</div>
					)}
					<img
						src={bg_banner}
						className={`w-full h-[500px] md:h-[800px] object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
						loading="lazy"
						onLoad={() => setImageLoaded(true)}
						onError={() => setImageLoaded(true)}
						alt="Banner"
					/>
				</div>
				{/* overlay */}
				{/* <div className="absolute inset-0 bg-dark-blue/50" /> */}

				<div className="absolute max-w-[1440px] mx-auto px-2 md:px-6 inset-0 flex gap-4 flex-col items-center md:items-start justify-center">
					<motion.p
						className="text-base md:text-xl text-SecondaryBg korean-text"
						initial="hidden"
						animate={bannerInView ? "visible" : "hidden"}
						variants={fadeUp}
						style={{
							textShadow:
								"0 2px 8px rgba(0,0,0,0.9), 0 0px 2px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.7)",
						}}
					>
						{solution.banner}
					</motion.p>

					<motion.p
						className="text-center md:text-left leading-relaxed font-sans break-keep whitespace-normal break-words w-full"
						initial="hidden"
						animate={bannerInView ? "visible" : "hidden"}
						variants={fadeUp}
						transition={{ delay: 0.2 }}
					>
						{solution.title?.map((part, idx) => (
							<React.Fragment key={idx}>
								<span
									className={`text-3xl md:text-5xl text-center md:text-start font-bold inline font-sans break-keep whitespace-normal korean-text break-words leading-tight ${part.className}`}
									dangerouslySetInnerHTML={{ __html: part.text }}
								></span>
								{part.br && <br />}
							</React.Fragment>
						))}
					</motion.p>

					<motion.p
						className=" text-center md:text-left w-full md:w-[50%] text-white text-base md:text-xl font-sans break-keep whitespace-normal break-words korean-text"
						initial="hidden"
						animate={bannerInView ? "visible" : "hidden"}
						variants={fadeUp}
						transition={{ delay: 0.4 }}
						style={{
							textShadow:
								"0 2px 8px rgba(0,0,0,0.9), 0 0px 2px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.7)",
						}}
					>
						{solution.description}
					</motion.p>
					<motion.button
						type="button"
						className="inline-flex korean-text cursor-pointer font-bold items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-base text-heading-black hover:text-white bg-gradient-to-r from-pale-blue to-SecondaryBg rounded-lg hover:bg-primary/90 w-fit duration-300 transform hover:scale-105 shadow-lg font-sans break-keep whitespace-normal break-words"
						onClick={() => navigate(idRouter.contact)}
						initial="hidden"
						animate={bannerInView ? "visible" : "hidden"}
						variants={fadeUp}
						transition={{ delay: 0.6 }}
					>
						{solution.button}
						<ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
					</motion.button>
				</div>
			</motion.div>
			<motion.div
				ref={boxIntroRef}
				className="flex container max-w-[1440px] flex-wrap mx-auto md:relative mb-12 md:py-8 "
				initial={{ opacity: 0, y: 20 }}
				animate={boxIntroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.6 }}
			>
				<div className="w-full md:w-[40%] flex flex-col flex-wrap items-center justify-center py-8">
					<div className="flex flex-col flex-wrap items-center justify-center md:absolute top-[0px] md:top-[-35%] left-4 md:left-6 z-10 shadow-none md:shadow-md rounded-2xl bg-white">
						{Object.values(solution.boxIntro).map((item, idx, arr) => (
							<React.Fragment key={idx}>
								<motion.div
									className="flex flex-row items-center py-4 px-6 w-full md:max-w-[480px] gap-6 justify-center"
									initial={{ opacity: 0, x: -20 }}
									animate={
										boxIntroInView
											? { opacity: 1, x: 0 }
											: { opacity: 0, x: -20 }
									}
									transition={{ duration: 0.6, delay: idx * 0.2 }}
								>
									<div className="w-[120px] flex-shrink-0">
										<Lottie
											options={{
												loop: true,
												autoplay: true,
												animationData: item.icon,
												rendererSettings: {
													preserveAspectRatio: "xMidYMid slice",
												},
											}}
											width={120}
											height={120}
										/>
									</div>
									<div className="flex flex-col items-start text-left w-full">
										<h3 className="text-xl font-bold mb-2 korean-text">
											{item.title}
										</h3>
										<p className="text-base text-gray-600 korean-text">
											{item.desc}
										</p>
									</div>
								</motion.div>
								{idx !== arr.length - 1 && (
									<div className="w-[90%] border-b-2 border-[#D9D9D9] my-1 mx-auto" />
								)}
							</React.Fragment>
						))}
					</div>
				</div>
				<motion.div
					className="w-full md:w-[60%] mb-4 md:mb-16 mt-4 h-auto flex flex-col text-center md:text-left items-center md:items-start mx-auto"
					initial={{ opacity: 0, x: 20 }}
					animate={boxIntroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
					transition={{ duration: 0.6, delay: 0.3 }}
				>
					<h2 className="text-3xl md:text-5xl font-bold text-dark-gray leading-snug font-sans break-keep whitespace-normal break-words mb-1 korean-text">
						{solution.officeIntro.title_1}
					</h2>
					<h2 className="text-3xl mb-4 md:text-5xl font-bold text-dark-gray leading-snug font-sans break-keep whitespace-normal break-words korean-text">
						{solution.officeIntro.title_2}
					</h2>
					<p className="text-base md:text-xl font-light text-dark-gray leading-relaxed w-[80%] md:w-full korean-text">
						{solution.officeIntro.desc}
					</p>
				</motion.div>
			</motion.div>
			<AnimatedSection className="w-full flex flex-col items-center">
				<motion.div
					ref={heroRef}
					initial={{ opacity: 0, y: -20 }}
					animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
					transition={{ duration: 0.6 }}
					className="relative flex flex-col items-center justify-center text-center h-[500px] md:h-[700px] w-full"
				>
					{/* Background image */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
						transition={{ duration: 0.6 }}
						className="absolute inset-0 w-full h-full bg-cover bg-center overflow-hidden"
					>
						{videoLoading && (
							<div className="absolute inset-0 flex items-center justify-center bg-dark-blue/50 z-10">
								<DotLoader />
							</div>
						)}
						<video
							src={Video_SO}
							autoPlay
							loop
							muted
							playsInline
							className="w-full h-full object-cover"
							onWaiting={() => setVideoLoading(true)}
							onCanPlay={() => setVideoLoading(false)}
							onPlaying={() => setVideoLoading(false)}
						/>
					</motion.div>

					{/* Overlay */}
					{/* <div className="absolute inset-0 bg-dark-blue/40" /> */}
					{/* Content */}
					<div className="relative z-10 flex flex-col justify-center items-center h-full mx-auto text-center space-y-3">
						<h2 className="px-4 text-4xl md:text-5xl lg:text-6xl max-w-6xl font-bold tracking-tight font-sans break-keep whitespace-normal break-words text-white korean-text">
							{solution.video.title?.map((part, idx) => (
								<React.Fragment key={idx}>
									<span
										className={`text-3xl md:text-5xl font-bold block md:inline font-sans break-keep whitespace-normal break-words leading-normal korean-text ${part.className}`}
									>
										{part.text}
									</span>
									{!isMobile && part.br && <br />}
								</React.Fragment>
							))}
						</h2>
					</div>
				</motion.div>
			</AnimatedSection>
			{/* tab menu */}

			<motion.div
				ref={tabsRef}
				className={`w-full flex flex-col items-center mb-12 ${isMobile ? "mt-[-84px]" : "mt-[-123px]"} z-10`}
				initial={{ opacity: 0, y: 20 }}
				animate={tabsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.6 }}
			>
				<Tabs
					defaultValue="tab1"
					className="w-full mx-auto max-w-[1440px]"
				>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={tabsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
						transition={{ duration: 0.6, delay: 0.2 }}
					>
						<TabsList className="h-auto w-full justify-center flex-nowrap bg-transparent gap-2 md:gap-4 px-4 md:px-6">
							{Object.values(solution.menu_sub.header).map((label, index) => (
								<TabsTrigger
									key={index}
									value={`tab${index + 1}`}
									className="
										flex-1 min-w-0
										cursor-pointer
										rounded-none
										text-sm md:text-2xl
										px-2 md:px-8
										py-2 md:py-6
										min-h-[80px] md:min-h-[120px]
										flex items-center justify-center
										bg-[#1A318B] text-white
										hover:bg-SecondaryBg hover:text-dark-gray
										transition-all
										data-[state=active]:bg-white
										data-[state=active]:text-dark-gray
										!rounded-tl-xl !rounded-tr-xl
										text-center break-words whitespace-normal korean-text
									"
								>
									{label}
								</TabsTrigger>
							))}
						</TabsList>
					</motion.div>

					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={tabsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<TabsContent value="tab1">
							<div className="bg-white py-4 px-4 md:px-6">
								<div className="w-full mb-4 md:mb-16 mt-4 h-auto flex flex-col md:items-left justify-center">
									<h2
										className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-center md:text-left text-dark-gray leading-snug font-sans break-keep whitespace-normal break-words korean-text"
										dangerouslySetInnerHTML={{
											__html: solution.menu_sub[1].title,
										}}
									/>
									<div
										className={`flex gap-4 ${isMobile ? "flex-wrap mb-12 px-4" : ""}`}
									>
										<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
											{Object.values(solution.menu_sub[1].item).map(
												(item, idx) => (
													<div
														key={idx}
														className="flex items-center gap-4 mb-4"
													>
														<div
															className="w-[84px] h-[84px] md:w-[100px] md:h-[100px] flex-shrink-0 justify-center flex items-center bg-[#2D54ED]"
															style={{
																clipPath:
																	"polygon(25% 5.77%, 75% 5.77%, 100% 50%, 75% 94.23%, 25% 94.23%, 0% 50%)",
																WebkitClipPath:
																	"polygon(25% 5.77%, 75% 5.77%, 100% 50%, 75% 94.23%, 25% 94.23%, 0% 50%)",
															}}
														>
															<Lottie
																options={{
																	loop: true,
																	autoplay: true,
																	animationData: item.icon,
																	rendererSettings: {
																		preserveAspectRatio:
																			"xMidYMid slice",
																	},
																}}
																width={isMobile ? 80 : 100}
																height={isMobile ? 80 : 100}
															/>
														</div>
														<div>
															<h3 className="text-xl md:text-2xl font-bold mb-2 korean-text">
																{item.title}
															</h3>
															<p className="text-base md:text-xl text-gray-600 korean-text">
																{item.desc}
															</p>
														</div>
													</div>
												),
											)}
										</div>
										<div
											className={`flex flex-col gap-2 md:gap-4  ${isMobile ? "w-full" : "w-[350px] top-[30px]"}`}
										>
											<img
												className="shadow-lg rounded-2xl"
												src={solution.menu_sub[1].img_1}
											/>
											<img
												className="shadow-lg rounded-2xl"
												src={solution.menu_sub[1].img_2}
											/>
											<img
												className="shadow-lg rounded-2xl"
												src={solution.menu_sub[1].img_3}
											/>
										</div>
									</div>
								</div>
							</div>
						</TabsContent>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={tabsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<TabsContent value="tab2">
							<div className="bg-white py-4 px-4 md:px-6">
								<div className="w-full mb-4 md:mb-16 mt-4 h-auto flex flex-col md:items-left justify-center">
									<h2
										className="mb-4 md:mb-6 text-2xl md:text-5xl font-bold text-center md:text-left text-dark-gray leading-snug font-sans break-keep whitespace-normal break-words korean-text"
										dangerouslySetInnerHTML={{
											__html: solution.menu_sub[2].title,
										}}
									/>
									<div
										className={`flex gap-4 ${isMobile ? "flex-wrap mb-12 px-4" : ""}`}
									>
										<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
											{Object.values(solution.menu_sub[2].item).map(
												(item, idx) => (
													<div
														key={idx}
														className="flex items-center gap-4 mb-4"
													>
														<div
															className="w-[84px] h-[84px] md:w-[100px] md:h-[100px] flex-shrink-0 justify-center flex items-center bg-[#2D54ED]"
															style={{
																clipPath:
																	"polygon(25% 5.77%, 75% 5.77%, 100% 50%, 75% 94.23%, 25% 94.23%, 0% 50%)",
																WebkitClipPath:
																	"polygon(25% 5.77%, 75% 5.77%, 100% 50%, 75% 94.23%, 25% 94.23%, 0% 50%)",
															}}
														>
															<Lottie
																options={{
																	loop: true,
																	autoplay: true,
																	animationData: item.icon,
																	rendererSettings: {
																		preserveAspectRatio:
																			"xMidYMid slice",
																	},
																}}
																width={isMobile ? 48 : 64}
																height={isMobile ? 48 : 64}
															/>
														</div>
														<div>
															<h3 className="text-xl md:text-2xl font-bold mb-2 korean-text">
																{item.title}
															</h3>
															<p className="text-base md:text-xl text-gray-600 korean-text">
																{item.desc}
															</p>
														</div>
													</div>
												),
											)}
										</div>
										<div
											className={`flex flex-col gap-2 md:gap-4 ${isMobile ? "w-full" : "w-[350px] mt-[-30px]"}`}
										>
											<div className="flex gap-4">
												<img
													className="w-1/2  shadow-lg"
													src={solution.menu_sub[2].img_1}
												/>
												<img
													className="w-1/2  shadow-lg"
													src={solution.menu_sub[2].img_2}
												/>
											</div>
											<img
												className="object-contain shadow-lg rounded-2xl"
												src={solution.menu_sub[2].img_3}
											/>
										</div>
									</div>
								</div>
							</div>
						</TabsContent>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={tabsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<TabsContent value="tab3">
							<div className="bg-white py-4 px-4 md:px-6">
								<div className="w-full mb-4 md:mb-16 mt-4 h-auto flex flex-col md:items-left justify-center">
									<h2
										className="mb-4 md:mb-6 text-2xl text-center md:text-left md:text-5xl font-bold text-dark-gray leading-snug font-sans break-keep whitespace-normal break-words korean-text"
										dangerouslySetInnerHTML={{
											__html: solution.menu_sub[3].title,
										}}
									/>
									<div
										className={`flex gap-4 ${isMobile ? "flex-wrap mb-12 px-4" : ""}`}
									>
										<div className="flex-1 grid grid-cols-1 md:grid-cols-1 gap-6">
											{Object.values(solution.menu_sub[3].item).map(
												(item, idx) => (
													<div
														key={idx}
														className="flex items-center gap-4 mb-4"
													>
														<div
															className="w-[84px] h-[84px] md:w-[100px] md:h-[100px] flex-shrink-0 justify-center flex items-center bg-[#2D54ED]"
															style={{
																clipPath:
																	"polygon(25% 5.77%, 75% 5.77%, 100% 50%, 75% 94.23%, 25% 94.23%, 0% 50%)",
																WebkitClipPath:
																	"polygon(25% 5.77%, 75% 5.77%, 100% 50%, 75% 94.23%, 25% 94.23%, 0% 50%)",
															}}
														>
															<Lottie
																options={{
																	loop: true,
																	autoplay: true,
																	animationData: item.icon,
																	rendererSettings: {
																		preserveAspectRatio:
																			"xMidYMid slice",
																	},
																}}
																width={isMobile ? 80 : 100}
																height={isMobile ? 80 : 100}
															/>
														</div>
														<div>
															<h3 className="text-xl md:text-2xl font-bold mb-2 korean-text">
																{item.title}
															</h3>
															<p className="text-base md:text-xl text-gray-600 korean-text w-full md:w-[70%]">
																{item.desc}
															</p>
														</div>
													</div>
												),
											)}
										</div>
										<div
											className={`flex flex-col gap-4 md:gap-6 justify-end items-end  ${isMobile ? "w-full" : "w-[350px]"}`}
										>
											<img
												className="shadow-lg object-cover "
												src={solution.menu_sub[3].img_1}
											/>
											<img
												className="object-contain shadow-lg "
												src={solution.menu_sub[3].img_2}
											/>
											{/* <img
												className="object-contain shadow-lg "
												src={solution.menu_sub[3].img_3}
											/> */}
										</div>
									</div>
								</div>
							</div>
						</TabsContent>
					</motion.div>
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={tabsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
						transition={{ duration: 0.6, delay: 0.4 }}
					>
						<TabsContent value="tab4">
							<div className="bg-white py-4 px-4 md:px-6">
								<div className="w-full mb-4 md:mb-16 mt-4 h-auto flex flex-col md:items-left justify-center">
									<h2
										className="mb-4 md:mb-6 text-2xl md:text-5xl text-center md:text-left font-bold text-dark-gray leading-snug font-sans break-keep whitespace-normal break-words korean-text"
										dangerouslySetInnerHTML={{
											__html: solution.menu_sub[4].title,
										}}
									/>
									<div
										className={`flex gap-4 ${isMobile ? "flex-wrap mb-12 px-4" : ""}`}
									>
										<div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
											{Object.values(solution.menu_sub[4].item).map(
												(item, idx) => (
													<div
														key={idx}
														className="flex items-center gap-4 mb-4"
													>
														<div
															className="w-[84px] h-[84px] md:w-[100px] md:h-[100px] flex-shrink-0 justify-center flex items-center bg-[#2D54ED]"
															style={{
																clipPath:
																	"polygon(25% 5.77%, 75% 5.77%, 100% 50%, 75% 94.23%, 25% 94.23%, 0% 50%)",
																WebkitClipPath:
																	"polygon(25% 5.77%, 75% 5.77%, 100% 50%, 75% 94.23%, 25% 94.23%, 0% 50%)",
															}}
														>
															<Lottie
																options={{
																	loop: true,
																	autoplay: true,
																	animationData: item.icon,
																	rendererSettings: {
																		preserveAspectRatio:
																			"xMidYMid slice",
																	},
																}}
																width={isMobile ? 48 : 64}
																height={isMobile ? 48 : 64}
															/>
														</div>
														<div>
															<h3 className="text-xl md:text-2xl font-bold mb-2 korean-text">
																{item.title}
															</h3>
															<p className="text-base md:text-xl text-gray-600 korean-text">
																{item.desc}
															</p>
														</div>
													</div>
												),
											)}
										</div>
										<div
											className={`flex flex-col gap-2 md:gap-4 ${isMobile ? "w-full" : "w-[350px]  mt-[-30px]"}`}
										>
											<img
												src={solution.menu_sub[4].img_1}
												className="shadow-lg rounded-2xl object-contain"
											/>
										</div>
									</div>
								</div>
							</div>
						</TabsContent>
					</motion.div>
				</Tabs>
			</motion.div>

			<section
				ref={ref3}
				className="w-full bg-white h-0 relative justify-center flex shadow-lg z-30"
			>
				<div
					className="container max-w-[1440px] w-full md:w-[95%] mx-auto absolute md:rounded-3xl top-[-90px]"
					style={{
						background: "linear-gradient(90deg, #1A3087 0%, #2D54ED 100%)",
					}}
				>
					<div className="w-full h-auto md:h-[200px] flex flex-col justify-center p-6 gap-4 md:gap-0">
						<h2
							className="w-full md:w-[60%] md:px-4 md:pb-4 text-xl md:text-2xl lg:text-3xl font-bold tracking-tight font-sans break-keep whitespace-normal break-words text-white korean-text"
							style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
						>
							{t("solution.so.contact.title")}
						</h2>
						<p
							className="w-full md:w-[40%] md:px-4 text-base tracking-tighter font-sans break-keep whitespace-normal break-words text-white korean-text"
							style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
						>
							{t("solution.so.contact.desc")}
						</p>
						{isMobile && (
							<button
								type="button"
								className="cursor-pointer font-bold items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-base text-white bg-primary/90 rounded-lg hover:bg-[#1E399F] w-fit duration-300 transform hover:scale-105 shadow-lg korean-text"
							>
								<a
									href={idRouter?.contact}
									className="flex items-center gap-3"
									onClick={() => {
										console.log(idRouter?.contact);
									}}
								>
									{t("solution.so.contact.btn")}
									<ArrowRightIcon className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6" />
								</a>
							</button>
						)}
					</div>
					{!isMobile && (
						<div className="flex justify-center absolute right-[5%] top-[40%]">
							<button
								type="button"
								className="hidden md:inline-flex cursor-pointer font-bold items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-base text-white bg-primary/90 rounded-lg hover:bg-[#1E399F] w-fit duration-300 transform hover:scale-105 shadow-lg korean-text"
							>
								<a
									href={idRouter?.contact}
									className="flex items-center gap-3"
									onClick={() => {
										console.log(idRouter?.contact);
									}}
								>
									{t("solution.so.contact.btn")}
									<ArrowRightIcon className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6" />
								</a>
							</button>
						</div>
					)}
				</div>
			</section>

			<Slide_Swiper details={true} />

			<CTA />
		</div>
	);
};

export default SolutionDetail;
