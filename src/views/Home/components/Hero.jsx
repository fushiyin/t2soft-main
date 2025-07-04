import video_home from "@/assets/video/Vid_Home.mp4";
import video_hero from "@/assets/video/video-hero.mp4";
import { Button } from "@/components/ui/button";
import DotLoader from "@/components/ui/DotLoader";
import { idRouter } from "@/routes/idRouter";
import classNames from "classnames";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

export default function Hero() {
	const { t } = useTranslation();
	const [isShowingHero, setIsShowingHero] = useState(false);
	const [heroPlayCount, setHeroPlayCount] = useState(0);

	const videoHomeRef = useRef(null);
	const videoHeroRef = useRef(null);

	const [videoHeroLoading, setVideoHeroLoading] = useState(true);
	const [videoHomeLoading, setVideoHomeLoading] = useState(true);

	const handleVideoEnd = () => {
		if (!isShowingHero) {
			setIsShowingHero(true);
			setHeroPlayCount(1);
			videoHeroRef.current?.play();
		} else {
			if (heroPlayCount < 2) {
				setHeroPlayCount((prev) => prev + 1);
				videoHeroRef.current?.play();
			} else {
				setIsShowingHero(false);
				setHeroPlayCount(0);
				if (videoHomeRef.current) {
					videoHomeRef.current.currentTime = 0;
					videoHomeRef.current.play();
				}
			}
		}
	};

	const handleVideoHomeTimeUpdate = () => {
		if (videoHomeRef.current && videoHomeRef.current.currentTime >= 6) {
			videoHomeRef.current.pause();
			handleVideoEnd();
		}
	};

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut" },
		},
	};

	const buttonVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				duration: 0.5,
				delay: 0.8,
				ease: "easeOut",
			},
		},
	};

	const content = !isShowingHero
		? {
				title: t("hero_section.hero_slogan"),
				description: t("hero_section.hero_description"),
			}
		: {
				title: t("hero_section.home_slogan"),
				description: t("hero_section.home_description"),
			};

	return (
		<>
			{/* Video Background */}
			<div className="absolute inset-0 w-full h-full">
				{/* video_hero */}
				<motion.div
					className={classNames("absolute inset-0 transition-opacity duration-1000", {
						"opacity-100 z-10 pointer-events-auto": isShowingHero,
						"opacity-0 z-0 pointer-events-none": !isShowingHero,
					})}
				>
					{videoHeroLoading && (
						<div className="absolute inset-0 flex items-center justify-center bg-draker-blue/80 z-10">
							<DotLoader />
						</div>
					)}
					<video
						ref={videoHeroRef}
						autoPlay
						muted
						playsInline
						loop={false}
						className="w-full h-full object-cover"
						onEnded={handleVideoEnd}
						onLoadedData={() => setVideoHeroLoading(false)}
						onWaiting={() => setVideoHeroLoading(true)}
						onCanPlay={() => setVideoHeroLoading(false)}
						onPlaying={() => setVideoHeroLoading(false)}
						onError={() => setVideoHeroLoading(false)}
					>
						<source
							src={video_hero}
							type="video/mp4"
						/>
					</video>
				</motion.div>

				{/* video_home */}
				<motion.div
					className={classNames("absolute inset-0 transition-opacity duration-1000", {
						"opacity-100 z-10 pointer-events-auto": !isShowingHero,
						"opacity-0 z-0 pointer-events-none": isShowingHero,
					})}
				>
					{videoHomeLoading && (
						<div className="absolute inset-0 flex items-center justify-center bg-draker-blue/80 z-10">
							<DotLoader />
						</div>
					)}
					<video
						ref={videoHomeRef}
						autoPlay
						muted
						playsInline
						loop={false}
						className="w-full h-full object-cover"
						onEnded={handleVideoEnd}
						onTimeUpdate={handleVideoHomeTimeUpdate}
						onLoadedData={() => setVideoHomeLoading(false)}
						onWaiting={() => setVideoHomeLoading(true)}
						onCanPlay={() => setVideoHomeLoading(false)}
						onPlaying={() => setVideoHomeLoading(false)}
						onError={() => setVideoHomeLoading(false)}
					>
						<source
							src={video_home}
							type="video/mp4"
						/>
					</video>
				</motion.div>

				<motion.div
					className={classNames("absolute inset-0 z-20", {
						"bg-dark-blue/50": isShowingHero,
					})}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1 }}
				></motion.div>
			</div>

			{/* Content */}
			<div className="container h-full w-full relative z-30 flex justify-center text-center items-center">
				<motion.div
					className="flex flex-col items-center space-y-6 text-center w-full"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					<div className="space-y-4">
						<motion.h1
							className="px-4 text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-white pb-4 font-sans break-keep whitespace-normal break-words"
							variants={itemVariants}
							style={{
								textShadow:
									"0 2px 8px rgba(0,0,0,0.9), 0 0px 2px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.7)",
							}}
						>
							{content.title}
						</motion.h1>
						<motion.p
							className="text-xl mx-auto max-w-[1100px] px-3 text-gray-200 sm:text-lg md:text-xl lg:text-2xl font-sans break-keep whitespace-normal break-words"
							variants={itemVariants}
						>
							{content.description}
						</motion.p>
					</div>
					<motion.div
						className="space-x-6"
						variants={buttonVariants}
					>
						<Button
							asChild
							size="lg"
							className="rounded-4xl border bg-transparent border-gray-100 text-white text-xl sm:text-xl md:text-xl lg:text-xl 2xl:text-2xl px-10 py-6 sm:px-8 sm:py-6 md:px-10 md:py-7 lg:px-12 lg:py-8"
						>
							<a
								href={idRouter?.contact}
								className="flex items-center gap-3"
							>
								Contact Us
								<ArrowRightIcon className="h-6 w-6 sm:h-5 sm:w-5 md:h-6 md:w-6" />
							</a>
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</>
	);
}
