import classNames from "classnames";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FAQ() {
	const [openIndex, setOpenIndex] = useState(null);
	const { t } = useTranslation();

	const handleToggle = (idx) => {
		setOpenIndex(openIndex === idx ? null : idx);
	};

	const faqs = [
		{
			question: t("faq.questions.services.question"),
			answer: t("faq.questions.services.answer"),
		},
		{
			question: t("faq.questions.technologies.question"),
			answer: t("faq.questions.technologies.answer"),
		},
		{
			question: t("faq.questions.quality.question"),
			answer: t("faq.questions.quality.answer"),
		},
		{
			question: t("faq.questions.communication.question"),
			answer: t("faq.questions.communication.answer"),
		},
		{
			question: t("faq.questions.pricing.question"),
			answer: t("faq.questions.pricing.answer"),
		},
	];

	const questionVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: (i) => ({
			opacity: 1,
			y: 0,
			transition: {
				delay: i * 0.1,
				duration: 0.5,
			},
		}),
	};

	const answerVariants = {
		hidden: { opacity: 0, height: 0 },
		visible: {
			opacity: 1,
			height: "auto",
			transition: {
				duration: 0.5,
				ease: "easeInOut",
			},
		},
		exit: {
			opacity: 0,
			height: 0,
			transition: {
				duration: 0.3,
				ease: "easeInOut",
			},
		},
	};

	return (
		<section className="w-full max-w-2xl mx-auto">
			<div className="divide-y divide-gray-200">
				{faqs.map((faq, idx) => (
					<motion.div
						key={idx}
						className="relative"
						variants={questionVariants}
						initial="hidden"
						animate="visible"
						custom={idx}
					>
						<motion.button
							className={classNames(
								"w-full flex items-center justify-between pb-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-colors duration-300",
								{
									"pt-5": idx,
								},
							)}
							onClick={() => handleToggle(idx)}
							aria-expanded={openIndex === idx}
							aria-controls={`faq-panel-${idx}`}
							whileHover={{ scale: 1.01 }}
							whileTap={{ scale: 0.99 }}
						>
							<motion.span
								className="font-semibold text-lg md:text-xl transition-all duration-300"
								style={
									openIndex === idx
										? {
												background:
													"linear-gradient(to right, var(--color-light-mint), var(--color-light-green))",
												WebkitBackgroundClip: "text",
												WebkitTextFillColor: "transparent",
											}
										: {}
								}
							>
								{faq.question}
							</motion.span>

							<motion.span
								className="ml-4 text-2xl select-none"
								animate={{
									rotate: openIndex === idx ? 45 : 0,
									scale: openIndex === idx ? 1.1 : 1,
								}}
								transition={{ duration: 0.3 }}
							>
								+
							</motion.span>
						</motion.button>
						<AnimatePresence>
							{openIndex === idx && (
								<motion.div
									id={`faq-panel-${idx}`}
									variants={answerVariants}
									initial="hidden"
									animate="visible"
									exit="exit"
									className="overflow-hidden"
								>
									<motion.div
										className="pb-5 pl-2 text-base md:text-lg text-muted-foreground font-sans break-keep whitespace-normal break-words"
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: 0.2 }}
									>
										{faq.answer}
									</motion.div>
								</motion.div>
							)}
						</AnimatePresence>
					</motion.div>
				))}
			</div>
		</section>
	);
}
