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
				className="w-full h-screen flex flex-col items-center justify-center text-center px-4"
			>
				<motion.h2
					variants={itemVariants}
					className="text-4xl font-bold text-gray-800 mb-4"
				>
					This page could not be found
				</motion.h2>

				<motion.p
					variants={itemVariants}
					className="text-lg text-gray-600 mb-6"
				>
					The page you are trying to access does not exist.
				</motion.p>

				<motion.div variants={itemVariants}>
					<Button
						asChild
						size="lg"
						className="rounded-md bg-draker-blue text-white hover:bg-dark-blue"
					>
						<a
							href={idRouter?.home}
							className="flex items-center gap-2"
						>
							Back To Home <ArrowRightIcon className="h-4 w-4" />
						</a>
					</Button>
				</motion.div>
			</motion.div>
		</>
	);
}
