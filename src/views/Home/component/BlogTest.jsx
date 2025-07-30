import React, { useState, useEffect } from "react";
import { Clock, Eye, TrendingUp, Calendar, User, ArrowRight, BookOpen, Pin } from "lucide-react";
import { motion } from "framer-motion";
import {
	fetchRecentPosts,
	fetchPopularPosts,
	fetchPinnedPosts,
	incrementPostReadCount,
} from "@/lib/api";

const BlogTest = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [activePostIndex, setActivePostIndex] = useState(0);

	useEffect(() => {
		fetchPosts();
	}, []);

	const fetchPosts = async () => {
		setLoading(true);
		setError(null);

		try {
			let response;
			response = await fetchPinnedPosts(6);
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

	return (
		posts.length > 0 && (
			<section className="w-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden pt-20">
				<div className="text-center mb-8 md:mb-16">
					<div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4 md:mb-6 shadow-xl">
						<svg
							className="w-8 h-8 md:w-10 md:h-10 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 drop-shadow-lg">
						Bài Viết
					</h1>
				</div>
				{/* Light Background Elements */}
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-teal-50/30"></div>
					<div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-teal-100/20 to-blue-100/20 rounded-full blur-2xl"></div>
				</div>

				<div className="relative z-10 container mx-auto px-6 max-w-[1440px]">
					{/* Header */}
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
						className="mb-6"
					>
						<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
							<div className="flex items-center space-x-3">
								<Pin className="w-8 h-8 text-yellow-600" />
								<h2 className="text-4xl font-bold text-gray-900 mb-4">
									Bài viết nổi bật
								</h2>
							</div>
						</div>
					</motion.div>

					{/* Loading State */}
					{loading && (
						<div className="flex items-center justify-center py-20">
							<div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg">
								<div className="flex items-center space-x-3">
									<div className="w-6 h-6 border-2 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
									<span className="text-gray-700 font-medium">
										Đang tải bài viết...
									</span>
								</div>
							</div>
						</div>
					)}

					{!loading && posts.length > 0 && (
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="visible"
							className="grid grid-cols-1 lg:grid-cols-2 gap-8"
						>
							{/* Main Content - Left 2/3 */}
							<div className="lg:col-span-1">
								{posts[activePostIndex] && (
									<motion.article
										key={posts[activePostIndex].id}
										variants={itemVariants}
										className="shadow-lg border border-gray-200 overflow-hidden group hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
										onClick={() => handleReadPost(posts[activePostIndex].id)}
									>
										{/* Content */}
										<div className="p-6 md:p-8">
											<div className="text-sm font-semibold text-blue-600 mb-3 uppercase tracking-wide">
												{posts[activePostIndex].category}
											</div>
											<h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
												{posts[activePostIndex].title}
											</h2>
											<p className="text-gray-600 mb-6 line-clamp-5 leading-relaxed text-lg">
												{posts[activePostIndex].content}
											</p>

											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-6 text-sm text-gray-500">
													<div className="flex items-center space-x-2">
														<User className="w-4 h-4" />
														<span>
															{posts[activePostIndex].author_id}
														</span>
													</div>
													<div className="flex items-center space-x-2">
														<Clock className="w-4 h-4" />
														<span>5 phút đọc</span>
													</div>
													<div className="flex items-center space-x-2">
														<Eye className="w-4 h-4" />
														<span>
															{(
																posts[activePostIndex].readCount ||
																0
															).toLocaleString()}
														</span>
													</div>
												</div>
												<button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
													Đọc thêm →
												</button>
											</div>
										</div>
									</motion.article>
								)}
							</div>

							{/* Thumbnail Sliders - Right 1/3 */}
							<div className="lg:col-span-1">
								<div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
									<h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center">
										<Pin className="w-5 h-5 mr-2 text-yellow-600" />
										Bài viết được ghim
									</h3>

									<div className="space-y-4">
										{posts.slice(0, 3).map((post, index) => (
											<motion.div
												key={post.id}
												variants={itemVariants}
												className={`group cursor-pointer border-2 rounded-xl p-3 transition-all duration-300 ${
													index === activePostIndex
														? "border-blue-500 bg-blue-50"
														: "border-gray-100 hover:border-gray-300"
												}`}
												onClick={() => setActivePostIndex(index)}
											>
												<div className="flex space-x-3">
													{/* Thumbnail */}
													<div className="w-20 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 relative">
														{post.image ? (
															<img
																src={post.image}
																alt={post.title}
																className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
																onError={(e) => {
																	e.target.style.display = "none";
																	e.target.nextElementSibling.style.display =
																		"flex";
																}}
															/>
														) : null}
														<div
															className={`w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center ${post.image ? "hidden" : "flex"}`}
														>
															<BookOpen className="w-5 h-5 text-blue-600" />
														</div>
														{/* Active indicator */}
														{index === activePostIndex && (
															<div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
																<div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
																	<span className="text-white text-xs font-bold">
																		{index + 1}
																	</span>
																</div>
															</div>
														)}
													</div>

													{/* Content */}
													<div className="flex-1 min-w-0">
														<div className="text-xs font-semibold text-blue-600 mb-1 uppercase">
															{post.category}
														</div>
														<h4
															className={`font-bold text-sm line-clamp-2 mb-2 transition-colors leading-tight ${
																index === activePostIndex
																	? "text-blue-600"
																	: "text-gray-900 group-hover:text-blue-600"
															}`}
														>
															{post.title}
														</h4>
														<div className="flex items-center space-x-3 text-xs text-gray-500">
															<span>{post.author_id}</span>
															<span>•</span>
															<span>
																{(post.readCount || 0) > 999
																	? `${Math.floor((post.readCount || 0) / 1000)}k`
																	: post.readCount || 0}{" "}
																views
															</span>
														</div>
													</div>
												</div>
											</motion.div>
										))}
									</div>

									{/* Navigation dots */}
									<div className="flex justify-center space-x-2 mt-6">
										{posts.slice(0, 3).map((_, index) => (
											<button
												key={index}
												onClick={() => setActivePostIndex(index)}
												className={`w-3 h-3 rounded-full transition-all duration-300 ${
													index === activePostIndex
														? "bg-blue-500 scale-125"
														: "bg-gray-300 hover:bg-gray-400"
												}`}
											/>
										))}
									</div>
								</div>
							</div>
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
		)
	);
};

export default BlogTest;
