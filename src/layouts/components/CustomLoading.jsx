/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { useOnboarding } from "./OnBoardingProvider";
import { Loader2, TrendingUp } from "lucide-react";

const Loading = ({ defaultLoading }) => {
	const { isLoading, setIsLoading } = useOnboarding();

	return (
		<AnimatePresence>
			{(isLoading || defaultLoading) && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.3, ease: "easeOut" }}
					className="fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-br from-gray-900/95 via-slate-900/95 to-black/95 backdrop-blur-lg"
				>
					<div className="text-center">
						{/* Loading animation */}
						<motion.div
							className="relative mb-6"
							initial={{ scale: 0.8 }}
							animate={{ scale: 1 }}
							transition={{ duration: 0.5 }}
						>
							<div className="relative">
								{/* Outer ring */}
								<motion.div
									className="w-20 h-20 border-4 border-blue-500/30 rounded-full"
									animate={{ rotate: 360 }}
									transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
								/>
								{/* Inner spinning loader */}
								<motion.div
									className="absolute top-2 left-2 w-16 h-16 border-4 border-transparent border-t-blue-500 rounded-full"
									animate={{ rotate: 360 }}
									transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
								/>
							</div>
						</motion.div>

						{/* Loading text */}
						<motion.div
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
						>
							<h3 className="text-xl font-semibold text-white mb-2">TradeMaster</h3>
							<p className="text-gray-400 text-sm">Đang tải dữ liệu thị trường...</p>
						</motion.div>

						{/* Loading dots */}
						<motion.div
							className="flex justify-center space-x-1 mt-4"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.4 }}
						>
							{[0, 1, 2].map((i) => (
								<motion.div
									key={i}
									className="w-2 h-2 bg-blue-500 rounded-full"
									animate={{
										scale: [1, 1.2, 1],
										opacity: [0.5, 1, 0.5],
									}}
									transition={{
										duration: 1.5,
										repeat: Infinity,
										delay: i * 0.2,
									}}
								/>
							))}
						</motion.div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Loading;
