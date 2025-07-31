import { Button } from "@/components/ui/button";
import { idRouter } from "@/routes/idRouter";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "lucide-react";

const containerVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: "easeOut",
			staggerChildren: 0.2,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

export default function PageNotFound() {
	return (
		<>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				animate="visible"
				className="w-full h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden"
			>
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/20"></div>
					<div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
				</div>

				<motion.div
					variants={itemVariants}
					className="relative z-10 mb-8"
				>
					<div className="text-8xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-4">
						404
					</div>
				</motion.div>

				<motion.h2
					variants={itemVariants}
					className="text-4xl md:text-5xl font-black text-white mb-4"
				>
					Trang không tồn tại
				</motion.h2>

				<motion.p
					variants={itemVariants}
					className="text-lg text-gray-300 mb-8 max-w-md"
				>
					Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
				</motion.p>

				<motion.div variants={itemVariants}>
					<Button
						asChild
						size="lg"
						className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg border-0"
					>
						<a
							href={idRouter?.home}
							className="flex items-center gap-2"
						>
							Về trang chủ <ArrowRightIcon className="h-4 w-4" />
						</a>
					</Button>
				</motion.div>
			</motion.div>
		</>
	);
}
