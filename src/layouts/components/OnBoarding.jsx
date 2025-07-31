import T2Logo from "@/assets/logos/T2_dark_Logo.png";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { TrendingUp, BarChart3, Coins } from "lucide-react";

const ANIMATION_DURATION = 4;

export default function Onboarding() {
	const [showContent, setShowContent] = useState(false);
	const [showOnboarding, setShowOnboarding] = useState(true);

	useEffect(() => {
		setShowOnboarding(true);
		setShowContent(true);

		const completeTimer = setTimeout(() => {
			setShowOnboarding(false);
		}, ANIMATION_DURATION * 1000);

		return () => {
			clearTimeout(completeTimer);
		};
	}, []);

	if (!showOnboarding) return null;

	return (
		<AnimatePresence>
			<motion.div
				className="fixed inset-0 z-[100] overflow-hidden"
				initial={{ opacity: 1 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.8 }}
			>
				<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/20"></div>
					<div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
				</div>

				{/* Floating elements */}
				{[...Array(12)].map((_, i) => (
					<motion.div
						key={i}
						className="absolute w-1 h-1 bg-blue-400/50 rounded-full"
						style={{
							left: `${Math.random() * 100}%`,
							top: `${Math.random() * 100}%`,
						}}
						animate={{
							y: [0, -50, 0],
							opacity: [0, 1, 0],
						}}
						transition={{
							duration: 4 + Math.random() * 2,
							repeat: Infinity,
							delay: Math.random() * 2,
						}}
					/>
				))}

				<div className="relative z-10 h-full flex items-center justify-center px-4">
					<div className="max-w-2xl w-full text-center flex flex-col items-center">
						{/* Logo Section */}
						<motion.div
							className="mb-12"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{
								opacity: showContent ? 1 : 0,
								scale: showContent ? 1 : 0.8,
							}}
							transition={{ duration: 1, ease: "easeOut" }}
						>
							<div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg aspect-square w-12">
								<TrendingUp className="h-8 w-8 text-white" />
							</div>
						</motion.div>

						{/* Brand name */}
						<motion.div
							className="mb-8"
							initial={{ opacity: 0, y: 30 }}
							animate={{
								opacity: showContent ? 1 : 0,
								y: showContent ? 0 : 30,
							}}
							transition={{ duration: 0.8, delay: 0.3 }}
						>
							<h1 className="text-5xl md:text-7xl font-black mb-4">
								<span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
									Trade
								</span>
								<span className="text-white">Master</span>
							</h1>
							<div className="h-1 w-32 bg-gradient-to-r from-green-400 to-blue-500 mx-auto rounded-full"></div>
						</motion.div>

						{/* Subtitle */}
						<motion.div
							className="mb-12"
							initial={{ opacity: 0, y: 20 }}
							animate={{
								opacity: showContent ? 1 : 0,
								y: showContent ? 0 : 20,
							}}
							transition={{ duration: 0.8, delay: 0.6 }}
						>
							<p className="text-xl md:text-2xl text-gray-300 font-medium">
								Chia sẻ kiến thức, công cụ và chiến lược giao dịch hàng đầu
							</p>
						</motion.div>

						{/* Website URL */}
						<motion.div
							className="text-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: showContent ? 1 : 0 }}
							transition={{ delay: 1.2 }}
						>
							<p className="text-gray-500 font-medium">www.trademaster.vn</p>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
