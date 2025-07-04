import bg_banner from "@/assets/career/career_banner.jpg";
import { Card, CardContent } from "@/components/ui/card";
import { FORM_CV, FORM_CV_INTERPRETER, OPEN_POSITIONS } from "@/constant/career";
import { smoothScrollTo } from "@/lib/utils";
import { idRouter } from "@/routes/idRouter";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Company from "./component/Company";
import { ArrowRight } from "lucide-react";

const containerVariants = {
	hidden: {},
	visible: {
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const fadeUp = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: "easeOut" },
	},
};

export default function Careers() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const scrollToSection = (sectionId) => {
		const section = document.getElementById(sectionId);
		if (section) {
			const y = section.offsetTop;
			smoothScrollTo(y - 60, 800);
		}
	};
	return (
		<>
			<div className="w-full flex flex-col gap-6 md:gap-10 items-center mt-[64px]">
				<div className="w-full relative">
					<img
						src={bg_banner}
						className="w-full h-[600px] md:h-[700px] object-cover"
					/>
					<div className="absolute max-w-5xl mx-auto inset-0 flex flex-col items-center justify-center">
						<motion.h1
							className="w-full text-4xl md:text-5xl text-center text-white font-bold mb-4 font-sans break-keep whitespace-normal break-words leading-normal"
							initial="hidden"
							animate="visible"
							variants={fadeUp}
							style={{
								textShadow:
									"0 2px 8px rgba(0,0,0,0.9), 0 0px 2px rgba(0,0,0,0.8), 0 4px 16px rgba(0,0,0,0.7)",
							}}
						>
							{t("careers.title")}
						</motion.h1>
						<motion.p
							className="text-center text-white text-xl md:text-2xl mb-4 font-sans break-keep whitespace-normal break-words korean-text"
							initial="hidden"
							animate="visible"
							variants={fadeUp}
						>
							{t("careers.description")}
						</motion.p>
						<div className="flex gap-4">
							<div className="flex flex-wrap justify-center gap-4 mt-2">
								<button
									className="w-[150px] flex text-center cursor-pointer justify-center hover:bg-white/80 hover:border-dark-gray hover:text-dark-gray border border-white items-center gap-2 px-4 py-2 rounded-4xl text-primary-foreground transition-colors text-lg font-medium font-sans break-keep whitespace-normal break-words"
									onClick={() => scrollToSection("open-positions-list")}
								>
									{t("careers.job_list_button")}
								</button>
							</div>
							<div className="flex flex-wrap justify-center gap-4 mt-2">
								<button
									className=" cursor-pointer inline-flex bg-primary border hover:bg-white/80 hover:text-dark-gray hover:border-primary border-white items-center gap-2 px-4 py-2 rounded-4xl text-primary-foreground transition-colors text-lg font-medium font-sans break-keep whitespace-normal break-words"
									onClick={() => navigate("/contact")}
								>
									{t("careers.contact_button")}
									<ArrowRight className="w-5 h-5" />
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="container max-w-[1440px] md:pl-6 md:pr-6 px-2 2xl:px-0">
					<Company />
					<motion.h2
						id="open-positions-list"
						className="text-3xl md:text-4xl text-dark-gray font-bold mb-6"
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						variants={fadeUp}
					>
						{t("careers.open_positions")}
					</motion.h2>

					<motion.div
						className="space-y-6 mb-12"
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
					>
						{OPEN_POSITIONS.map((position, index) => (
							<motion.div
								key={index}
								variants={fadeUp}
								whileHover={{ scale: 1.02 }}
								transition={{ type: "spring", stiffness: 180, damping: 16 }}
							>
								<Card
									className="hover:shadow-md transition-shadow bg-white/80 border-t shadow-lg cursor-pointer"
									onClick={() =>
										navigate(
											`${idRouter.careerDetail.replace(":id", position.id)}`,
										)
									}
								>
									<CardContent className="p-6">
										<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
											<div className="flex-1">
												<h3 className="text-xl md:text-2xl font-bold">
													{position.title}
												</h3>
												<div className="flex flex-wrap gap-2 mt-2">
													<span className="inline-flex text-dark-gray items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium font-sans break-keep whitespace-normal break-words">
														{position.location}
													</span>
													<span className="inline-flex text-dark-gray items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium font-sans break-keep whitespace-normal break-words">
														{position.type}
													</span>
													<span className="inline-flex text-dark-gray items-center rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium font-sans break-keep whitespace-normal break-words">
														{position.site}
													</span>
												</div>
												<p className="text-muted-foreground mt-2">
													{position.description}
												</p>
											</div>
											<motion.button
												className="md:item-center cursor-pointer bg-primary lg:w-[130px] md:w-[130px] text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 transition"
												whileTap={{ scale: 0.95 }}
												onClick={(e) => {
													e.stopPropagation();
													window.open(
														position.id === 3
															? FORM_CV_INTERPRETER
															: FORM_CV,
													);
												}}
											>
												Apply Now
											</motion.button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
			<motion.div
				className="w-full bg-muted py-12 px-6"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={fadeUp}
			>
				<div className="max-w-[1440px] flex flex-col md:flex-row mx-auto space-y-6 md:space-y-0 md:space-x-6 sm:w-full">
					<motion.div className="flex-1 space-y-4">
						<h2 className="text-3xl md:text-4xl text-dark-gray font-bold font-sans break-keep whitespace-normal break-words">
							{t("careers.title_cv")}
						</h2>
						<p className="text-muted-foreground text-lg md:text-xl font-sans break-keep whitespace-normal break-words">
							{t("careers.description_cv")}
						</p>
					</motion.div>

					<div className="flex-1 flex xl:justify-end lg:justify-end md:justify-end sm:pt-6 md:p-6 lg:p-0 xl:p-0 2xl:p-6 items-center xl:w-fix p-0 sm:w-full">
						<div className="w-full lg:w-[130px] md:w-[130px] sm:w-full">
							<motion.a
								onClick={() => window.open(FORM_CV)}
								className="w-full bg-primary text-center text-white px-4 py-2 rounded-md font-medium hover:bg-primary/90 inline-block cursor-pointer"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.97 }}
								transition={{ type: "spring", stiffness: 200, damping: 15 }}
								layout
							>
								Send CV
							</motion.a>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
}
