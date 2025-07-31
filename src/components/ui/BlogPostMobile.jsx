import React, { useState, useEffect, useRef } from "react";
import {
	Clock,
	Eye,
	User,
	Calendar,
	Pin,
	Share,
	ArrowLeft,
	Heart,
	MessageCircle,
	ChevronUp,
	Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCommentsByPostId, createComment } from "@/lib/api";
import { convertTimeToDate } from "@/lib/utils";

const BlogPostMobile = ({ post, isOpen, onClose, handleShare }) => {
	const [commentText, setCommentText] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [comments, setComments] = useState([]);
	const [commentsLoading, setCommentsLoading] = useState(false);
	const [submittingComment, setSubmittingComment] = useState(false);
	const scrollContainerRef = useRef(null);
	const textareaRef = useRef(null);

	// Fetch comments when post changes
	useEffect(() => {
		if (post?.id && isOpen) {
			fetchComments();
		}
	}, [post?.id, isOpen]);

	const fetchComments = async () => {
		if (!post?.id) return;

		setCommentsLoading(true);
		try {
			const response = await fetchCommentsByPostId(post.id);
			if (response.data && response.data.success) {
				setComments(response.data.data || []);
			}
		} catch (error) {
			console.error("Error fetching comments:", error);
		} finally {
			setCommentsLoading(false);
		}
	};

	const handleCommentChange = (e) => {
		setCommentText(e.target.value);

		if (textareaRef.current) {
			textareaRef.current.style.height = "auto";
			const scrollHeight = textareaRef.current.scrollHeight;
			const maxHeight = 5 * 24;
			textareaRef.current.style.height = Math.min(scrollHeight, maxHeight) + "px";
		}
	};

	const handleSubmitComment = async () => {
		if (!commentText.trim() || submittingComment) return;

		setSubmittingComment(true);
		try {
			const commentData = {
				postId: post.id,
				authorId: "current_user_id",
				authorName: "Người dùng hiện tại",
				content: commentText.trim(),
			};

			const response = await createComment(commentData);
			if (response.data && response.data.success) {
				setComments((prev) => [response.data.data, ...prev]);
				setCommentText("");
				if (textareaRef.current) {
					textareaRef.current.style.height = "auto";
				}
			}
		} catch (error) {
			console.error("Error submitting comment:", error);
		} finally {
			setSubmittingComment(false);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					initial={{ x: "100%" }}
					animate={{ x: 0 }}
					exit={{ x: "100%" }}
					transition={{ type: "spring", damping: 25, stiffness: 300 }}
					className="fixed inset-0 z-50 bg-white flex flex-col"
				>
					<div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-10">
						<button
							onClick={onClose}
							className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
						>
							<ArrowLeft className="w-6 h-6" />
							<span className="font-medium">Quay lại</span>
						</button>
					</div>

					<div
						ref={scrollContainerRef}
						className="flex-1 overflow-y-auto"
					>
						<div className="p-4">
							<h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
								{post.title}
							</h1>

							<div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6 text-sm">
								<div className="flex items-center space-x-2">
									<Calendar className="w-4 h-4" />
									<span className="">{convertTimeToDate(post.created_at)}</span>
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

							{post.image && (
								<div className="mb-6 rounded-xl overflow-hidden">
									<img
										src={post.image}
										alt={post.title}
										className="w-full h-64 object-cover"
									/>
								</div>
							)}

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
											<h3 className="text-gray-900 font-semibold">
												Khóa học liên quan
											</h3>
											<p className="text-blue-600 text-sm">
												Tìm hiểu thêm về chủ đề này
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Reaction Area - Right after content */}
							<div className="mt-6 py-3 border-y border-gray-200">
								<div className="flex items-center justify-around">
									<button className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors py-2 px-4 rounded-lg hover:bg-red-50">
										<Heart className="w-5 h-5" />
										<span className="text-sm font-medium">Thích</span>
									</button>
									<button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50">
										<MessageCircle className="w-5 h-5" />
										<span className="text-sm font-medium">Bình luận</span>
									</button>
									<button
										onClick={handleShare}
										className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors py-2 px-4 rounded-lg hover:bg-green-50"
									>
										<Share className="w-5 h-5" />
										<span className="text-sm font-medium">Chia sẻ</span>
									</button>
								</div>
							</div>

							{/* Comment Section - Real Comments */}
							<div className="mt-6 pb-20">
								<h3 className="text-lg font-bold text-gray-900 mb-4">
									Bình luận ({comments.length})
								</h3>

								{/* Comments Loading */}
								{commentsLoading && (
									<div className="flex justify-center py-4">
										<div className="w-6 h-6 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
									</div>
								)}

								{/* Comments List */}
								{!commentsLoading && (
									<div className="space-y-4">
										{comments.length > 0 ? (
											comments.map((comment) => (
												<div
													key={comment.id}
													className="flex space-x-3"
												>
													<div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
														<User className="w-4 h-4 text-white" />
													</div>
													<div className="flex-1">
														<div className="rounded-lg pb-3 px-3">
															<div className="font-semibold flex items-center text-sm text-gray-900 mb-1 w-full justify-between">
																<div>{comment.authorName}</div>
																<div className="text-gray-600 text-xs font-semibold italic">
																	{convertTimeToDate(
																		comment.createdAt,
																	)}
																</div>
															</div>
															<p className="text-gray-700 text-sm bg-gray-100 p-2 rounded">
																{comment.content}
															</p>
														</div>
														<div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
															{/* <button className="hover:text-blue-600">
																{comment.replies?.length || 0} Trả
																lời
															</button> */}
														</div>
													</div>
												</div>
											))
										) : (
											<div className="text-center py-8 text-gray-500">
												<MessageCircle className="w-12 h-12 mx-auto mb-2 text-gray-300" />
												<p>Chưa có bình luận nào. Hãy là người đầu tiên!</p>
											</div>
										)}
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Fixed Comment Input - Improved */}
					<div className="p-4 bg-white border-t border-gray-200 sticky bottom-0">
						<div className="flex space-x-3 items-end">
							<div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
								<User className="w-4 h-4 text-white" />
							</div>
							<div className="flex-1">
								<div className="flex items-end space-x-2">
									<textarea
										ref={textareaRef}
										value={commentText}
										onChange={handleCommentChange}
										onFocus={() => setIsFocused(true)}
										onBlur={() => setIsFocused(false)}
										placeholder="Viết bình luận..."
										className={`flex-1 p-3 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ${
											isFocused ? "min-h-[48px]" : "h-12"
										}`}
										rows="1"
										style={{
											lineHeight: "24px",
											maxHeight: "120px",
											overflowY: "auto",
										}}
										disabled={submittingComment}
									/>
									<button
										onClick={handleSubmitComment}
										disabled={!commentText.trim() || submittingComment}
										className={`p-3 rounded-full transition-all duration-200 ${
											commentText.trim() && !submittingComment
												? "bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105"
												: "bg-gray-300 text-gray-500 cursor-not-allowed"
										}`}
									>
										{submittingComment ? (
											<div className="w-4 h-4 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
										) : (
											<Send className="w-4 h-4" />
										)}
									</button>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default BlogPostMobile;
