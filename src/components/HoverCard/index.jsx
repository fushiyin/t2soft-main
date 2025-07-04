import { motion } from "framer-motion";

const HoverCard = ({ icon, title, description, className = "" }) => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
			className={`flex flex-col ${icon ? "items-center text-center" : "items-start text-left"} w-full h-full gap-4 ${className}`}
		>
			{icon && (
				<div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-full inline-flex items-center justify-center text-white">
					{icon}
				</div>
			)}
			<div>
				<h2
					className={`font-semibold mb-2 text-gray-900 sm:min-h-[48px] font-sans break-keep whitespace-normal break-words ${
						icon ? "text-xl" : "text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
					}`}
				>
					{title}
				</h2>
				{!icon && (
					<div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-4">
						<div className="w-2.5 h-2.5 sm:w-[10px] sm:h-[10px] rounded-full bg-gradient-to-r from-pale-blue to-light-blue"></div>
						<div className="w-2.5 h-2.5 sm:w-[10px] sm:h-[10px] rounded-full bg-gradient-to-r from-pale-blue to-light-blue"></div>
						<div className="w-2.5 h-2.5 sm:w-[10px] sm:h-[10px] rounded-full bg-gradient-to-r from-pale-blue to-light-blue"></div>
						<div className="w-2.5 h-2.5 sm:w-[10px] sm:h-[10px] rounded-full bg-gradient-to-r from-pale-blue to-light-blue"></div>
						<div className="w-2.5 h-2.5 sm:w-[10px] sm:h-[10px] rounded-full bg-gradient-to-r from-pale-blue to-light-blue"></div>
						<div className="w-2.5 h-2.5 sm:w-[10px] sm:h-[10px] rounded-full bg-gradient-to-r from-pale-blue to-light-blue"></div>
						<div className="w-2.5 h-2.5 sm:w-[10px] sm:h-[10px] rounded-full bg-gradient-to-r from-pale-blue to-light-blue"></div>
						<div className="w-20 sm:w-28 md:w-32 h-2.5 sm:h-[10px] bg-gradient-to-r from-pale-blue to-light-blue rounded-full" />
					</div>
				)}

				<p
					className={`text-gray-900 font-sans break-keep whitespace-normal break-words ${icon ? "text-base" : "text-base sm:text-lg mt-4"} min-h-[96px]`}
				>
					{description}
				</p>
			</div>
		</motion.div>
	);
};

export default HoverCard;
