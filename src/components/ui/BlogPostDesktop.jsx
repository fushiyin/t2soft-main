import React, { useState, useEffect } from "react";
import {
	X,
	Clock,
	Eye,
	User,
	Calendar,
	Pin,
	Share,
	Heart,
	MessageCircle,
	Send,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchCommentsByPostId, createComment } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const BlogPostDesktop = ({ post, isOpen, onClose, formatDate, handleShare }) => {
	const [expandedComments, setExpandedComments] = useState({});
	const [comments, setComments] = useState([]);
	const [commentsLoading, setCommentsLoading] = useState(false);
	const [commentText, setCommentText] = useState("");
	const [submittingComment, setSubmittingComment] = useState(false);
	const [replyingTo, setReplyingTo] = useState(null);
	const [replyText, setReplyText] = useState("");
	const { user, requireAuth } = useAuth();
	const navigate = useNavigate();

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

	const handleSubmitComment = async () => {
		const canProceed = requireAuth(null, () => navigate("/user-login"));

		if (!canProceed || !commentText.trim() || submittingComment) return;

		setSubmittingComment(true);
		try {
			const commentData = {
				postId: post.id,
				authorId: user?.id || "guest_user",
				authorName: user?.name || "Khách",
				content: commentText.trim(),
			};

			const response = await createComment(commentData);
			if (response.data && response.data.success) {
				setComments((prev) => [response.data.data, ...prev]);
				setCommentText("");
			}
		} catch (error) {
			console.error("Error submitting comment:", error);
		} finally {
			setSubmittingComment(false);
		}
	};

	const formatCommentTime = (timestamp) => {
		if (!timestamp) return "";

		const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
		const now = new Date();
		const diffInMs = now - date;
		const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
		const diffInDays = Math.floor(diffInHours / 24);

		if (diffInHours < 1) return "Vừa xong";
		if (diffInHours < 24) return `${diffInHours} giờ trước`;
		if (diffInDays < 7) return `${diffInDays} ngày trước`;
		return date.toLocaleDateString("vi-VN");
	};

	const toggleReplies = (commentId) => {
		setExpandedComments((prev) => ({
			...prev,
			[commentId]: !prev[commentId],
		}));
	};

	const handleReply = (commentId) => {
		requireAuth(
			() => {
				setReplyingTo(commentId === replyingTo ? null : commentId);
				setReplyText("");
			},
			() => navigate("/user-login"),
		);
	};

	const handleSubmitReply = async (commentId) => {
		if (!replyText.trim()) return;

		try {
			console.log("Reply to comment:", commentId, "Content:", replyText);
			setReplyText("");
			setReplyingTo(null);
		} catch (error) {
			console.error("Error submitting reply:", error);
		}
	};

	const handleLike = () => {
		requireAuth(
			() => {
				console.log("Liked post:", post.id);
			},
			() => navigate("/user-login"),
		);
	};

	const handleShareAction = () => {
		requireAuth(
			() => {
				if (handleShare) {
					handleShare(post);
				}
			},
			() => navigate("/user-login"),
		);
	};

	const handleCommentFocus = () => {
		if (!user) {
			navigate("/user-login");
		}
	};

	const handleCommentChange = (e) => {
		if (!user) {
			navigate("/user-login");
			return;
		}
		setCommentText(e.target.value);
	};

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
						className="relative max-w-5xl max-h-[90vh] w-full bg-white shadow-2xl flex flex-col overflow-hidden rounded-2xl"
						onClick={(e) => e.stopPropagation()}
					>
						{/* Desktop Header */}
						<div className="flex items-center justify-between p-4 border-b border-gray-200">
							<div className="flex items-center space-x-3">
								{post.is_pinned && <Pin className="w-5 h-5 text-yellow-600" />}
								<span className="text-blue-600 text-sm font-semibold bg-blue-50 px-3 py-1 rounded-full">
									{post.category}
								</span>
							</div>
							<button
								onClick={onClose}
								className="w-10 h-10 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
							>
								<X className="w-5 h-5 text-gray-600" />
							</button>
						</div>

						{/* Desktop Content */}
						<div
							className="flex-1 overflow-y-auto overscroll-contain"
							onWheel={(e) => e.stopPropagation()}
							onTouchMove={(e) => e.stopPropagation()}
						>
							<div className="p-6">
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
										<span>
											{(post.readCount || 0).toLocaleString()} lượt xem
										</span>
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
								<div className="prose prose-gray max-w-none mb-8">
									<div className="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">
										{post.content ||
											"Nội dung bài viết sẽ được hiển thị ở đây..."}
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

								{/* Reaction Area */}
								<div className="mt-6 py-4 border-y border-gray-200 bg-gray-50 -mx-6 px-6">
									<div className="flex items-center justify-around">
										<button
											onClick={handleLike}
											className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors py-2 px-4 rounded-lg hover:bg-red-50"
										>
											<Heart className="w-5 h-5" />
											<span className="font-medium">Thích</span>
										</button>
										<button
											onClick={() => {
												const commentSection =
													document.querySelector("#comment-section");
												if (commentSection) {
													commentSection.scrollIntoView({
														behavior: "smooth",
													});
												}
											}}
											className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50"
										>
											<MessageCircle className="w-5 h-5" />
											<span className="font-medium">Bình luận</span>
										</button>
										<button
											onClick={handleShareAction}
											className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors py-2 px-4 rounded-lg hover:bg-green-50"
										>
											<Share className="w-5 h-5" />
											<span className="font-medium">Chia sẻ</span>
										</button>
									</div>
								</div>

								{/* Comment Section - Below Content */}
								<div
									id="comment-section"
									className="mt-8 pb-8"
								>
									<h3 className="text-xl font-bold text-gray-900 mb-6">
										Bình luận ({comments.length})
									</h3>

									{/* Comment Input */}
									<div className="mb-8 bg-gray-50 rounded-xl p-4">
										<div className="flex space-x-3">
											<div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
												{user?.avatar ? (
													<img
														src={user.avatar}
														alt={user.name}
														className="w-10 h-10 rounded-full object-cover"
													/>
												) : (
													<User className="w-5 h-5 text-white" />
												)}
											</div>
											<div className="flex-1">
												<div className="flex items-end space-x-2">
													<textarea
														value={commentText}
														onChange={handleCommentChange}
														onFocus={handleCommentFocus}
														placeholder={
															user
																? "Viết bình luận..."
																: "Nhấn để đăng nhập và bình luận"
														}
														className="flex-1 p-4 border border-gray-300 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
														rows="3"
													/>
													<button
														onClick={handleSubmitComment}
														disabled={
															!commentText.trim() ||
															submittingComment ||
															!user
														}
														className={`p-3 rounded-full transition-colors ${
															commentText.trim() &&
															!submittingComment &&
															user
																? "bg-blue-600 hover:bg-blue-700 text-white transform hover:scale-105"
																: "bg-gray-300 text-gray-500 cursor-not-allowed"
														}`}
													>
														{submittingComment ? (
															<div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin" />
														) : (
															<Send className="w-5 h-5" />
														)}
													</button>
												</div>
											</div>
										</div>
									</div>

									{/* Comments Loading */}
									{commentsLoading && (
										<div className="flex justify-center py-8">
											<div className="w-8 h-8 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
										</div>
									)}

									{/* Comments List */}
									{!commentsLoading && (
										<div className="space-y-6">
											{comments.length > 0 ? (
												comments.map((comment) => (
													<div
														key={comment.id}
														className="space-y-4"
													>
														{/* Main Comment */}
														<div className="flex space-x-3">
															<div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
																<User className="w-5 h-5 text-white" />
															</div>
															<div className="flex-1">
																<div className="bg-gray-50 rounded-xl p-4">
																	<div className="font-semibold text-gray-900 mb-2">
																		{comment.authorName}
																	</div>
																	<p className="text-gray-700 leading-relaxed">
																		{comment.content}
																	</p>
																</div>
																<div className="flex items-center space-x-6 mt-3 ml-4">
																	<span className="text-sm text-gray-500">
																		{formatCommentTime(
																			comment.createdAt,
																		)}
																	</span>
																	<button className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors">
																		👍 {comment.likes || 0}
																	</button>
																	<button
																		onClick={() =>
																			handleReply(comment.id)
																		}
																		className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
																	>
																		Trả lời
																	</button>
																	{comment.replies &&
																		comment.replies.length >
																			0 && (
																			<button
																				onClick={() =>
																					toggleReplies(
																						comment.id,
																					)
																				}
																				className="text-sm text-gray-600 hover:text-blue-600 font-medium transition-colors"
																			>
																				{expandedComments[
																					comment.id
																				]
																					? "Ẩn phản hồi"
																					: `${comment.replies.length} phản hồi`}
																			</button>
																		)}
																</div>
															</div>
														</div>

														{/* Reply Input */}
														{replyingTo === comment.id && (
															<div className="ml-13 mt-4">
																<div className="flex space-x-3">
																	<div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
																		{user?.avatar ? (
																			<img
																				src={user.avatar}
																				alt={user.name}
																				className="w-8 h-8 rounded-full object-cover"
																			/>
																		) : (
																			<User className="w-4 h-4 text-white" />
																		)}
																	</div>
																	<div className="flex-1">
																		<div className="flex items-end space-x-2">
																			<textarea
																				value={replyText}
																				onChange={(e) =>
																					setReplyText(
																						e.target
																							.value,
																					)
																				}
																				placeholder="Viết phản hồi..."
																				className="flex-1 p-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
																				rows="2"
																			/>
																			<button
																				onClick={() =>
																					handleSubmitReply(
																						comment.id,
																					)
																				}
																				disabled={
																					!replyText.trim()
																				}
																				className={`px-4 py-2 rounded-lg font-medium transition-colors ${
																					replyText.trim()
																						? "bg-blue-600 hover:bg-blue-700 text-white"
																						: "bg-gray-300 text-gray-500 cursor-not-allowed"
																				}`}
																			>
																				Gửi
																			</button>
																		</div>
																	</div>
																</div>
															</div>
														)}

														{/* Replies */}
														{comment.replies &&
															comment.replies.length > 0 &&
															expandedComments[comment.id] && (
																<div className="ml-13 space-y-4">
																	{comment.replies.map(
																		(reply, replyIndex) => (
																			<div
																				key={replyIndex}
																				className="flex space-x-3"
																			>
																				<div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
																					<User className="w-4 h-4 text-white" />
																				</div>
																				<div className="flex-1">
																					<div className="bg-blue-50 rounded-xl p-3">
																						<div className="font-semibold text-sm text-gray-900 mb-1">
																							{
																								reply.authorName
																							}
																						</div>
																						<p className="text-gray-700 text-sm">
																							{
																								reply.content
																							}
																						</p>
																					</div>
																					<div className="flex items-center space-x-4 mt-2 ml-3">
																						<span className="text-xs text-gray-500">
																							{formatCommentTime(
																								reply.createdAt,
																							)}
																						</span>
																						<button className="text-xs text-gray-600 hover:text-blue-600 font-medium transition-colors">
																							👍{" "}
																							{reply.likes ||
																								0}
																						</button>
																					</div>
																				</div>
																			</div>
																		),
																	)}
																</div>
															)}
													</div>
												))
											) : (
												<div className="text-center py-12 text-gray-500">
													<MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-300" />
													<p className="text-lg">
														Chưa có bình luận nào. Hãy là người đầu
														tiên!
													</p>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default BlogPostDesktop;
