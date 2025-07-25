import React, { useState, useEffect } from "react";
import { Clock, Users, Star, Filter, Search, Play, ExternalLink, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/components/Loading/LoadingSpinner.jsx";
import { PLAYLIST_IDs } from "@/constant/common";
import { fetchPlaylists } from "@/lib/api";

// Mock data fallback (similar to MyCourses component)
const MOCK_COURSES = [
	{
		id: "PLsGBXDsQw_r4-62k404iSBvPpixyPCI2u",
		title: "Xây Dựng Tư Duy Thị Trường Tài Chính (Đừng Mãi Mãi Làm Trader)",
		description:
			"Tư duy đúng đắn trong trading là chìa khóa thành công. Khóa học này giúp bạn xây dựng tư duy vững chắc để trở thành trader chuyên nghiệp.",
		image: "https://i.ytimg.com/vi/0pXnvfAJ4q4/hqdefault.jpg",
		duration: "8.5 hours",
		students: "15K+",
		rating: 4.9,
		price: "Free",
		level: "Beginner",
		category: "Forex",
		videoCount: 15,
		channelTitle: "TradeMaster Academy",
	},
	{
		id: "PLsGBXDsQw_r4hwYSS27PqLR4M3lgFs2RE",
		title: "Hướng Dẫn Phân Tích Kỹ Thuật Chuyên Sâu",
		description:
			"Cung cấp kiến thức chuyên sâu ứng dụng logic trong trading phân tích kỹ thuật và đầu tư tài chính đa dạng thị trường ứng dụng vào các thị trường Coin, thị trường Forex, thị trường Chứng Khoán, thị trường Hàng Hoá. Hãy nhớ ở đâu có đường giá ở đó có tiền.",
		image: "https://i.ytimg.com/vi/1YyAzVmP9xQ/hqdefault.jpg",
		duration: "12.3 hours",
		students: "22K+",
		rating: 4.8,
		price: "Free",
		level: "Advanced",
		category: "Crypto",
		videoCount: 22,
		channelTitle: "TradeMaster Academy",
	},
	{
		id: "PLsGBXDsQw_r6IIs2AAaauS0P_LrLgaaPP",
		title: "Hướng Dẫn Hệ Thống Giao Dịch SonicR",
		description:
			"Hướng dẫn chi tiết đầy đủ kết hợp làm chủ được hệ thống giao dịch EMA 89,34 ( SonicR ). Ứng dụng vào thị trường Coin, Forex, Chứng Khoán.",
		image: "https://i.ytimg.com/vi/3MnK7XT-oPA/hqdefault.jpg",
		duration: "10.2 hours",
		students: "18K+",
		rating: 4.7,
		price: "Free",
		level: "Intermediate",
		category: "Analysis",
		videoCount: 18,
		channelTitle: "TradeMaster Academy",
	},
	{
		id: "PLsGBXDsQw_r4_5UroEpd5d-U0l0Tu7-N2",
		title: "Xóa Mù Trading Phân Tích Kỹ Thuật",
		description:
			"Seri xóa mù trading cung cấp các kiến thức từ cơ bản đến nâng cao trong phân tích kĩ thuật và phân tích biểu đồ, phân tích các loại sản phẩm Coin, Forex, Chứng Khoán, .....",
		image: "https://i.ytimg.com/vi/CqrYHGqyMJc/hqdefault.jpg",
		duration: "6.8 hours",
		students: "12K+",
		rating: 4.6,
		price: "Free",
		level: "All Levels",
		category: "Psychology",
		videoCount: 12,
		channelTitle: "TradeMaster Academy",
	},
];

const Courses = () => {
	const { t } = useTranslation();
	const [selectedLevel, setSelectedLevel] = useState(t("courses_page.filter_all"));
	const [searchTerm, setSearchTerm] = useState("");
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchCourses();
	}, []);

	const fetchCourses = async () => {
		setLoading(true);
		setError(null);

		try {
			console.log("🔄 Attempting to fetch courses from YouTube API...");
			const res = await fetchPlaylists(PLAYLIST_IDs, 1);
			const validPlaylists = res.data.filter(
				(p) => p.data && p.data.items && p.data.items.length > 0,
			);

			if (validPlaylists.length === 0) {
				throw new Error("No valid playlists found");
			}

			const mapped = validPlaylists.map((playlist) => {
				const item = playlist.data.items[0];
				const snippet = item.snippet;
				return {
					id: playlist.playlistId,
					title: snippet.title,
					description: snippet.description,
					image: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
					duration: "N/A",
					students: "N/A",
					rating: 4.8,
					price: "Free",
					level: "All Levels",
					category: "Trading",
					videoCount: playlist.data.pageInfo?.totalResults || playlist.data.items.length,
					channelTitle: snippet.channelTitle,
				};
			});

			setCourses(mapped);
		} catch (apiError) {
			console.warn("⚠️ YouTube API failed, falling back to mock data:", apiError.message);
			setCourses(MOCK_COURSES);
			setError(null);
		} finally {
			setLoading(false);
		}
	};

	const levels = [
		t("courses_page.filter_all"),
		t("courses_page.filter_beginner"),
		t("courses_page.filter_intermediate"),
		t("courses_page.filter_advanced"),
		t("courses_page.filter_all_levels"),
	];

	// Create mapping between translated and original level names
	const levelMapping = {
		[t("courses_page.filter_all")]: "All",
		[t("courses_page.filter_beginner")]: "Beginner",
		[t("courses_page.filter_intermediate")]: "Intermediate",
		[t("courses_page.filter_advanced")]: "Advanced",
		[t("courses_page.filter_all_levels")]: "All Levels",
	};

	const filteredCourses = courses.filter((course) => {
		const mappedLevel = levelMapping[selectedLevel] || selectedLevel;
		const matchesLevel = mappedLevel === "All" || course.level === mappedLevel;
		const matchesSearch =
			course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			course.description.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesLevel && matchesSearch;
	});

	const openPlaylist = (playlistId) => {
		window.open(`https://www.youtube.com/playlist?list=${playlistId}`, "_blank");
	};

	const getLevelColor = (level) => {
		switch (level) {
			case "Beginner":
				return "bg-green-100 text-green-800";
			case "Intermediate":
				return "bg-yellow-100 text-yellow-800";
			case "Advanced":
				return "bg-red-100 text-red-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	const translateLevel = (level) => {
		switch (level) {
			case "Beginner":
				return t("courses_page.filter_beginner");
			case "Intermediate":
				return t("courses_page.filter_intermediate");
			case "Advanced":
				return t("courses_page.filter_advanced");
			case "All Levels":
				return t("courses_page.filter_all_levels");
			default:
				return level;
		}
	};

	return (
		<>
			{/* Enhanced Header with Background */}
			<section className="relative py-16 border-b border-gray-200 pt-32 overflow-hidden">
				{/* Background Gradient */}
				<div className="absolute inset-0 bg-gradient-to-br from-green-50 via-blue-50 to-gray-50"></div>

				{/* Background Pattern */}
				<div className="absolute inset-0 opacity-10">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
							backgroundRepeat: "repeat",
						}}
					></div>
				</div>

				<div className="max-w-7xl mx-auto px-6 relative z-10">
					<div className="text-center">
						<h1 className="text-5xl font-bold text-gray-900 mb-4">
							{t("courses_page.title")}{" "}
							<span className="text-green-600">{t("courses_page.title_accent")}</span>
						</h1>
						<p className="md:text-xl lg:text-2xl text-lg text-gray-600 max-w-2xl mx-auto">
							{t("courses_page.subtitle")}
						</p>
					</div>
				</div>
			</section>

			<section className="bg-white py-6 md:py-20">
				<div className="max-w-7xl mx-auto px-6">
					{/* Enhanced Search and Filter Bar */}
					<div className="bg-gray-50 rounded-2xl p-4 md:p-8 mb-5 md:mb-12">
						<div className="flex flex-row gap-2 md:gap-6 items-center">
							{/* Search */}
							<div className="flex-1 max-w-lg">
								<div className="relative">
									<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
									<input
										type="text"
										placeholder={t("courses_page.search_placeholder")}
										className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none text-sm transition-all duration-200 shadow-sm"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
							</div>

							{/* Level Filter */}
							<div className="flex items-center gap-3">
								<Filter className="hidden md:block h-5 w-5 text-gray-500" />
								<select
									className="px-4 py-4 bg-white border border-gray-200 rounded-xl focus:border-green-500 focus:ring-2 focus:ring-green-100 focus:outline-none text-sm transition-all duration-200 shadow-sm md:min-w-[140px]"
									value={selectedLevel}
									onChange={(e) => setSelectedLevel(e.target.value)}
								>
									{levels.map((level) => (
										<option
											key={level}
											value={level}
										>
											{level}
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					{loading ? (
						<div className="flex justify-center py-20">
							<LoadingSpinner />
						</div>
					) : error ? (
						<div className="text-center py-20">
							<p className="text-gray-600">{error}</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{filteredCourses.map((course) => (
								<article
									key={course.id}
									className="group cursor-pointer bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200"
									onClick={() => openPlaylist(course.id)}
								>
									{/* Course Image */}
									<div className="relative overflow-hidden aspect-video">
										<img
											src={course.image}
											alt={course.title}
											className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
										/>

										{/* Gradient Overlay */}
										<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

										{/* Level Badge */}
										<div className="absolute top-4 left-4">
											<span
												className={`px-3 py-1 text-xs font-semibold ${getLevelColor(course.level)} rounded-full shadow-sm`}
											>
												{translateLevel(course.level)}
											</span>
										</div>

										{/* Play Button Overlay */}
										<div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
											<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
												<Play
													className="h-6 w-6 text-green-600 ml-1"
													fill="currentColor"
												/>
											</div>
										</div>
									</div>

									{/* Course Content */}
									<div className="p-6">
										<h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 group-hover:text-green-600 transition-colors line-clamp-2">
											{course.title}
										</h3>

										<p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
											{course.description}
										</p>

										{/* Course Stats */}
										<div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-2 border-t border-gray-50">
											<div className="flex items-center gap-4">
												<span className="flex items-center gap-1.5">
													<Clock className="h-4 w-4" />
													{course.videoCount}{" "}
													{t("courses_page.video_count")}
												</span>
												<span className="flex items-center gap-1.5">
													<Users className="h-4 w-4" />
													{course.students}
												</span>
											</div>
											<div className="flex items-center gap-1">
												<Star className="h-4 w-4 text-yellow-400 fill-current" />
												<span className="font-medium">{course.rating}</span>
											</div>
										</div>

										{/* Price and CTA */}
										<div className="flex items-center justify-between">
											<span className="text-xl font-bold text-green-600">
												{course.price}
											</span>
											<div className="px-4 py-2 bg-green-50 text-green-700 rounded-lg text-sm font-medium group-hover:bg-green-100 transition-colors">
												{t("courses_page.view_course")}
											</div>
										</div>
									</div>
								</article>
							))}
						</div>
					)}

					{!loading && !error && filteredCourses.length === 0 && (
						<div className="text-center py-20">
							<p className="text-gray-500">{t("courses_page.no_courses_found")}</p>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Courses;
