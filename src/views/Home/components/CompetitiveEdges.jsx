/* eslint-disable react-hooks/exhaustive-deps */
import Communicate from "@/assets/lotties/communicate.json";
import Computer from "@/assets/lotties/computer.json";
import Cost from "@/assets/lotties/cost.json";
import Dev from "@/assets/lotties/dev.json";
import useResponsive from "@/hooks/useResponsive";
import classNames from "classnames";
import { motion, useInView } from "framer-motion";
import { BarChart3, Check, Code, Cpu, DollarSign } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";

// Add flip card styles
const styles = `
  .preserve-3d {
    transform-style: preserve-3d;
    perspective: 1000px;
  }
  .backface-hidden {
    backface-visibility: hidden;
  }
  .rotate-y-180 {
    transform: rotateY(180deg);
  }
`;

const defaultOptions = {
	loop: true,
	autoplay: true,
	rendererSettings: {
		preserveAspectRatio: "xMidYMid slice",
	},
};

const AUTO_SWITCH_INTERVAL = 5000;

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
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

const CompetitiveEdges = ({ isSolution }) => {
	const [activeEdge, setActiveEdge] = useState(null);
	const [isHovered, setIsHovered] = useState(false);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const { t } = useTranslation();
	const { isDesktop, isTablet, isMobile, is2xl, isXl, isLg } = useResponsive();
	const contentClass = "container h-full px-4 py-16 md:px-2 max-w-[1440px]";
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-50px" });
	const classNames_icon =
		"w-[36px] h-[36px] sm:w-[36px] sm:h-[36px] md:w-[32px] md:h-[32px] lg:w-[36px] lg:h-[36px] xl:w-[40px] xl:h-[40px] 2xl:w-[48px] 2xl:h-[48px] text-black";

	const getLottieSize = () => {
		if (isMobile) return { width: 300, height: 225 };
		if (isTablet) return { width: 320, height: 240 };
		if (isDesktop) {
			if (is2xl) return { width: 300, height: 225 };
			if (isXl) return { width: 280, height: 210 };
			if (isLg) return { width: 260, height: 250 };
			return { width: 260, height: 195 };
		}
		return { width: 300, height: 225 };
	};

	const edges = [
		{
			id: 0,
			title: t("competitive_edges.edges.coordinator.title"),
			icon: <Cpu className={classNames_icon} />,
			description: t("competitive_edges.edges.coordinator.description", {
				returnObjects: true,
			}),
			lottie: Computer,
		},
		{
			id: 1,
			title: t("competitive_edges.edges.developer.title"),
			icon: <Code className={classNames_icon} />,
			description: t("competitive_edges.edges.developer.description", {
				returnObjects: true,
			}),
			lottie: Dev,
		},
		{
			id: 2,
			title: t("competitive_edges.edges.communication.title"),
			icon: <BarChart3 className={classNames_icon} />,
			description: t("competitive_edges.edges.communication.description", {
				returnObjects: true,
			}),
			lottie: Communicate,
		},
		{
			id: 3,
			title: t("competitive_edges.edges.cost.title"),
			icon: <DollarSign className={classNames_icon} />,
			description: t("competitive_edges.edges.cost.description", { returnObjects: true }),
			lottie: Cost,
		},
	];

	useEffect(() => {
		if (!activeEdge && edges.length > 0) {
			setActiveEdge(edges[0]);
		}
	}, []);

	useEffect(() => {
		if (isHovered) return;
		const interval = setInterval(() => {
			setActiveEdge((prev) => {
				const currentIndex = edges.findIndex((e) => e.id === prev?.id);
				const nextIndex = (currentIndex + 1) % edges.length;
				return edges[nextIndex];
			});
		}, AUTO_SWITCH_INTERVAL);

		return () => clearInterval(interval);
	}, [isHovered]);

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0 }}
			animate={isInView ? { opacity: 1 } : { opacity: 0 }}
			transition={{ duration: 0.6 }}
			className={classNames(
				"w-full flex flex-col items-center justify-center",
				isSolution
					? "bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24"
					: "bg-white",
			)}
		>
			<style>{styles}</style>
			<div
				className={classNames({
					[contentClass]: contentClass,
				})}
			>
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate={isInView ? "visible" : "hidden"}
					className="flex flex-col items-center justify-center gap-8"
				>
					<motion.div
						variants={itemVariants}
						className="flex flex-col items-center justify-center gap-4"
					>
						<motion.h2
							variants={itemVariants}
							className={classNames(
								"text-4xl md:text-5xl font-bold text-center text-dark-gray font-sans break-keep whitespace-normal break-words",
								isSolution ? "text-white" : "text-dark-gray",
							)}
						>
							{t("competitive_edges.title")}
						</motion.h2>
						<motion.p
							variants={itemVariants}
							className={classNames(
								"text-center text-xl md:text-2xl font-sans break-keep whitespace-normal break-words",
								isSolution ? "text-white" : "text-muted-foreground",
							)}
						>
							{t("competitive_edges.description")}
						</motion.p>
					</motion.div>

					<motion.div
						variants={containerVariants}
						className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-8 w-full"
					>
						{edges.map((edge, index) => {
							const isActive = activeEdge?.id === edge.id;
							const isHovering = hoveredIndex === edge.id;
							const lottieSize = getLottieSize();

							return (
								<motion.div
									key={edge.id}
									variants={itemVariants}
									custom={index}
									className="flex flex-col"
									onMouseEnter={() => {
										setIsHovered(true);
										setHoveredIndex(edge.id);
										setActiveEdge(edge);
									}}
									onMouseLeave={() => {
										setIsHovered(false);
										setHoveredIndex(null);
									}}
								>
									<motion.div
										initial={false}
										animate={{
											rotateY: isActive || isHovering ? 180 : 0,
										}}
										transition={{ duration: 0.5 }}
										className={classNames(
											"w-full h-[350px] sm:h-[350px] md:h-[350px] xl:h-[400px] aspect-[3/4] relative preserve-3d",
										)}
									>
										{/* Front of card */}
										<motion.div
											initial={{ opacity: 0 }}
											animate={isInView ? { opacity: 1 } : { opacity: 0 }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
											className="w-full h-full absolute backface-hidden"
										>
											<div className="relative w-full h-full flex flex-col items-end justify-between rounded-lg shadow-lg p-8 cursor-pointer transition-all duration-300 border-t border-zinc-300 dark:border-zinc-700 bg-white text-dark">
												<p className="text-center text-xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl w-full font-bold uppercase text-dark-gray font-sans break-keep whitespace-normal break-words">
													{edge.title}
												</p>
												<div className="w-full h-full flex items-center justify-center">
													<Lottie
														options={{
															...defaultOptions,
															animationData: edge.lottie,
														}}
														width={lottieSize.width}
														height={lottieSize.height}
													/>
												</div>
												<div className="absolute bottom-2 right-2">
													{edge.icon}
												</div>
											</div>
										</motion.div>

										{/* Back of card */}
										<motion.div
											initial={{ opacity: 0 }}
											animate={isInView ? { opacity: 1 } : { opacity: 0 }}
											transition={{ duration: 0.5, delay: index * 0.1 }}
											className="w-full h-full absolute backface-hidden rotate-y-180 bg-gradient-to-r from-[var(--color-light-mint)] to-[var(--color-light-green)] rounded-lg shadow-lg p-8"
										>
											<div className="w-full h-full flex flex-col justify-center space-y-6">
												{edge.description.map((benefit, index) => (
													<motion.div
														key={index}
														initial={{ opacity: 0, x: -20 }}
														animate={
															isInView
																? { opacity: 1, x: 0 }
																: { opacity: 0, x: -20 }
														}
														transition={{
															duration: 0.3,
															delay: index * 0.1,
														}}
														className="flex items-start gap-4 mb-2"
													>
														<Check
															className="text-white mt-1 flex-shrink-0"
															size={24}
														/>
														<p style={{ color: isSolution ? 'var(--white)' : 'var(--muted-foreground)' }}>
															{benefit}
														</p>
													</motion.div>
												))}
											</div>
										</motion.div>
									</motion.div>
								</motion.div>
							);
						})}
					</motion.div>
					<motion.div
						initial={{ width: 0 }}
						animate={isInView ? { width: "90px" } : { width: 0 }}
						transition={{ duration: 0.6, delay: 0.8 }}
						className="h-[8px] bg-gradient-to-r from-[var(--color-light-mint)] to-[var(--color-light-green)] mb-4"
					/>
				</motion.div>
			</div>
		</motion.div>
	);
};

export default CompetitiveEdges;
