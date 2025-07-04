import AI from "@/assets/img/AI.png";
import Bigdata_Analysis from "@/assets/img/Bigdata_Analysis.jpg";
import Development_Center from "@/assets/img/Development_Center.png";
import IT_Consulting from "@/assets/img/IT_Consulting.jpg";
import Solution_Provider from "@/assets/img/Solution_Provider.png";
import System_Integration from "@/assets/img/System Integration.png";
import useResponsive from "@/hooks/useResponsive";
import { idRouter } from "@/routes/idRouter";
import classNames from "classnames";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import DotLoader from "@/components/ui/DotLoader";

const Services = ({ contentClass }) => {
	const { t } = useTranslation();
	const { isMobile } = useResponsive();
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });
	const [activeIndex, setActiveIndex] = useState(0);
	const navigate = useNavigate();
	const [loadedImages, setLoadedImages] = useState({});

	const services = [
		{
			id: 1,
			name: t("our_services.global_development.title"),
			description: t("our_services.global_development.description"),
			image: Development_Center,
			details: [
				t("our_services.global_development.details.1"),
				t("our_services.global_development.details.2"),
				t("our_services.global_development.details.3"),
				t("our_services.global_development.details.4"),
			],
		},
		{
			id: 2,
			name: t("our_services.system_integration.title"),
			description: t("our_services.system_integration.description"),
			image: System_Integration,
			details: [
				t("our_services.system_integration.details.1"),
				t("our_services.system_integration.details.2"),
				t("our_services.system_integration.details.3"),
			],
		},
		{
			id: 3,
			name: t("our_services.it_consulting.title"),
			description: t("our_services.it_consulting.description"),
			image: IT_Consulting,
			details: [
				t("our_services.it_consulting.details.1"),
				t("our_services.it_consulting.details.2"),
				t("our_services.it_consulting.details.3"),
			],
		},
		{
			id: 4,
			name: t("our_services.solution_provider.title"),
			description: t("our_services.solution_provider.description"),
			image: Solution_Provider,
			details: [
				t("our_services.solution_provider.details.1"),
				t("our_services.solution_provider.details.2"),
				t("our_services.solution_provider.details.3"),
			],
		},
		{
			id: 5,
			name: t("our_services.ai_machine_learning.title"),
			description: t("our_services.ai_machine_learning.description"),
			image: AI,
			details: [
				t("our_services.ai_machine_learning.details.1"),
				t("our_services.ai_machine_learning.details.2"),
				t("our_services.ai_machine_learning.details.3"),
				t("our_services.ai_machine_learning.details.4"),
				t("our_services.ai_machine_learning.details.5"),
			],
		},
		{
			id: 6,
			name: t("our_services.big_data.title"),
			description: t("our_services.big_data.description"),
			image: Bigdata_Analysis,
			details: [
				t("our_services.big_data.details.1"),
				t("our_services.big_data.details.2"),
				t("our_services.big_data.details.3"),
				t("our_services.big_data.details.4"),
				t("our_services.big_data.details.5"),
			],
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 50, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: "easeOut",
			},
		},
	};

	const slideVariants = {
		enter: (direction) => ({
			x: direction > 0 ? 1000 : -1000,
			opacity: 0,
			scale: 0.8,
		}),
		center: {
			zIndex: 1,
			x: 0,
			opacity: 1,
			scale: 1,
		},
		exit: (direction) => ({
			zIndex: 0,
			x: direction < 0 ? 1000 : -1000,
			opacity: 0,
			scale: 0.8,
		}),
	};

	const slideTransition = {
		type: "spring",
		stiffness: 300,
		damping: 30,
	};

	return (
		<div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
			<motion.div
				ref={ref}
				initial="hidden"
				animate={isInView ? "visible" : "hidden"}
				variants={containerVariants}
				className={classNames(
					"max-w-[1440px] flex flex-col items-center justify-center gap-6 md:gap-12 mx-auto px-4 sm:px-6 lg:px-8",
					{
						[contentClass]: contentClass,
					},
				)}
			>
				<motion.div
					variants={itemVariants}
					className="flex flex-col items-center justify-center space-y-2 md:space-y-4 text-center px-2 sm:px-5 mb-3 md:mb-5"
				>
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter pb-4 md:pb-6 bg-gradient-to-r from-light-blue via-light-blue-gray to-pale-blue bg-clip-text text-transparent"
					>
						{t("services.section.title")}
					</motion.h2>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
						className="max-w-[600px] md:max-w-[900px] text-white text-base md:text-xl/relaxed"
					>
						{t("services.section.description")}
					</motion.p>
				</motion.div>
				<motion.div
					variants={itemVariants}
					className="w-full"
				>
					<Swiper
						modules={[Navigation, Pagination, Autoplay, EffectFade]}
						spaceBetween={20}
						slidesPerView={1}
						navigation={!isMobile}
						pagination={{
							clickable: true,
							bulletClass: "swiper-pagination-bullet",
							bulletActiveClass: "swiper-pagination-bullet-active",
						}}
						autoplay={{
							delay: 5000,
							disableOnInteraction: false,
						}}
						loop={true}
						effect="fade"
						fadeEffect={{
							crossFade: true,
						}}
						onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
						className="w-full h-[500px] sm:h-[550px] md:h-[600px] pb-12 sm:pb-16"
					>
						{services.map((service, index) => (
							<SwiperSlide key={service.id}>
								<AnimatePresence
									initial={false}
									custom={index - activeIndex}
								>
									<motion.div
										custom={index - activeIndex}
										variants={slideVariants}
										initial="enter"
										animate="center"
										exit="exit"
										transition={slideTransition}
										className="relative flex flex-col md:flex-row h-full bg-transparent rounded-2xl shadow-lg overflow-hidden"
									>
										{/* Image Section */}
										<motion.div
											initial={{ x: -50, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ duration: 0.5, delay: 0.2 }}
											className="w-full md:w-[60%] h-[40%] md:h-[95%] relative flex"
										>
											{!isMobile && (
												<motion.div
													initial={{ height: 0 }}
													animate={{ height: "60%" }}
													transition={{ duration: 0.5, delay: 0.3 }}
													className="absolute left-[80px] top-1/2 -translate-y-1/2 w-[20px] bg-light-blue"
												/>
											)}
											<div
												className={`absolute ${isMobile ? "left-0 w-full" : "left-[100px] w-[90%]"} h-[95%] flex items-center justify-center bg-white shadow-xl rounded-lg overflow-hidden mx-auto`}
											>
												<div className="relative w-[96%] h-[96%] rounded-lg">
													{!loadedImages[service.id] && (
														<div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 z-10">
															<DotLoader />
														</div>
													)}
													<motion.img
														initial={{ scale: 0.8, opacity: 0 }}
														animate={{ scale: 1, opacity: 1 }}
														transition={{ duration: 0.5, delay: 0.4 }}
														src={service.image}
														alt={service.name}
														className="object-cover w-full h-full rounded-lg"
														onLoad={() =>
															setLoadedImages((prev) => ({
																...prev,
																[service.id]: true,
															}))
														}
														onError={() =>
															setLoadedImages((prev) => ({
																...prev,
																[service.id]: true,
															}))
														}
														style={
															loadedImages[service.id]
																? {}
																: { visibility: "hidden" }
														}
													/>
												</div>
											</div>
										</motion.div>

										{/* Content Section */}
										<motion.div
											initial={{ x: 50, opacity: 0 }}
											animate={{ x: 0, opacity: 1 }}
											transition={{ duration: 0.5, delay: 0.3 }}
											className="w-full md:w-[50%] h-[60%] md:h-[90%] px-4 md:pl-16 md:pr-8 pt-4 md:pt-8 pb-4 md:pb-8 flex flex-col justify-center"
										>
											<motion.h3
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ duration: 0.5, delay: 0.5 }}
												className="text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-4 md:mb-6 text-white group-hover:text-primary transition-colors font-sans break-keep whitespace-normal break-words"
											>
												{service.name}
											</motion.h3>
											<motion.p
												initial={{ y: 20, opacity: 0 }}
												animate={{ y: 0, opacity: 1 }}
												transition={{ duration: 0.5, delay: 0.6 }}
												className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 md:mb-6 font-sans break-keep whitespace-normal break-words w-full md:w-[80%]"
											>
												{service.description}
											</motion.p>
											<ul className="space-y-2 md:space-y-3 mb-4 md:mb-8">
												{service.details.map((detail, idx) => (
													<motion.li
														key={idx}
														initial={{ opacity: 0, x: 20 }}
														animate={{ opacity: 1, x: 0 }}
														transition={{
															duration: 0.3,
															delay: 0.7 + idx * 0.1,
														}}
														className="flex items-center gap-2 text-base md:text-lg"
													>
														<motion.span
															initial={{ scale: 0 }}
															animate={{ scale: 1 }}
															transition={{
																duration: 0.3,
																delay: 0.8 + idx * 0.1,
															}}
															className="mt-1 w-1.5 h-1.5 rounded-full bg-light-blue shrink-0"
														/>
														<span className="font-sans break-words whitespace-normal text-white/90">
															{detail}
														</span>
													</motion.li>
												))}
											</ul>
											<motion.button
												whileHover={{ scale: 1.05 }}
												whileTap={{ scale: 0.95 }}
												initial={{ opacity: 0, y: 20 }}
												animate={{ opacity: 1, y: 0 }}
												transition={{ duration: 0.5, delay: 1 }}
												onClick={() => navigate(idRouter?.service)}
												className="hidden md:inline-flex cursor-pointer font-bold items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-base text-heading-black hover:text-white bg-gradient-to-r from-pale-blue to-light-blue rounded-lg hover:bg-primary/90 w-fit duration-300 transform hover:scale-105 shadow-lg"
											>
												{t("our_services.button_learn_more")}
												<ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
											</motion.button>
										</motion.div>
									</motion.div>
								</AnimatePresence>
							</SwiperSlide>
						))}
					</Swiper>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default Services;
