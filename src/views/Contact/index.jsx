import { ADDRESS_SITE } from "@/constant/common";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const containerVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

export default function Contact() {
	const { t } = useTranslation();

	return (
		<div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden py-20 mt-[64px]">
			{/* Enhanced Animated Background */}
			<div className="absolute inset-0">
				{/* Primary gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-teal-900/20"></div>

				{/* Animated orbs */}
				<div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-teal-600/12 to-blue-600/12 rounded-full blur-3xl animate-pulse delay-500"></div>

				{/* Additional subtle orbs */}
				<div className="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-600/8 to-blue-500/8 rounded-full blur-2xl animate-pulse delay-700"></div>
				<div className="absolute bottom-10 left-1/3 w-48 h-48 bg-gradient-to-r from-teal-600/10 to-cyan-600/10 rounded-full blur-2xl animate-pulse delay-300"></div>

				{/* Subtle grid pattern */}
				<div className="absolute inset-0 opacity-5">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
							backgroundSize: "50px 50px",
						}}
					></div>
				</div>
			</div>

			<div className="relative z-10 mx-auto max-w-[1440px] px-4 md:px-6">
				{/* Header Section */}
				<div className="text-center mb-12">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 shadow-xl">
						<svg
							className="w-8 h-8 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path
								fillRule="evenodd"
								d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
								clipRule="evenodd"
							/>
						</svg>
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
						Khảo sát và Liên hệ
					</h1>
				</div>

				<div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
					{/* Survey Form Section */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						className="lg:w-full"
					>
						<motion.div
							variants={itemVariants}
							className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden"
						>
							<div className="p-6 md:p-8 border-b border-white/10">
								<h2 className="text-2xl md:text-3xl font-bold text-white mb-2 flex items-center">
									<svg
										className="w-6 h-6 mr-3 text-blue-400"
										fill="currentColor"
										viewBox="0 0 20 20"
									>
										<path
											fillRule="evenodd"
											d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
											clipRule="evenodd"
										/>
									</svg>
									Khảo sát học viên
								</h2>
								<p className="text-gray-300">
									Vui lòng dành vài phút để hoàn thành khảo sát bên dưới
								</p>
							</div>

							{/* Google Forms Iframe Container */}
							<div className="relative">
								<div className="w-full h-[800px] md:h-[900px] bg-white/5 backdrop-blur-sm">
									<iframe
										src="https://docs.google.com/forms/d/e/1FAIpQLSfTS702r_PqhgPVXgHauJO2XN0zP-2PYGFop3L91QYytRn5-A/viewform?embedded=true"
										width="100%"
										height="100%"
										frameBorder="0"
										marginHeight="0"
										marginWidth="0"
										title="Khảo sát học viên"
									>
										Đang tải…
									</iframe>
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
