import bg_whyVietnam_2 from "@/assets/img/bg-text-why_vn.png";
import bg_whyVietnam from "@/assets/img/why-vn-bg.png";
import logo_t2 from "@/assets/logos/T2_light_Logo.png";
import HoverCard from "@/components/HoverCard";
import { idRouter } from "@/routes/idRouter";
import classNames from "classnames";
import { motion } from "framer-motion";
import { ArrowRight, Award, HandCoins, Handshake, HeartHandshakeIcon, Scale } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function WhyVietnam() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const item1 = t("why_vietnam.text_header.title", { returnObjects: true });
	const item2 = t("why_vietnam.text_footer.title", { returnObjects: true });

	const whyVietnam = [
		{
			title: t("why_vietnam.title"),
			description: t("why_vietnam.description"),
		},
		{
			icon: <Award className="h-8 w-8 rounded-full" />,
			title: t("why_vietnam.talent.title"),
			description: t("why_vietnam.talent.description"),
		},
		{
			icon: <HandCoins className="h-8 w-8 rounded-full" />,
			title: t("why_vietnam.cost.title"),
			description: t("why_vietnam.cost.description"),
		},
		{
			icon: <Handshake className="h-8 w-8 rounded-full" />,
			title: t("why_vietnam.geo_n_culture.title"),
			description: t("why_vietnam.geo_n_culture.description"),
		},
		{
			icon: <Scale className="h-8 w-8 rounded-full" />,
			title: t("why_vietnam.politic_n_eco.title"),
			description: t("why_vietnam.politic_n_eco.description"),
		},
		{
			icon: <HeartHandshakeIcon className="h-8 w-8 rounded-full" />,
			title: t("why_vietnam.experience.title"),
			description: t("why_vietnam.experience.description"),
		},
	];

	return (
		<div className="flex flex-col pt-6">
			<div className="w-full h-[250px] relative flex justify-center">
				<img
					src={bg_whyVietnam}
					alt=""
					className="w-full h-full object-cover"
				/>

				<div className="max-w-[1440px] absolute top-1/2 w-full h-auto transform -translate-y-1/2 flex items-center justify-between font-sans px-4 sm:px-6 md:px-8">
					<p className="text-white font-bold leading-relaxed text-xl sm:text-2xl md:text-3xl lg:text-4xl max-w-[80%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] font-sans break-keep whitespace-normal break-words">
						{item1.map((part, idx) => (
							<span
								key={idx}
								className={part.className}
							>
								{part.text}
							</span>
						))}
					</p>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 1 }}
						onClick={() => navigate(idRouter?.contact)}
						className="cursor-pointer hidden sm:inline-flex absolute right-[5%] font-bold items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base lg:text-lg text-heading-black hover:text-white bg-gradient-to-r from-pale-blue to-light-blue rounded-xl hover:bg-primary/90 duration-300 transform hover:scale-105 shadow-xl"
					>
						{t("our_services.button_learn_more")}
						<ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
					</motion.button>
				</div>
			</div>

			<div className="w-full bg-white flex justify-center items-center">
				<div className="flex justify-center container h-full py-6 sm:py-10 px-4 sm:px-6 md:px-10 max-w-[1440px]">
					<div className="w-full">
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
							{whyVietnam.map((item, idx) => (
								<HoverCard
									key={idx}
									icon={item.icon}
									title={item.title}
									description={item.description}
									className={classNames(
										"w-full flex flex-col items-center text-center p-4 sm:p-5",
										"rounded-xl shadow-md",
										"transition duration-300 hover:shadow-lg",
										item.icon ? "bg-gray-50" : "",
										"h-auto min-h-[200px] sm:min-h-[220px] md:min-h-[250px]",
									)}
								/>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="w-full relative bg-white">
				<img
					src={bg_whyVietnam_2}
					alt=""
					className="absolute inset-0 w-full h-full object-cover z-0"
				/>
				<div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-24 py-10 min-h-[400px]">
					<div className="flex flex-col items-center md:items-start w-full md:w-1/2 gap-4">
						<img
							src={logo_t2}
							className="w-[140px] sm:w-[180px] md:w-[200px] object-cover"
							alt="Logo"
						/>
						<p className="text-dark-gray text-2xl sm:text-3xl md:text-4xl font-bold leading-normal max-w-[90%] text-center md:text-left font-sans break-keep whitespace-normal break-words">
							{item2.map((part, idx) => (
								<span
									key={idx}
									className={part.className}
									dangerouslySetInnerHTML={{ __html: part.text }}
								></span>
							))}
						</p>
					</div>
					<p className="text-dark-gray text-base sm:text-lg md:text-xl leading-loose max-w-[90%] md:max-w-[55%] text-center md:text-left mt-6 md:mt-0 font-sans break-keep whitespace-normal break-words">
						{t("why_vietnam.text_footer.desc")}
					</p>
				</div>
			</div>
		</div>
	);
}
