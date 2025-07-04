import challenges from "@/assets/career/challenges.json";
import collaboration from "@/assets/career/collaboration.json";
import learning from "@/assets/career/learning.json";
import useResponsive from "@/hooks/useResponsive";
import classNames from "classnames";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Lottie from "react-lottie";

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
const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

const AUTO_SWITCH_INTERVAL = 5000;

const Company = () => {
	const ref = useRef(null);
	const { t } = useTranslation();
	const [activeCompany, setActiveCompany] = useState(null);
	const [hoveredIndex, setHoveredIndex] = useState(null);
	const [isHovered, setIsHovered] = useState(false);
	const { isDesktop, isTablet, isMobile, is2xl, isXl, isLg } = useResponsive();

	const contentClass = "container h-full px-4 py-6 md:py-8 md:px-0 max-w-[1440px]";
	const companys = [
		{
			id: 0,
			title: t("careers.collaborative"),
			desc: t("careers.collaborative_description"),
			lottie: collaboration,
		},
		{
			id: 1,
			title: t("careers.learning"),
			desc: t("careers.learning_description"),
			lottie: learning,
		},
		{
			id: 2,
			title: t("careers.challenging"),
			desc: t("careers.challenging_description"),
			lottie: challenges,
		},
	];

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

	useEffect(() => {
		if (!activeCompany && companys.length > 0) {
			setActiveCompany(companys[0]);
		}
	}, []);

	useEffect(() => {
		if (isHovered) return;
		const interval = setInterval(() => {
			setActiveCompany((prev) => {
				const currentIndex = companys.findIndex((e) => e.id === prev?.id);
				const nextIndex = (currentIndex + 1) % companys.length;
				return companys[nextIndex];
			});
		}, AUTO_SWITCH_INTERVAL);

		return () => clearInterval(interval);
	}, [isHovered]);

	return (
		<div
			ref={ref}
			className="w-full flex flex-col items-center justify-center bg-white"
		>
			<style>{styles}</style>

			<div className={classNames({ [contentClass]: contentClass })}>
				<div className="flex flex-col items-center justify-center gap-8">
					<motion.h1
						className="w-full text-4xl md:text-5xl text-center text-dark-gray font-bold mb-4 font-sans break-keep whitespace-normal break-words"
						initial="hidden"
						animate="visible"
						variants={fadeUp}
					>
						{t("careers.title_company")}
					</motion.h1>
					<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-8 w-full">
						{companys.map((company) => {
							const isActive = activeCompany?.id === company.id;
							const isHovering = hoveredIndex === company.id;
							const lottieSize = getLottieSize();

							return (
								<div
									key={company.id}
									className="flex flex-col"
									onMouseEnter={() => {
										setIsHovered(true);
										setHoveredIndex(company.id);
										setActiveCompany(company);
									}}
									onMouseLeave={() => {
										setIsHovered(false);
										setHoveredIndex(null);
									}}
								>
									<div
										style={{
											transform: `rotateY(${
												isActive || isHovering ? 180 : 0
											}deg)`,
											transition: "transform 0.5s",
										}}
										className="w-full h-[300px] md:h-[300px] aspect-[3/4] relative preserve-3d"
									>
										{/* Front of card */}
										<div className="w-full h-full absolute backface-hidden">
											<div className="relative w-full h-full flex flex-col items-end justify-between rounded-lg shadow-lg p-8 cursor-pointer transition-all duration-300 border-t border-zinc-300 dark:border-zinc-700 bg-white text-dark">
												<p className="text-center text-xl 2xl:text-2xl xl:text-xl lg:text-xl md:text-xl w-full font-bold uppercase text-dark-gray font-sans break-keep whitespace-normal break-words korean-text">
													{company.title}
												</p>
												<div className="w-full h-full flex items-center justify-center">
													<Lottie
														options={{
															...defaultOptions,
															animationData: company.lottie,
														}}
														width={lottieSize.width}
														height={lottieSize.height}
													/>
												</div>
											</div>
										</div>

										{/* Back of card */}
										<div className="w-full h-full absolute backface-hidden rotate-y-180 bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg shadow-lg p-8">
											<div className="w-full h-full flex flex-col justify-center space-y-6">
												<div className="flex items-center justify-center space-x-2 w-full">
													<p className="text-white leading-relaxed text-base break-words text-center w-full korean-text">
														{company.desc}
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>

					<div className="h-[8px] w-[90px] bg-gradient-to-br from-gray-900 via-gray-800 to-black mb-4" />
				</div>
			</div>
		</div>
	);
};

export default Company;
