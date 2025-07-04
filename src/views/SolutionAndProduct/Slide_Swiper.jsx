import Development from "@/assets/solution_img/Development.png";
import Maintenance from "@/assets/solution_img/Maintenance.png";
import Requirement from "@/assets/solution_img/Requirement.jpg";
import Training from "@/assets/solution_img/Training.png";
import useResponsive from "@/hooks/useResponsive";
import { useTranslation } from "react-i18next";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const SOLUTION_IMAGES = [
	{
		image: Requirement,
		title: (t) => t("solution.implementation.requirement.title"),
		description: (t) =>
			t("solution.implementation.requirement.description", { returnObjects: true }),
	},
	{
		image: Development,
		title: (t) => t("solution.implementation.development.title"),
		description: (t) =>
			t("solution.implementation.development.description", { returnObjects: true }),
	},
	{
		image: Training,
		title: (t) => t("solution.implementation.deploy_training.title"),
		description: (t) =>
			t("solution.implementation.deploy_training.description", { returnObjects: true }),
	},
	{
		image: Maintenance,
		title: (t) => t("solution.implementation.maintenance.title"),
		description: (t) =>
			t("solution.implementation.maintenance.description", { returnObjects: true }),
	},
];
const Slide_Swiper = ({ details }) => {
	const { t } = useTranslation();
	const { isMobile } = useResponsive();
	return (
		<section
			className={
				isMobile
					? details
						? "w-full pt-30 pb-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
						: "w-full pt-4 pb-0 bg-[#F8FAFC]"
					: details
						? "w-full pt-36 pb-12 bg-gradient-to-br from-gray-900 via-gray-800 to-black"
						: "w-full pt-4 pb-[73px] md:pb-28 bg-[#F8FAFC]"
			}
		>
			<div className="container max-w-[1440px] mx-auto">
				<div className="w-full md:w-[60%] mb-4 md:mb-16 mt-4 h-auto flex flex-col text-center md:text-left items-center mx-auto">
					<div className="space-y-2">
						<p className="max-w-[900px] text-center text-light-blue font-bold text-xl md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed 2xl:text-2xl font-sans break-keep whitespace-normal break-words korean-text">
							{t("solution.implementation.title")}
						</p>
						<h2
							className={`text-3xl font-bold tracking-tighter korean-text sm:text-5xl pb-6 ${details ? "text-transparent bg-gradient-to-r from-light-blue via-light-blue-gray to-pale-blue bg-clip-text" : "text-dark-gray"}`}
						>
							{t("solution.implementation.description")}
						</h2>
					</div>
				</div>
				<div className="flex flex-col items-center justify-center gap-8 text-center ">
					<div className="w-full grid grid-cols-1 md:grid-cols-4">
						{isMobile ? (
							<Swiper
								modules={[Navigation, Pagination]}
								spaceBetween={20}
								slidesPerView={1}
								navigation={false}
								pagination={{
									clickable: true,
									bulletClass: "swiper-pagination-bullet",
									bulletActiveClass: "swiper-pagination-bullet-active",
								}}
								// autoplay={{
								// 	delay: 3000,
								// 	disableOnInteraction: false,
								// }}
								className="w-full h-[550px] pb-12 mx-auto"
							>
								{SOLUTION_IMAGES.map((item, idx) => (
									<SwiperSlide key={idx}>
										<div className="group relative overflow-hidden cursor-pointer h-full">
											<img
												src={item.image}
												alt={item.title(t)}
												className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
												draggable={false}
											/>
											<div className="absolute inset-0 bg-[#16224E9C] pointer-events-none" />
											<div className="absolute inset-0 flex flex-col w-full h-full px-4 py-6 text-white z-10 items-start">
												<div className="w-16 h-1 bg-light-blue mb-2"></div>
												<div className="text-2xl font-semibold drop-shadow mb-2 w-full text-left font-sans break-keep whitespace-normal break-words capitalize korean-text">
													{item.title(t)}
												</div>
												<div className="text-base drop-shadow w-full">
													<ul className="list-disc list-outside pl-6 text-left">
														{Object.values(item.description(t)).map(
															(desc, i) => (
																<li
																	className="font-sans break-keep whitespace-normal break-words leading-loose korean-text"
																	key={i}
																>
																	{desc}
																</li>
															),
														)}
													</ul>
												</div>
											</div>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						) : (
							SOLUTION_IMAGES.map((item, idx) => (
								<div
									key={idx}
									className="group relative aspect-[4/5] overflow-hidden cursor-pointer"
								>
									<img
										src={item.image}
										alt={item.title(t)}
										className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
										draggable={false}
									/>
									<div className="absolute inset-0 bg-[#16224E9C] group-hover:bg-[#0730D0BD] transition-all duration-600 pointer-events-none" />
									<div className="absolute inset-0 flex flex-col justify-end items-start w-full h-full px-4 py-6 text-white z-10 transition-all duration-600 ease-in-out group-hover:opacity-0 opacity-100 group-hover:translate-y-8 translate-y-0">
										<div className="w-16 h-1 bg-light-blue group-hover:bg-white mb-2"></div>
										<div className="text-2xl font-semibold drop-shadow mb-0 w-full transition-all duration-600 ease-in-out text-left font-sans break-keep whitespace-normal break-words capitalize korean-text">
											{item.title(t)}
										</div>
									</div>
									<div className="absolute inset-0 flex flex-col justify-start items-start w-full h-full px-4 py-6 text-white z-10 transition-all duration-600 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8">
										<div className="w-16 h-1 bg-light-blue group-hover:bg-white mb-2"></div>
										<div className="text-2xl font-semibold drop-shadow mb-2 w-full transition-all duration-600 ease-in-out text-left font-sans break-keep whitespace-normal break-words korean-text">
											{item.title(t)}
										</div>
										<div className="text-base drop-shadow w-full transition-all duration-600 ease-in-out opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4">
											<ul className="list-disc list-outside pl-6 text-left">
												{Object.values(item.description(t)).map(
													(desc, i) => (
														<li
															className="font-sans break-keep whitespace-normal break-words leading-loose korean-text"
															key={i}
														>
															{desc}
														</li>
													),
												)}
											</ul>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Slide_Swiper;
