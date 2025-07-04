import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ADDRESS_SITE } from "@/constant/common";
import { motion } from "framer-motion";
import { useState } from "react";
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
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		company: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		await new Promise((resolve) => setTimeout(resolve, 1000));

		console.log("Form submitted:", formState);

		setIsSubmitting(false);
		setIsSubmitted(true);
		setFormState({ name: "", email: "", company: "", message: "" });

		setTimeout(() => setIsSubmitted(false), 5000);
	};

	return (
		<div className="w-full h-full bg-white py-[64px] mt-[64px]">
			<div className="mx-auto max-w-[1440px]">
				<div className="flex flex-col md:flex-row-reverse">
					<div className="w-full h-full bg-white flex items-center justify-center">
						<div className="container px-0 md:px-4 h-full flex flex-col justify-center">
							<motion.div
								variants={containerVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, amount: 0.2 }}
								className="grid gap-10 lg:grid-cols-2 items-center"
							>
								<motion.div
									variants={itemVariants}
									className="space-y-4 p-3 md:p-3 lg:p-6 xl:p-6"
								>
									<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-dark-gray font-sans break-keep whitespace-normal break-words">
										{t("contact.description")}
									</h2>
									<p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed font-sans break-keep whitespace-normal break-words">
										{t("contact.description2")}
									</p>
									<ul className="space-y-2 text-muted-foreground">
										{["expert", "cutting_edge", "dedicated"].map((key) => (
											<li
												className="flex items-center gap-2"
												key={key}
											>
												<span className="h-2 w-2 rounded-full bg-near-black-blue" />
												<span className="font-sans break-keep whitespace-normal break-words">
													{t(`contact.description_sub.${key}`)}
												</span>
											</li>
										))}
									</ul>
								</motion.div>

								<motion.div
									variants={itemVariants}
									className="bg-white/80 rounded-lg border-t shadow-lg"
								>
									{isSubmitted ? (
										<motion.div
											className="flex flex-col items-center justify-center h-full py-8 text-center"
											initial={{ opacity: 0, scale: 0.9 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{ duration: 0.3 }}
										>
											<div className="rounded-full bg-green-100 p-3 mb-4">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="h-6 w-6 text-green-600"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth={2}
														d="M5 13l4 4L19 7"
													/>
												</svg>
											</div>
											<h3 className="text-xl font-bold mb-2 text-dark-gray font-sans break-keep whitespace-normal break-words">
												{t("contact.form.success_submit")}
											</h3>
											<p className="text-muted-foreground font-sans break-keep whitespace-normal break-words">
												{t("contact.form.success_message")}
											</p>
										</motion.div>
									) : (
										<motion.form
											variants={containerVariants}
											initial="hidden"
											animate="visible"
											onSubmit={handleSubmit}
											className="space-y-4 p-3 md:p-3 lg:p-6 xl:p-6"
										>
											{["name", "email", "company", "message"].map(
												(field) => (
													<motion.div
														key={field}
														variants={itemVariants}
													>
														<label
															htmlFor={field}
															className="block text-sm font-medium mb-1 text-dark-gray"
														>
															{t(`contact.form.${field}`)}
														</label>
														{field === "message" ? (
															<Textarea
																id={field}
																name={field}
																required
																value={formState[field]}
																onChange={handleChange}
																placeholder={t(
																	`contact.form.${field}_placeholder`,
																)}
																className="font-sans break-keep whitespace-normal break-words min-h-[120px] border-t2-grayBlue focus:outline-none focus:ring-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-SecondaryBg"
															/>
														) : (
															<Input
																id={field}
																name={field}
																type={
																	field === "email"
																		? "email"
																		: "text"
																}
																required={field !== "company"}
																value={formState[field]}
																onChange={handleChange}
																placeholder={t(
																	`contact.form.${field}_placeholder`,
																)}
																className="focus:outline-none focus:ring-0 focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-0 border-t2-grayBlue focus-visible:border-SecondaryBg"
															/>
														)}
													</motion.div>
												),
											)}

											<motion.div variants={itemVariants}>
												<Button
													type="submit"
													className="w-full bg-dark-blue hover:bg-SecondaryBg cursor-pointer text-white transition-colors duration-300"
													disabled={isSubmitting}
												>
													{isSubmitting
														? t("contact.form.submitting")
														: t("contact.form.submit")}
												</Button>
											</motion.div>
										</motion.form>
									)}
								</motion.div>
							</motion.div>
						</div>
					</div>
				</div>
				{/* Map Section */}
				<div className="w-full flex flex-col items-center mt-12 px-2 md:px-4">
					<div className="w-full h-[700px] rounded-lg overflow-hidden shadow-lg border ">
						<iframe
							title={ADDRESS_SITE.title}
							src={ADDRESS_SITE.map}
							width="100%"
							height="100%"
							style={{ border: 0 }}
							allowFullScreen=""
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
						></iframe>
					</div>
				</div>
			</div>
		</div>
	);
}
