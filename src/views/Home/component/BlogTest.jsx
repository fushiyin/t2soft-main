import React, { useState, useEffect } from "react";
import {
	Clock,
	Eye,
	TrendingUp,
	Calendar,
	User,
	ArrowRight,
	BookOpen,
	Pin,
	MessageCircle,
	Heart,
	Share,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import { fetchPinnedPosts, incrementPostReadCount } from "@/lib/api";
import BlogPostModal from "@/components/ui/BlogPostModal";

const BlogTest = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [selectedPost, setSelectedPost] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const location = useLocation();
	const { postId } = useParams();

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

	const handleViewMore = (post) => {
		setSelectedPost(post);
		setIsModalOpen(true);
		handleReadPost(post.id);

		const newUrl = `${window.location.pathname}?post=${post.id}`;
		window.history.pushState({ postId: post.id }, "", newUrl);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedPost(null);

		const newUrl = window.location.pathname;
		window.history.pushState({}, "", newUrl);
	};

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const postIdFromUrl = urlParams.get("post") || postId;

		if (postIdFromUrl && posts.length > 0) {
			const post = posts.find((p) => p.id === postIdFromUrl);
			if (post) {
				setSelectedPost(post);
				setIsModalOpen(true);
			}
		}
	}, [posts, location.search, postId]);

	useEffect(() => {
		const handlePopState = (event) => {
			const urlParams = new URLSearchParams(window.location.search);
			const postIdFromUrl = urlParams.get("post");

			if (postIdFromUrl && posts.length > 0) {
				const post = posts.find((p) => p.id === postIdFromUrl);
				if (post) {
					setSelectedPost(post);
					setIsModalOpen(true);
				}
			} else {
				setIsModalOpen(false);
				setSelectedPost(null);
			}
		};

		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, [posts]);

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

	const convertWordCountToReadingTime = (wordCount) => {
		const wordsPerMinute = 200;
		const minutes = Math.ceil(wordCount / wordsPerMinute);
		return `${minutes} phút đọc`;
	};

	return (
		posts.length > 0 && (
			<section className="w-full bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50 relative overflow-hidden pt-20">
				<div className="absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-teal-50/40"></div>
					<div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
					<div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-teal-200/30 to-blue-200/30 rounded-full blur-2xl"></div>
				</div>
				<div className="text-center mb-12 relative z-10">
					<div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mb-6 shadow-xl">
						<Pin className="w-8 h-8 text-white" />
					</div>
					<h1 className="text-4xl md:text-6xl font-black mb-4 text-gray-900">
						Bài Viết Nổi Bật
					</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Khám phá những hiểu biết sâu sắc về Trading và Cryptocurrency
					</p>
				</div>

				<div className="relative z-10 container mx-auto px-6 max-w-[1440px]">
					{loading && (
						<div className="flex items-center justify-center py-20">
							<div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-xl">
								<div className="flex items-center space-x-3">
									<div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
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
							className={`grid gap-6 ${
								posts.slice(0, 3).length === 1
									? "grid-cols-1"
									: posts.slice(0, 3).length === 2
										? "grid-cols-1 md:grid-cols-2"
										: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
							}`}
						>
							{/* Facebook-style Posts - Max 3 items */}
							{posts.slice(0, 3).map((post, index) => (
								<motion.article
									key={post.id}
									variants={itemVariants}
									className="bg-white/95 backdrop-blur-xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-500 shadow-lg"
								>
									{/* Post Header */}
									<div className="p-4 border-b border-gray-200">
										<div className="flex items-center justify-between">
											<div className="flex items-center space-x-3">
												<div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
													<User className="w-5 h-5 text-white" />
												</div>
												<div>
													<h3 className="text-gray-900 font-semibold text-sm">
														{post.author_id}
													</h3>
													<div className="flex items-center space-x-2 text-gray-600 text-xs">
														<span>
															{new Date(
																post.created_at,
															).toLocaleDateString("vi-VN")}
														</span>
														<span>•</span>
														<span className="text-blue-600 uppercase tracking-wide font-semibold">
															{post.category}
														</span>
													</div>
												</div>
											</div>
											{post.is_pinned && (
												<Pin className="w-4 h-4 text-yellow-600" />
											)}
										</div>
									</div>

									{/* Post Content */}
									<div className="p-4">
										<h2 className="text-lg font-bold text-gray-900 mb-3 leading-tight line-clamp-2">
											{post.title}
										</h2>
										<p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
											{post.content || "Nội dung bài viết..."}
										</p>
										<span
											className="text-blue-600 hover:underline cursor-pointer mb-4 inline-block"
											onClick={() => handleViewMore(post)}
										>
											Xem thêm
										</span>

										{/* Post Image */}
										{post.image ? (
											<div className="mb-4 rounded-xl overflow-hidden shadow-md">
												<img
													src={post.image}
													alt={post.title}
													className="w-full h-40 object-cover"
													onError={(e) => {
														e.target.style.display = "none";
														e.target.nextElementSibling.style.display =
															"flex";
													}}
												/>
											</div>
										) : (
											<div className="mb-4 h-40 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center shadow-inner">
												<div className="text-center">
													<div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl mx-auto mb-2 flex items-center justify-center shadow-lg">
														<BookOpen className="w-6 h-6 text-white" />
													</div>
													<span className="text-gray-700 text-sm font-medium">
														{post.category}
													</span>
												</div>
											</div>
										)}
									</div>

									{/* Post Stats */}
									<div className="px-4 py-3 border-t border-gray-200">
										<div className="flex items-center justify-between text-gray-600 text-xs">
											<div className="flex items-center space-x-4">
												<div className="flex items-center space-x-1">
													<Eye className="w-3 h-3" />
													<span>
														{(post.readCount || 0).toLocaleString()}{" "}
														lượt xem
													</span>
												</div>
												<div className="flex items-center space-x-1">
													<Clock className="w-3 h-3" />
													<span>
														{convertWordCountToReadingTime(
															post.content?.split(" ").length || 0,
														)}
													</span>
												</div>
											</div>
										</div>
									</div>

									{/* Social Actions */}
									<div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
										<div className="flex items-center justify-around">
											<button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors py-1 px-2 rounded-lg hover:bg-red-50 text-xs">
												<Heart className="w-4 h-4" />
												<span>Thích</span>
											</button>
											<button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors py-1 px-2 rounded-lg hover:bg-blue-50 text-xs">
												<MessageCircle className="w-4 h-4" />
												<span>Bình luận</span>
											</button>
											<button className="flex items-center space-x-1 text-gray-600 hover:text-green-600 transition-colors py-1 px-2 rounded-lg hover:bg-green-50 text-xs">
												<Share className="w-4 h-4" />
												<span>Chia sẻ</span>
											</button>
										</div>
									</div>
								</motion.article>
							))}
						</motion.div>
					)}

					{/* No Posts State */}
					{!loading && posts.length === 0 && (
						<div className="flex items-center justify-center py-20">
							<div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 text-center shadow-xl">
								<h3 className="text-lg font-semibold text-gray-800 mb-4">
									Chưa có bài viết nào
								</h3>
								<p className="text-gray-600 mb-6">
									Hãy kiểm tra lại sau hoặc khám phá các chủ đề khác.
								</p>
								<button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-colors shadow-lg">
									Khám phá chủ đề khác
								</button>
							</div>
						</div>
					)}
				</div>

				<BlogPostModal
					post={selectedPost}
					isOpen={isModalOpen}
					onClose={closeModal}
				/>
			</section>
		)
	);
};

export default BlogTest;
