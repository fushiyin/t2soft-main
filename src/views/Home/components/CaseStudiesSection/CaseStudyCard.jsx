import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

const CaseStudyCard = ({ item }) => {
	return (
		<motion.div
			whileHover={{ scale: 1.05 }}
			transition={{ type: "spring", stiffness: 300 }}
			className="bg-white rounded-xl overflow-hidden border shadow-md w-[450px] max-md:w-[350px] max-sm:w-full "
		>
			<img
				src={item.image}
				alt="Case study"
				className="w-full h-[184px] rounded-t-[8px] object-cover"
			/>
			<div className="p-4">
				<span className="inline-block px-4 py-2 mb-6 text-sm font-bold text-SecondaryBg italic rounded-md border border-SecondaryBg">
					{item.category}
				</span>
				<h2
					className="mb-4 text-xl font-bold leading-6"
					style={{ color: "var(--foreground)" }}
				>
					{item.title}
				</h2>
				<p
					className="mb-6 text-sm font-light leading-6"
					style={{ color: "var(--foreground)" }}
				>
					{item.description}
				</p>
				<p
					className="mb-4 text-sm font-light leading-6"
					style={{ color: "var(--foreground)", opacity: 0.8 }}
				>
					<span
						className="font-bold"
						style={{ color: "var(--foreground)" }}
					>
						Technologies:
					</span>{" "}
					<span>{item.technologies}</span>
				</p>
				<motion.button
					whileHover={{
						scale: 1.05,
						x: 3,
						backgroundColor: "var(--muted)",
					}}
					transition={{ type: "spring", stiffness: 300 }}
					className="flex items-center gap-1 underline cursor-pointer px-2 py-1 rounded hover:underline transition-all duration-300 ease-in-out"
				>
					More{" "}
					<motion.span
						whileHover={{ x: 5 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<ArrowRightIcon className="h-4 w-4" />
					</motion.span>
				</motion.button>
			</div>
		</motion.div>
	);
};

export default CaseStudyCard;
