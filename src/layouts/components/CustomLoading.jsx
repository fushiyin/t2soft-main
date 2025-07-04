/* eslint-disable no-unused-vars */
import { AnimatePresence, motion } from "framer-motion";
import { useOnboarding } from "./OnBoardingProvider";
import Lottie from "react-lottie";
import loadingAnimation from "@/assets/lotties/loading.json";

const Loading = ({ defaultLoading }) => {
	const { isLoading, setIsLoading } = useOnboarding();

	return (
		<AnimatePresence>
			{(isLoading || defaultLoading) && (
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -50 }}
					transition={{ duration: 0.5, ease: "easeOut" }}
					className="fixed inset-0 z-490 flex items-center justify-center bg-black/50 backdrop-blur-sm"
				>
					<Lottie
						options={{
							loop: true,
							autoplay: true,
							animationData: loadingAnimation,
						}}
						height={250}
						width={250}
					/>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default Loading;
