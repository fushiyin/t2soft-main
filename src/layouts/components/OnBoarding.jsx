import T2Logo from "@/assets/logos/T2_dark_Logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOnboarding } from "./OnBoardingProvider";

const ANIMATION_DURATION = 5;

export default function Onboarding() {
	const { hasSeenOnboarding, setHasSeenOnboarding } = useOnboarding();
	const [animationStep, setAnimationStep] = useState(0);
	const [showContent, setShowContent] = useState(false);
	const [exitAnimation, setExitAnimation] = useState(false);
	const [showOnboarding, setShowOnboarding] = useState(true);
	const { t } = useTranslation();

	useEffect(() => {
		if (hasSeenOnboarding) {
			setShowOnboarding(false);
			return;
		}

		const timer1 = setTimeout(() => setAnimationStep(1), 500);
		const timer2 = setTimeout(() => setAnimationStep(2), 1000);
		const timer3 = setTimeout(() => setAnimationStep(3), 1500);
		t;
		const timer4 = setTimeout(() => setShowContent(true), 2000);
		const timer5 = setTimeout(() => setExitAnimation(true), ANIMATION_DURATION * 1000);
		const timer6 = setTimeout(
			() => {
				setHasSeenOnboarding(true);
				setShowOnboarding(false);
			},
			(ANIMATION_DURATION + 1) * 1000,
		);

		return () => {
			clearTimeout(timer1);
			clearTimeout(timer2);
			clearTimeout(timer3);
			clearTimeout(timer4);
			clearTimeout(timer5);
			clearTimeout(timer6);
		};
	}, [hasSeenOnboarding, setHasSeenOnboarding]);

	if (!showOnboarding) return null;

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-[100] overflow-hidden bg-white"
				initial={{ opacity: 1 }}
				animate={{ opacity: exitAnimation ? 0 : 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 1 }}
			>
				<motion.div
					className="absolute top-0 left-0 w-full h-full bg-deepest-navy"
					initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
					animate={{
						clipPath:
							animationStep >= 1
								? "polygon(0 0, 100% 0, 70% 100%, 0% 100%)"
								: "polygon(0 0, 0 0, 0 100%, 0% 100%)",
					}}
					transition={{ duration: 0.8, ease: "easeOut" }}
				/>
				<motion.div
					className="absolute top-0 left-0 w-full h-full bg-near-black-blue"
					initial={{
						clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
					}}
					animate={{
						clipPath:
							animationStep >= 2
								? "polygon(100% 0, 100% 0, 100% 100%, 70% 100%)"
								: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
					}}
					transition={{ duration: 0.8, ease: "easeOut" }}
				/>
				<motion.div
					className="absolute top-0 left-0 w-full h-full bg-draker-blue"
					initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 0, 100% 0)" }}
					animate={{
						clipPath:
							animationStep >= 3
								? "polygon(60% 0, 100% 0, 100% 50%, 80% 100%)"
								: "polygon(100% 0, 100% 0, 100% 0, 100% 0)",
					}}
					transition={{ duration: 0.8, ease: "easeOut" }}
				/>
				<div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
					<div className="max-w-4xl w-full">
						<motion.div
							className="mb-8 flex justify-center"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{
								opacity: showContent ? 1 : 0,
								scale: showContent ? 1 : 0.8,
							}}
							transition={{ duration: 0.8, delay: 0.2 }}
						>
							<div className="relative w-80 h-40 rounded-full flex items-center justify-center shadow-lg">
								<img
									src={T2Logo}
									alt="logo"
								/>
							</div>
						</motion.div>
						<motion.h2
							className="text-2xl md:text-3xl font-medium mb-8 text-white text-center"
							initial={{ opacity: 0, y: 30 }}
							animate={{
								opacity: showContent ? 1 : 0,
								y: showContent ? 0 : 30,
							}}
							transition={{ duration: 0.8, delay: 0.7 }}
						>
							{t("slogan")}
						</motion.h2>

						{/* Nếu bạn cần hiển thị phần description, bỏ "hidden" ở đây */}
						<motion.div
							className="hidden"
							initial={{ opacity: 0, y: 30 }}
							animate={{
								opacity: showContent ? 1 : 0,
								y: showContent ? 0 : 30,
							}}
							transition={{ duration: 0.8, delay: 0.9 }}
						>
							<div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
								<h3 className="text-xl font-bold mb-2">Innovation</h3>
								<p>
									We specialize in cutting-edge technology solutions, pushing the
									boundaries of what&apos;s possible in digital transformation.
								</p>
							</div>

							<div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
								<h3 className="text-xl font-bold mb-2">Expertise</h3>
								<p>
									Our team of skilled engineers and designers brings years of
									experience across various technologies and industries.
								</p>
							</div>

							<div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
								<h3 className="text-xl font-bold mb-2">Partnership</h3>
								<p>
									We work closely with our clients to understand their unique
									challenges and deliver tailored solutions that drive success.
								</p>
							</div>
						</motion.div>

						<motion.div
							className="mt-12 text-center text-white"
							initial={{ opacity: 0 }}
							animate={{ opacity: showContent ? 1 : 0 }}
							transition={{ duration: 0.8, delay: 1.1 }}
						>
							<p className="text-lg">www.ttwosoft.com</p>
							{/* <p className="text-lg">www.t2soft.vn</p> */}
						</motion.div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
