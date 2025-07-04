import client_approval from "@/assets/images/Client_Approval.jpg";
import client_request from "@/assets/images/Client_Request.jpg";
import contract_sign_off from "@/assets/images/Contract_Sign-off.jpg";
import project_kick_off from "@/assets/images/Project_Kick-off.jpg";
import proposal from "@/assets/images/Proposal.jpg";
import requirement_analysis from "@/assets/images/Requirement_Analysis.jpg";

import useResponsive from "@/hooks/useResponsive";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import { Handshake, Lightbulb, Rocket, SearchCode, UserRoundCheck, UserSearch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Process steps data
const iconClass =
	"h-3 w-4 text-gray-600 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-3/5 z-10";

export default function OurProcess({ contentClass }) {
	const { t } = useTranslation();
	const sectionRef = useRef(null);
	const { isMobile } = useResponsive();
	const [activeStep, setActiveStep] = useState(1);
	const [isPaused, setIsPaused] = useState(true);
	const [isVisible, setIsVisible] = useState(false);
	const processSteps = [
		{
			id: 1,
			title: t("process.steps.client_request.title"),
			image: client_request,
			icon: (
				<UserSearch
					strokeWidth={3}
					className={iconClass}
				/>
			),
			description: t("process.steps.client_request.description"),
			details: t("process.steps.client_request.details", { returnObjects: true }),
			color: "rgba(45, 45, 45, 0.6)",
		},
		{
			id: 2,
			title: t("process.steps.requirement_analysis.title"),
			icon: (
				<SearchCode
					strokeWidth={3}
					className={iconClass}
				/>
			),
			image: requirement_analysis,
			description: t("process.steps.requirement_analysis.description"),
			details: t("process.steps.requirement_analysis.details", { returnObjects: true }),
			color: "rgba(45, 45, 45, 0.6)",
		},
		{
			id: 3,
			title: t("process.steps.proposal.title"),
			icon: (
				<Lightbulb
					strokeWidth={3}
					className={iconClass}
				/>
			),
			image: proposal,
			description: t("process.steps.proposal.description"),
			details: t("process.steps.proposal.details", { returnObjects: true }),
			color: "rgba(45, 45, 45, 0.6)",
		},
		{
			id: 4,
			title: t("process.steps.client_approval.title"),
			image: client_approval,
			icon: (
				<UserRoundCheck
					strokeWidth={3}
					className={iconClass}
				/>
			),
			description: t("process.steps.client_approval.description"),
			details: t("process.steps.client_approval.details", { returnObjects: true }),
			color: "rgba(45, 45, 45, 0.6)",
		},
		{
			id: 5,
			title: t("process.steps.contract_sign_off.title"),
			image: contract_sign_off,
			icon: (
				<Handshake
					strokeWidth={3}
					className={iconClass}
				/>
			),
			description: t("process.steps.contract_sign_off.description"),
			details: t("process.steps.contract_sign_off.details", { returnObjects: true }),
			color: "rgba(45, 45, 45, 0.6)",
		},
		{
			id: 6,
			title: t("process.steps.project_kick_off.title"),
			icon: (
				<Rocket
					strokeWidth={3}
					className={iconClass}
				/>
			),
			image: project_kick_off,
			description: t("process.steps.project_kick_off.description"),
			details: t("process.steps.project_kick_off.details", { returnObjects: true }),
			color: "rgba(45, 45, 45, 0.6)",
		},
	];

	// Auto-advance through steps
	useEffect(() => {
		if (!isVisible || isPaused) return;

		const interval = setInterval(() => {
			setActiveStep((prev) => {
				if (prev >= processSteps.length) {
					return 1; // Loop back to the first step
				}
				return prev + 1;
			});
		}, 4000); // Change step every 4 seconds

		return () => clearInterval(interval);
	}, [isPaused, isVisible, processSteps?.length]);

	// Check if section is visible
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.3 }, // Trigger when 30% of the section is visible
		);

		const currentSectionRef = sectionRef.current;
		if (currentSectionRef) {
			observer.observe(currentSectionRef);
		}

		return () => {
			if (currentSectionRef) {
				observer.unobserve(currentSectionRef);
			}
		};
	}, []);

	return (
		<div
			ref={sectionRef}
			className="w-full h-full flex items-center justify-center bg-muted/50"
		>
			<div
				className={classNames("flex flex-col justify-center items-center", {
					[contentClass]: contentClass,
				})}
			>
				<div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 md:mb-20">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-dark-gray">
							{t("process.title")}
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans break-keep whitespace-normal break-words">
							{t("process.description")}
						</p>
					</div>
				</div>

				{/* Progress Bar */}
				<div className="relative md:mb-10 w-full">
					<div className="h-2 w-[80%] px-[10px] md:w-[90%] bg-gray-200 rounded-full absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						<motion.div
							className="h-2 rounded-full bg-gray-600"
							style={{
								// backgroundColor: processSteps[activeStep - 1].color,
								width: `${((activeStep - 1) / (processSteps.length - 1)) * 100}%`,
							}}
							initial={{ width: "0%" }}
							animate={{
								width: `${((activeStep - 1) / (processSteps.length - 1)) * 100}%`,
							}}
							transition={{ duration: 0.5, ease: "easeInOut" }}
						/>
					</div>

					{/* Step Indicators */}
					<div className="w-[80%] md:w-[90%] absolute flex justify-between left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
						{processSteps.map((step) => (
							<button
								key={step.id}
								className="cursor-pointer relative focus:outline-none backdrop-blur-sm backdrop-brightness-80 rounded-full"
								onClick={() => {
									setActiveStep(step.id);
									setIsPaused(true); // Pause auto-advance when user interacts
									// Resume auto-advance after 10 seconds of inactivity
									setTimeout(() => setIsPaused(false), 10000);
								}}
							>
								<motion.div
									className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${
										step.id <= activeStep
											? "border-dark-gray"
											: "border-gray-300"
									}`}
									style={{
										backgroundColor:
											step.id <= activeStep ? step.color : "white",
									}}
									animate={{
										scale: step.id === activeStep ? 1.2 : 1,
										backgroundColor:
											step.id <= activeStep ? step.color : "white",
										borderColor:
											step.id <= activeStep
												? "rgba(203, 213, 225, 1)"
												: "rgba(203, 213, 225, 1)",
									}}
									transition={{ duration: 0.3 }}
								>
									{step.id < activeStep && (
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-3 w-3 text-white"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={3}
												d="M5 13l4 4L19 7"
											/>
										</svg>
									)}
									{step.id === activeStep && (
										<motion.div
											className="w-2 h-2 bg-white rounded-full"
											animate={{ scale: [1, 1.5, 1] }}
											transition={{
												duration: 2,
												repeat: Number.POSITIVE_INFINITY,
											}}
										/>
									)}
								</motion.div>
								<div
									className={classNames(
										"absolute -top-5 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-xs font-medium",
										{
											"text-dark-gray": step.id === activeStep,
											"text-gray-500": step.id !== activeStep,
											hidden: step.id > activeStep,
										},
									)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 24 24"
										fill="white"
										stroke="currentColor"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
										className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1 h-9 w-9 text-black dark:text-white" // h-9 = 36px
									>
										<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
									</svg>

									{step?.icon}
								</div>
							</button>
						))}
					</div>
				</div>

				{/* Active Step Content */}
				<div className="h-full flex flex-col flex-1 md:flex-row md:gap-4 gap-6 justify-center items-center xl:items-stretch md:py-5 py-10 xl:px-0 lg:px-4 w-[90%]">
					{/* Step Visualization */}
					{!isMobile && (
						<div className="w-[80%] md:w-6/10 flex justify-center items-center h-auto">
							<AnimatePresence mode="wait">
								<motion.div
									key={activeStep}
									initial={{ opacity: 0, scale: 0.8, y: 20 }}
									animate={{ opacity: 1, scale: 1, y: 0 }}
									exit={{ opacity: 0, scale: 0.8, y: -20 }}
									transition={{ duration: 0.5 }}
									className="relative"
								>
									<img
										src={processSteps[activeStep - 1].image}
										alt={`step_${activeStep}`}
										style={{ width: "700px", height: "392px" }}
										className="object-cover  rounded-lg shadow-lg"
									/>
								</motion.div>
							</AnimatePresence>
						</div>
					)}
					{/* Step Details */}
					<div className="w-[95%] sm:w-[90%] lg:w-4/10 h-auto mx-auto">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeStep}
								initial={{ opacity: 0, x: 50 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -50 }}
								transition={{ duration: 0.5 }}
								className="bg-white p-4 md:p-8 rounded-lg shadow-lg h-full flex flex-col justify-between"
							>
								<div className="step-text">
									<h3 className="text-2xl font-bold mb-4 text-dark-gray">
										{processSteps[activeStep - 1].title}
									</h3>
									<p className="text-gray-600 mb-6 font-sans break-keep whitespace-normal break-words">
										{processSteps[activeStep - 1].description}
									</p>
								</div>

								<div className="flex flex-col flex-wrap gap-4">
									{processSteps[activeStep - 1].details.map((detail, index) => (
										<motion.div
											key={index}
											className="flex items-start gap-2 w-fit"
											initial={{ opacity: 0, y: 10 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.3, delay: index * 0.1 }}
										>
											<div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border border-gray-400 bg-white dark:bg-gray-800">
												<div className="w-1.5 h-1.5 rounded-full bg-gray-600 dark:bg-gray-300"></div>
											</div>
											<span className="text-gray-700 dark:text-gray-200 font-sans break-keep whitespace-normal break-words">
												{detail}
											</span>
										</motion.div>
									))}
								</div>

								<div className="mt-8 flex justify-between">
									<button
										onClick={() => {
											setActiveStep((prev) =>
												prev > 1 ? prev - 1 : processSteps.length,
											);
											setIsPaused(true);
											setTimeout(() => setIsPaused(false), 10000);
										}}
										className=" hover:text-dark-gray flex items-center gap-1 transition-colors"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
												clipRule="evenodd"
											/>
										</svg>
										{t("process.navigation.previous")}
									</button>
									<button
										onClick={() => {
											setActiveStep((prev) =>
												prev < processSteps.length ? prev + 1 : 1,
											);
											setIsPaused(true);
											setTimeout(() => setIsPaused(false), 10000);
										}}
										className=" hover:text-dark-gray flex items-center gap-1 transition-colors"
									>
										{t("process.navigation.next")}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="h-5 w-5"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
												clipRule="evenodd"
											/>
										</svg>
									</button>
								</div>
							</motion.div>
						</AnimatePresence>
					</div>
				</div>
			</div>
		</div>
	);
}
