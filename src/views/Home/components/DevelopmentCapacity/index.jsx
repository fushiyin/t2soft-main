import HadoopLogo from "@/assets/logos/Hadoop.png";
import SparkLogo from "@/assets/logos/Spark.png";
import AngularLogo from "@/assets/logos/angular.png";
import DjangoLogo from "@/assets/logos/django.png";
import ElasticsearchLogo from "@/assets/logos/elasticsearch.png";
import ExpressLogo from "@/assets/logos/express.png";
import FlutterLogo from "@/assets/logos/flutter.png";
import BigQueryLogo from "@/assets/logos/google-bigquery.svg";
import IonicLogo from "@/assets/logos/ionic.png";
import JavaLogo from "@/assets/logos/java.png";
import KafkaLogo from "@/assets/logos/kafka.svg";
import KotlinLogo from "@/assets/logos/kotlin.png";
import NextJSLogo from "@/assets/logos/nextjs.png";
import NodeJSLogo from "@/assets/logos/nodejs.png";
import PowerBILogo from "@/assets/logos/power_bi.png";
import PythonLogo from "@/assets/logos/python.png";
import ReactLogo from "@/assets/logos/react.png";
import SpringLogo from "@/assets/logos/spring.png";
import SwiftLogo from "@/assets/logos/swift.png";
import TailwindCSSLogo from "@/assets/logos/tailwind.png";
import TypeScriptLogo from "@/assets/logos/typescript.png";
import VueLogo from "@/assets/logos/vue.png";
import XamarinLogo from "@/assets/logos/xamarin.png";

import { Button } from "@/components/ui/button";
import { idRouter } from "@/routes/idRouter";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import {
	Brain,
	ChevronLeftIcon,
	ChevronRightIcon,
	CodeIcon,
	ServerIcon,
	SmartphoneIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

export default function DevelopmentCapacity({ contentClass }) {
	const { t } = useTranslation();
	const [currentStackIndex, setCurrentStackIndex] = useState(0);
	const autoTimer = 6000; // 6 seconds
	const navigate = useNavigate();

	// Technology stacks with more comprehensive data
	const techStacks = [
		{
			id: "frontend",
			name: t("tech_stack.frontend.title"),
			icon: <CodeIcon className="h-8 w-8" />,
			description: t("tech_stack.frontend.description"),
			color: "#61DAFB",
			gradient: "from-blue-400 to-cyan-400",
			technologies: [
				{
					name: "React",
					logo: ReactLogo,
					description: t("tech_stack.frontend.technologies.react.description"),
				},
				{
					name: "Next.js",
					logo: NextJSLogo,
					description: t("tech_stack.frontend.technologies.nextjs.description"),
				},
				{
					name: "TypeScript",
					logo: TypeScriptLogo,
					description: t("tech_stack.frontend.technologies.typescript.description"),
				},
				{
					name: "Tailwind CSS",
					logo: TailwindCSSLogo,
					description: t("tech_stack.frontend.technologies.tailwind.description"),
				},
				{
					name: "Vue.js",
					logo: VueLogo,
					description: t("tech_stack.frontend.technologies.vue.description"),
				},
				{
					name: "Angular",
					logo: AngularLogo,
					description: t("tech_stack.frontend.technologies.angular.description"),
				},
			],
		},
		{
			id: "backend",
			name: t("tech_stack.backend.title"),
			icon: <ServerIcon className="h-8 w-8" />,
			description: t("tech_stack.backend.description"),
			color: "#68D391",
			gradient: "from-green-400 to-emerald-400",
			technologies: [
				{
					name: "Node.js",
					logo: NodeJSLogo,
					description: t("tech_stack.backend.technologies.nodejs.description"),
				},
				{
					name: "Python",
					logo: PythonLogo,
					description: t("tech_stack.backend.technologies.python.description"),
				},
				{
					name: "Java",
					logo: JavaLogo,
					description: t("tech_stack.backend.technologies.java.description"),
				},
				{
					name: "Express.js",
					logo: ExpressLogo,
					description: t("tech_stack.backend.technologies.express.description"),
				},
				{
					name: "Django",
					logo: DjangoLogo,
					description: t("tech_stack.backend.technologies.django.description"),
				},
				{
					name: "Spring Boot",
					logo: SpringLogo,
					description: t("tech_stack.backend.technologies.spring.description"),
				},
			],
		},
		{
			id: "mobile",
			name: t("tech_stack.mobile.title"),
			icon: <SmartphoneIcon className="h-8 w-8" />,
			description: t("tech_stack.mobile.description"),
			color: "#A78BFA",
			gradient: "from-purple-400 to-indigo-400",
			technologies: [
				{
					name: "React Native",
					logo: ReactLogo,
					description: t("tech_stack.mobile.technologies.react_native.description"),
				},
				{
					name: "Flutter",
					logo: FlutterLogo,
					description: t("tech_stack.mobile.technologies.flutter.description"),
				},
				{
					name: "iOS (Swift)",
					logo: SwiftLogo,
					description: t("tech_stack.mobile.technologies.ios.description"),
				},
				{
					name: "Android (Kotlin)",
					logo: KotlinLogo,
					description: t("tech_stack.mobile.technologies.android.description"),
				},
				{
					name: "Xamarin",
					logo: XamarinLogo,
					description: t("tech_stack.mobile.technologies.xamarin.description"),
				},
				{
					name: "Ionic",
					logo: IonicLogo,
					description: t("tech_stack.mobile.technologies.ionic.description"),
				},
			],
		},
		{
			id: "bigdata",
			name: t("tech_stack.bigdata.title"),
			icon: <Brain className="h-8 w-8" />,
			description: t("tech_stack.bigdata.description"),
			color: "#F687B3",
			gradient: "from-pink-400 to-rose-400",
			technologies: [
				{
					name: t("tech_stack.bigdata.technologies.hadoop.name"),
					logo: HadoopLogo,
					description: t("tech_stack.bigdata.technologies.hadoop.description"),
				},
				{
					name: t("tech_stack.bigdata.technologies.spark.name"),
					logo: SparkLogo,
					description: t("tech_stack.bigdata.technologies.spark.description"),
				},
				{
					name: t("tech_stack.bigdata.technologies.kafka.name"),
					logo: KafkaLogo,
					description: t("tech_stack.bigdata.technologies.kafka.description"),
				},
				{
					name: t("tech_stack.bigdata.technologies.elasticsearch.name"),
					logo: ElasticsearchLogo,
					description: t("tech_stack.bigdata.technologies.elasticsearch.description"),
				},
				{
					name: t("tech_stack.bigdata.technologies.bigQueryLogo.name"),
					logo: BigQueryLogo,
					description: t("tech_stack.bigdata.technologies.bigQueryLogo.description"),
				},
				{
					name: t("tech_stack.bigdata.technologies.powerBI.name"),
					logo: PowerBILogo,
					description: t("tech_stack.bigdata.technologies.powerBI.description"),
				},
			],
		},
	];

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentStackIndex((prev) => (prev + 1) % techStacks.length);
		}, autoTimer);
		return () => clearInterval(interval);
	}, [techStacks?.length]);

	const currentStack = techStacks[currentStackIndex];

	const nextStack = () => {
		setCurrentStackIndex((prev) => (prev + 1) % techStacks.length);
	};

	const prevStack = () => {
		setCurrentStackIndex((prev) => (prev - 1 + techStacks.length) % techStacks.length);
	};

	return (
		<div className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
			{/* Background Pattern */}
			<div
				className={classNames(
					"max-w-[1440px] relative z-10 flex flex-col justify-center items-center gap-15 mx-auto",
					{
						[contentClass]: contentClass,
					},
				)}
			>
				{/* Header */}
				<div className="text-center">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl font-bold tracking-tighter sm:text-5xl pb-6 bg-gradient-to-r from-SecondaryBg via-SecondaryBg-gray to-pale-blue bg-clip-text text-transparent">
							{t("tech_stack.title")}
						</h2>
						<p className="max-w-[900px] mx-auto text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed px-8 400:px-6 font-sans break-keep whitespace-normal break-words">
							{t("tech_stack.description")}
						</p>
					</motion.div>
				</div>

				{/* Detailed Technology View */}
				<AnimatePresence>
					{currentStack && (
						<motion.div
							initial={{ opacity: 0, height: 0 }}
							animate={{ opacity: 1, height: "auto" }}
							exit={{ opacity: 0, height: 0 }}
							transition={{ duration: 0.5 }}
							className="w-[90%] bg-gray-800/50 backdrop-blur-sm rounded-3xl p-8 border border-white/10"
						>
							<>
								<div className="flex items-center mb-6 justify-between">
									<div className="flex items-center gap-2 md:gap-4">
										<div
											className={`p-4 rounded-2xl bg-gradient-to-br ${currentStack?.gradient} 400:mr-3 md:mr-6 scale-[0.7] 400:scale-[1]`}
										>
											{currentStack?.icon}
										</div>
										<div>
											<h3 className="md:text-3xl sm:text-xl 400:text-lg text-base font-bold text-white mb-2">
												{currentStack?.name}
											</h3>
											<p className="text-gray-300 md:text-lg hidden sm:inline-block">
												{currentStack?.description}
											</p>
										</div>
									</div>

									<div className="sm:flex hidden gap-2">
										<Button
											variant="outline"
											size="lg"
											onClick={prevStack}
											className="border-section-gray/40 text-white bg-transparent"
										>
											<ChevronLeftIcon className="h-4 w-4" />
										</Button>
										<Button
											variant="outline"
											size="lg"
											onClick={nextStack}
											className="border-section-gray/40 text-white bg-transparent"
										>
											<ChevronRightIcon className="h-4 w-4" />
										</Button>
									</div>
									<Button
										variant="outline"
										size="sm"
										onClick={nextStack}
										className="ml-4 sm:hidden border-section-gray/40 text-white bg-transparent"
									>
										<ChevronRightIcon className="h-4 w-4" />
									</Button>
								</div>

								<div className="grid grid-cols-3 gap-6 bg-gray-700/30 rounded-xl p-6 border border-white/5 hover:border-white/20 400:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 md:bg-transparent md:rounded-none md:border-none">
									{currentStack?.technologies?.map((tech, techIndex) => (
										<motion.div
											key={tech.name}
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{
												duration: 0.4,
												delay: techIndex * 0.05,
											}}
											className="bg-transparent border-none rounded-none md:bg-gray-700/30 md:rounded-xl md:p-6 md:border md:border-white/5 md:hover:border-white/20 transition-all duration-300 group flex items-center justify-center"
										>
											<div className="flex items-center justify-center md:justify-start gap-4 w-full">
												<div className="md:w-14 md:h-14 sm:w-20 sm:h-20 400:w-16 400:h-16 h-12 w-12 bg-white rounded-xl p-2 flex items-center justify-center">
													<img
														className="object-contain w-full h-full"
														src={tech.logo || "/placeholder.svg"}
														alt={tech.name}
													/>
												</div>
												<div className="hidden md:inline">
													<h4 className="text-lg font-bold text-white">
														{tech.name}
													</h4>
													<p className="text-gray-400 text-sm">
														{tech.description}
													</p>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							</>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Call to Action */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
					viewport={{ once: true }}
					className="text-center"
				>
					<p className="text-base sm:text-xl text-gray-300 mb-2 max-w-2xl mx-auto px-8 400:px-6 font-sans break-keep whitespace-normal break-words">
						{t("tech_stack.cta.des_1")}
					</p>
					<p className="text-base sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-8 400:px-6 font-sans break-keep whitespace-normal break-words">
						{t("tech_stack.cta.des_2")}
					</p>
					<button
						className="cursor-pointer text-sm sm:text-xl px-5 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-pale-blue to-SecondaryBg text-heading-black hover:text-white font-semibold rounded-xl hover:from-SecondaryBg hover:to-normal-dark-blue transition-all duration-300 transform hover:scale-105 shadow-lg"
						onClick={() => navigate(idRouter.contact)}
					>
						{t("tech_stack.cta.button")}
					</button>
				</motion.div>
			</div>
		</div>
	);
}
