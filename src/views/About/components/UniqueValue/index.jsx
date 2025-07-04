import { motion } from "framer-motion";
import { GlobeIcon, ShieldCheckIcon, UsersIcon, ZapIcon } from "lucide-react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, x: -30 },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: "easeOut" },
	},
};

function AdvantageItem({ item, index }) {
	return (
		<motion.div
			className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col gap-3 items-stretch relative sm:min-h-[300px] border-t"
			variants={itemVariants}
			whileHover={{ scale: 1.03 }}
			transition={{ type: "spring", stiffness: 200, damping: 15 }}
		>
			<motion.div
				className="flex justify-center w-full"
				whileHover={{ scale: 1.1, rotate: index % 2 === 0 ? 5 : -5 }}
				transition={{ type: "spring", stiffness: 300 }}
			>
				<div className="bg-gray-100 p-3 rounded-full inline-flex items-center justify-center">
					<item.icon className="h-8 w-8 rounded-full" />
				</div>
			</motion.div>
			<h3 className="text-2xl font-bold text-dark-gray text-center w-full font-sans break-keep whitespace-normal break-words ">
				{item.title}
			</h3>
			<p className="text-muted-foreground font-sans break-keep whitespace-normal break-words">
				{item.description}
			</p>
		</motion.div>
	);
}

export default function UniqueValue() {
	const { t, i18n } = useTranslation();

	const advantages = useMemo(
		() => [
			{
				icon: ShieldCheckIcon,
				id: "quality",
				title: t("unique_value.advantages.quality.title"),
				description: t("unique_value.advantages.quality.description"),
			},
			{
				icon: ZapIcon,
				id: "technical",
				title: t("unique_value.advantages.technical.title"),
				description: t("unique_value.advantages.technical.description"),
			},
			{
				icon: UsersIcon,
				id: "cultural",
				title: t("unique_value.advantages.cultural.title"),
				description: t("unique_value.advantages.cultural.description"),
			},
			{
				icon: GlobeIcon,
				id: "scalable",
				title: t("unique_value.advantages.scalable.title"),
				description: t("unique_value.advantages.scalable.description"),
			},
		],
		[i18n.language],
	);

	const memoizedAdvantageItems = useMemo(() => {
		return advantages.map((item, index) => (
			<AdvantageItem
				key={item.id}
				item={item}
				index={index}
			/>
		));
	}, [advantages]);

	return (
		<div
			id="unique-value"
			className="max-w-[1440px] py-12 flex flex-col px-4 lg:px-0"
		>
			<div className="container h-full flex flex-col justify-center">
				<div className="flex flex-col items-center justify-center space-y-4 text-center">
					<div className="space-y-2">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-dark-gray font-sans break-keep whitespace-normal break-words">
							{t("unique_value.title")}
						</h2>
						<p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-sans break-keep whitespace-normal break-words">
							{t("unique_value.description")}
						</p>
					</div>
				</div>
				<motion.div
					className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-4 mt-12"
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
				>
					{memoizedAdvantageItems}
				</motion.div>
			</div>
		</div>
	);
}
