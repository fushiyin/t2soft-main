import { motion } from "framer-motion";

const colors = ["#03071F", "#090F33", "#101944", "#19286D", "#DAE4ED"];

const DotLoader = () => (
	<div className="flex space-x-3">
		{colors.map((color, index) => (
			<motion.div
				key={index}
				className="w-4 h-4 rounded-full"
				style={{ backgroundColor: color }}
				animate={{
					scale: [1, 1.5, 1],
					opacity: [0.7, 1, 0.7],
				}}
				transition={{
					duration: 1.2,
					repeat: Number.POSITIVE_INFINITY,
					delay: index * 0.1,
					ease: "easeInOut",
				}}
			/>
		))}
	</div>
);

export default DotLoader;
