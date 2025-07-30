import React, { useState, useEffect } from "react";
import { Clock, Eye, TrendingUp, Calendar, User, ArrowRight, BookOpen, Pin } from "lucide-react";
import { motion } from "framer-motion";
import { fetchRecentPosts, fetchPopularPosts, incrementPostReadCount } from "@/lib/api";

const BlogPosts = () => {
	const [activeTab, setActiveTab] = useState("recent");
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchPosts = async (type = "recent") => {
		setLoading(true);
		setError(null);

		try {
			let response;

			if (type === "recent") {
				response = await fetchRecentPosts(6);
			} else if (type === "popular") {
				response = await fetchPopularPosts(6);
			}

			if (response && response.data && Array.isArray(response.data)) {
				setPosts(response.data);
			} else {
				throw new Error("Invalid response format from API");
			}
		} catch (err) {
			console.error("Error fetching posts:", err);
			setError(`API Error: ${err.message}`);
		} finally {
			setLoading(false);
		}
	};

	const handleReadPost = async (postId) => {
		try {
			await incrementPostReadCount(postId);

			setPosts((prevPosts) =>
				prevPosts.map((post) =>
					post?.id === postId ? { ...post, readCount: post?.readCount + 1 } : post,
				),
			);
		} catch (error) {
			console.error("Error incrementing read count:", error);
		}
	};

	const containerVariants = {
		hidden: { opacity: 0, y: 30 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	// Fetch posts when component mounts or tab changes
	useEffect(() => {
		fetchPosts(activeTab);
	}, [activeTab]);

	// Handle tab change
	const handleTabChange = (newTab) => {
		setActiveTab(newTab);
	};

	return (
		<section className="w-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden py-20">
			{/* Light Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-teal-50/30"></div>
				<div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-teal-100/20 to-blue-100/20 rounded-full blur-2xl"></div>
			</div>

			<div className="relative z-10 container mx-auto px-6 max-w-[1440px]">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, amount: 0.2 }}
					className="mb-16"
				>
					<div className="flex flex-col md:flex-row md:items-center md:justify-between">
						<div>
							<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
								Bài viết nổi bật
							</h2>
							<p className="text-lg text-gray-600">
								Kiến thức chuyên sâu về Trading và Fintech
							</p>
						</div>

						<div className="mt-6 md:mt-0">
							<div className="flex bg-gray-100 rounded-lg p-1">
								<button
									onClick={() => handleTabChange("recent")}
									disabled={loading}
									className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
										activeTab === "recent"
											? "bg-white text-gray-900 shadow-sm"
											: "text-gray-600 hover:text-gray-900"
									}`}
								>
									Mới nhất
								</button>
								<button
									onClick={() => handleTabChange("popular")}
									disabled={loading}
									className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
										activeTab === "popular"
											? "bg-white text-gray-900 shadow-sm"
											: "text-gray-600 hover:text-gray-900"
									}`}
								>
									Phổ biến
								</button>
							</div>
						</div>
					</div>
				</motion.div>

				{loading && (
					<div className="flex items-center justify-center py-20">
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
							<div className="flex items-center space-x-3">
								<div className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
								<span className="text-gray-700 font-medium">
									Đang tải bài viết...
								</span>
							</div>
						</div>
					</div>
				)}

				{error && !loading && (
					<div className="flex items-center justify-center py-20">
						<div className="bg-orange-50/90 backdrop-blur-sm rounded-2xl p-8 border border-orange-200/50 text-center shadow-lg">
							<div className="text-orange-500 mb-4">
								<svg
									className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 mx-auto"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
										clipRule="evenodd"
									/>
								</svg>
							</div>

							<div className="text-xs text-gray-500 mb-4 bg-gray-100/80 p-3 rounded-lg">
								<strong>Lỗi:</strong> {error}
							</div>
							<button
								onClick={() => fetchPosts(activeTab)}
								className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 transition-colors shadow-md"
							>
								Thử lại
							</button>
						</div>
					</div>
				)}

				{!loading && posts.length > 0 && (
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="visible"
						key={`${activeTab}-${posts.length}`}
						className="grid grid-cols-1 md:grid-cols-3 gap-6"
					>
						{/* First Row: Blue, White, Blue */}
						{posts.slice(0, 3).map((post, index) => {
							const firstRowColors = ["bg-blue-600", "bg-white", "bg-blue-600"];
							const textColors = ["text-white", "text-gray-900", "text-white"];
							const bgColor = firstRowColors[index];
							const textColor = textColors[index];

							const patterns = [
								`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
								`url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
								`url("data:image/svg+xml,%3Csvg width='56' height='28' viewBox='0 0 56 28' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M56 26v2h-7.75c2.3-1.27 4.94-2 7.75-2zm-26 2a2 2 0 1 0-4 0h-4.09A25.98 25.98 0 0 0 0 16v-2c.67 0 1.34.02 2 .07V14a2 2 0 0 0-2-2v-2a4 4 0 0 1 3.98 3.6 28.09 28.09 0 0 1 2.8-3.86A8 8 0 0 0 0 6V4a9.99 9.99 0 0 1 8.17 4.23A28.07 28.07 0 0 1 14 .07V0h2v.07a28.07 28.07 0 0 1 5.83 8.16A9.99 9.99 0 0 1 30 4v2a8 8 0 0 0-6.78 3.74A28.09 28.09 0 0 1 26 13.6 4 4 0 0 1 30 10v2a2 2 0 0 0-2 2v.07c.66-.05 1.33-.07 2-.07v2a25.98 25.98 0 0 0-21.91 12H12a2 2 0 1 0-4 0h-2z'/%3E%3C/g%3E%3C/svg%3E")`,
							];

							return (
								<motion.article
									key={post?.id}
									variants={itemVariants}
									className={`${bgColor} aspect-square overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer relative ${index === 1 ? "border-2 border-gray-200" : ""}`}
									onClick={() => handleReadPost(post?.id)}
								>
									<div
										className="absolute inset-0 opacity-30"
										style={{ backgroundImage: patterns[index] }}
									></div>

									<div
										className={`relative h-full p-6 flex flex-col justify-between ${textColor}`}
									>
										<div>
											<div className="flex items-center justify-between mb-4">
												<span
													className={`${index === 1 ? "bg-blue-100 text-blue-600" : "bg-white/20 text-white"} backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}
												>
													{post?.category}
												</span>
												{post?.isPinned && <Pin className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />}
											</div>

											<h3 className="font-black mb-3 md:text-xl text-lg lg:text-2xl xl:text-3xl leading-tight drop-shadow-lg">
												{post.title}
											</h3>

											<p
												className={`${index === 1 ? "text-gray-600" : "text-white/80"} text-sm line-clamp-3 mb-4`}
											>
												{post?.excerpt}
											</p>
										</div>

										{/* Bottom Section */}
										<div>
											{!post?.image && (
												<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
													<BookOpen className="w-16 h-16" />
												</div>
											)}

											<div
												className={`flex items-center justify-between text-xs ${index === 1 ? "text-gray-500" : "text-white/80"}`}
											>
												<div className="flex items-center space-x-3">
													<div className="flex items-center space-x-1">
														<Eye className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />
														<span>
															{post?.readCount > 999
																? `${Math.floor(post?.readCount / 1000)}k`
																: post?.readCount}
														</span>
													</div>
													<div className="flex items-center space-x-1">
														<Clock className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />
														<span>
															{post?.readTime?.replace(
																" phút đọc",
																"min",
															)}
														</span>
													</div>
												</div>
											</div>
										</div>

										{/* Hover overlay */}
										<div
											className={`absolute inset-0 ${index === 1 ? "bg-blue-500/20" : "bg-black/20"} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}
										>
											<div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
												<ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-white" />
											</div>
										</div>
									</div>
								</motion.article>
							);
						})}

						{posts.slice(3, 6).map((post, index) => {
							const secondRowColors = ["bg-white", "bg-blue-600", "bg-white"];
							const textColors = ["text-gray-900", "text-white", "text-gray-900"];
							const bgColor = secondRowColors[index];
							const textColor = textColors[index];

							const patterns = [
								`url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
								`url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40c0-11.046 8.954-20 20-20s20 8.954 20 20v20H0V40z'/%3E%3C/g%3E%3C/svg%3E")`,
								`url("data:image/svg+xml,%3Csvg width='30' height='30' viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.05' fill-rule='evenodd'%3E%3Crect width='2' height='2' x='0' y='0'/%3E%3Crect width='2' height='2' x='10' y='10'/%3E%3Crect width='2' height='2' x='20' y='20'/%3E%3C/g%3E%3C/svg%3E")`,
							];

							return (
								<motion.article
									key={post?.id}
									variants={itemVariants}
									className={`${bgColor} aspect-square overflow-hidden group hover:scale-105 transition-all duration-300 cursor-pointer relative ${index !== 1 ? "border-2 border-gray-200" : ""}`}
									onClick={() => handleReadPost(post?.id)}
								>
									{/* Pattern Background */}
									<div
										className="absolute inset-0 opacity-30"
										style={{ backgroundImage: patterns[index] }}
									></div>

									<div
										className={`relative h-full p-6 flex flex-col justify-between ${textColor}`}
									>
										{/* Top Section */}
										<div>
											<div className="flex items-center justify-between mb-4">
												<span
													className={`${index === 1 ? "bg-white/20 text-white" : "bg-blue-100 text-blue-600"} backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide`}
												>
													{post?.category}
												</span>
												{post?.isPinned && <Pin className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />}
											</div>

											<h3 className="font-black mb-3 md:text-xl text-lg lg:text-2xl xl:text-3xl leading-tight drop-shadow-lg">
												{post.title}
											</h3>

											<p
												className={`${index === 1 ? "text-white/80" : "text-gray-600"} text-sm line-clamp-3 mb-4`}
											>
												{post?.excerpt}
											</p>
										</div>

										{/* Bottom Section */}
										<div>
											{!post?.image && (
												<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
													<BookOpen className="w-16 h-16" />
												</div>
											)}

											<div
												className={`flex items-center justify-between text-xs ${index === 1 ? "text-white/80" : "text-gray-500"}`}
											>
												<div className="flex items-center space-x-3">
													<div className="flex items-center space-x-1">
														<Eye className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />
														<span>
															{post?.readCount > 999
																? `${Math.floor(post?.readCount / 1000)}k`
																: post?.readCount}
														</span>
													</div>
													<div className="flex items-center space-x-1">
														<Clock className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8" />
														<span>
															{post?.readTime?.replace(
																" phút đọc",
																"min",
															)}
														</span>
													</div>
												</div>
											</div>
										</div>

										{/* Hover overlay */}
										<div
											className={`absolute inset-0 ${index === 1 ? "bg-black/20" : "bg-blue-500/20"} opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center`}
										>
											<div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
												<ArrowRight className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8 text-white" />
											</div>
										</div>
									</div>
								</motion.article>
							);
						})}
					</motion.div>
				)}

				{/* View All Section */}
				{!loading && posts.length > 0 && (
					<motion.div
						variants={itemVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="text-center mt-12"
					>
						<button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
							Xem tất cả bài viết
						</button>
					</motion.div>
				)}

				{/* No Posts State */}
				{!loading && posts.length === 0 && (
					<div className="flex items-center justify-center py-20">
						<div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 text-center shadow-lg">
							<h3 className="text-lg font-semibold text-gray-800 mb-4">
								Chưa có bài viết nào
							</h3>
							<p className="text-gray-600 mb-6">
								Hãy kiểm tra lại sau hoặc khám phá các chủ đề khác.
							</p>
							<button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors shadow-md">
								Khám phá chủ đề khác
							</button>
						</div>
					</div>
				)}
			</div>
		</section>
	);
};

export default BlogPosts;
