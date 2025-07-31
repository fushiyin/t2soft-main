import React from "react";
import { X, Clock, Eye, User, Calendar, Pin, Share, Heart, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BlogPostDesktop = ({ post, isOpen, onClose, formatDate, handleShare }) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					{/* Desktop Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="absolute inset-0 bg-black/60"
						onClick={onClose}
					/>

					{/* Desktop Modal */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 20 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						className="relative max-w-3xl max-h-[90vh] w-full bg-white shadow-2xl flex flex-col overflow-hidden"
					>
						{/* Desktop Header */}
						<div className="flex items-center justify-end p-2 border-b border-gray-200">
							<button
								onClick={onClose}
								className="w-10 h-10 hover:bg-gray-200 cursor-pointer flex items-center justify-center transition-colors"
							>
								<X className="w-5 h-5 text-gray-600" />
							</button>
						</div>

						{/* Desktop Content */}
						<div className="flex-1 overflow-y-auto">
							<div className="flex">
								{/* Main Content - Left Side */}
								<div className="flex-1 p-6 pr-3">
									{/* Title */}
									<h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
										{post.title}
									</h1>

									{/* Meta Info */}
									<div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6 text-sm">
										<div className="flex items-center space-x-2">
											<User className="w-4 h-4" />
											<span className="font-medium">{post.author_id}</span>
										</div>
										<div className="flex items-center space-x-2">
											<Calendar className="w-4 h-4" />
											<span>{formatDate(post.created_at)}</span>
										</div>
										<div className="flex items-center space-x-2">
											<Eye className="w-4 h-4" />
											<span>{(post.readCount || 0).toLocaleString()} lượt xem</span>
										</div>
										<div className="flex items-center space-x-2">
											<Clock className="w-4 h-4" />
											<span>5 phút đọc</span>
										</div>
									</div>

									{/* Featured Image */}
									{post.image && (
										<div className="mb-6 rounded-xl overflow-hidden">
											<img
												src={post.image}
												alt={post.title}
												className="w-full h-80 object-cover"
											/>
										</div>
									)}

									{/* Content */}
									<div className="prose prose-gray max-w-none">
										<div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
											{post.content || "Nội dung bài viết sẽ được hiển thị ở đây..."}
										</div>
									</div>

									{/* Course Link */}
									{post.course_id && (
										<div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
											<div className="flex items-center space-x-3">
												<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
													<Clock className="w-5 h-5 text-white" />
												</div>
												<div>
													<h3 className="text-gray-900 font-semibold">Khóa học liên quan</h3>
													<p className="text-blue-600 text-sm">Tìm hiểu thêm về chủ đề này</p>
												</div>
											</div>
										</div>
									)}
								</div>

								{/* Comment Section - Right Side */}
								<div className="w-80 p-6 pl-3 border-l border-gray-200">
									<h3 className="text-lg font-bold text-gray-900 mb-4">Bình luận</h3>
									
									{/* Comment Input */}
									<div className="mb-6">
										<div className="flex space-x-2">
											<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
												<User className="w-4 h-4 text-white" />
											</div>
											<div className="flex-1">
												<textarea
													placeholder="Viết bình luận..."
													className="w-full p-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
													rows="2"
												/>
												<div className="flex justify-end mt-2">
													<button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors">
														Đăng
													</button>
												</div>
											</div>
										</div>
									</div>

									{/* Comments List */}
									<div className="space-y-4 max-h-96 overflow-y-auto">
										{[1, 2, 3, 4, 5].map((_, index) => (
											<div key={index} className="flex space-x-2">
												<div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
													<User className="w-3 h-3 text-gray-600" />
												</div>
												<div className="flex-1">
													<div className="bg-gray-100 rounded-lg p-2">
														<div className="font-semibold text-xs text-gray-900 mb-1">
															Người dùng {index + 1}
														</div>
														<p className="text-gray-700 text-xs leading-relaxed">
															Bình luận ngắn gọn về bài viết này.
														</p>
													</div>
													<div className="flex items-center space-x-3 mt-1 text-xs text-gray-500">
														<span>2h</span>
														<button className="hover:text-blue-600">Thích</button>
														<button className="hover:text-blue-600">Trả lời</button>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>

						{/* Desktop Footer - Facebook Style */}
						<div className="p-4 bg-white border-t border-gray-200">
							<div className="flex items-center justify-around">
								<button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors py-2 px-6 rounded-lg hover:bg-red-50">
									<Heart className="w-5 h-5" />
									<span className="font-medium">Thích</span>
								</button>
								<button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors py-2 px-6 rounded-lg hover:bg-blue-50">
									<MessageCircle className="w-5 h-5" />
									<span className="font-medium">Bình luận</span>
								</button>
								<button
									onClick={handleShare}
									className="flex items-center space-x-2 text-gray-600 hover:text-green-500 transition-colors py-2 px-6 rounded-lg hover:bg-green-50"
								>
									<Share className="w-5 h-5" />
									<span className="font-medium">Chia sẻ</span>
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default BlogPostDesktop;
