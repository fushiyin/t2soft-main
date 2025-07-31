const { db } = require("../utils/firebaseAdmin");
const { Timestamp, FieldValue } = require("firebase-admin/firestore");

// Get comments for a specific post
const getCommentsByPostId = async (postId) => {
	try {
		const commentsRef = db.collection("comments");
		const querySnapshot = await commentsRef
			.where("postId", "==", postId)
			.where("status", "==", "active")
			.orderBy("createdAt", "desc")
			.get();

		const comments = [];
		querySnapshot.forEach((doc) => {
			comments.push({
				id: doc.id,
				...doc.data(),
			});
		});

		return { success: true, data: comments };
	} catch (error) {
		console.error("Error fetching comments:", error);
		return { success: false, error: error.message };
	}
};

// Add a new comment
const addComment = async (commentData) => {
	try {
		const commentsRef = db.collection("comments");
		const newComment = {
			...commentData,
			createdAt: Timestamp.now(),
			updatedAt: Timestamp.now(),
			likes: 0,
			replies: [],
			isEdited: false,
			status: "active",
		};

		const docRef = await commentsRef.add(newComment);

		return {
			success: true,
			data: { id: docRef.id, ...newComment },
		};
	} catch (error) {
		console.error("Error adding comment:", error);
		return { success: false, error: error.message };
	}
};

// Like a comment
const likeComment = async (commentId) => {
	try {
		const commentRef = db.collection("comments").doc(commentId);
		await commentRef.update({
			likes: FieldValue.increment(1),
		});

		return { success: true };
	} catch (error) {
		console.error("Error liking comment:", error);
		return { success: false, error: error.message };
	}
};

const addReply = async (commentId, replyData) => {
	try {
		const commentRef = db.collection("comments").doc(commentId);
		const comment = await commentRef.get();

		if (comment.exists) {
			const currentReplies = comment.data().replies || [];
			const newReply = {
				...replyData,
				createdAt: Timestamp.now(),
				likes: 0,
			};

			await commentRef.update({
				replies: [...currentReplies, newReply],
				updatedAt: Timestamp.now(),
			});

			return { success: true, data: newReply };
		}

		return { success: false, error: "Comment not found" };
	} catch (error) {
		console.error("Error adding reply:", error);
		return { success: false, error: error.message };
	}
};

// Edit a comment
const editComment = async (commentId, newContent) => {
	try {
		if (!newContent || !newContent.trim()) {
			return { success: false, error: "Content cannot be empty" };
		}

		const commentRef = db.collection("comments").doc(commentId);
		await commentRef.update({
			content: newContent.trim(),
			updatedAt: Timestamp.now(),
			isEdited: true,
		});

		return { success: true };
	} catch (error) {
		console.error("Error editing comment:", error);
		return { success: false, error: error.message };
	}
};

// Delete a comment (soft delete)
const deleteComment = async (commentId) => {
	try {
		const commentRef = db.collection("comments").doc(commentId);
		await commentRef.update({
			status: "deleted",
			updatedAt: Timestamp.now(),
		});

		return { success: true };
	} catch (error) {
		console.error("Error deleting comment:", error);
		return { success: false, error: error.message };
	}
};

// Unlike a comment
const unlikeComment = async (commentId) => {
	try {
		const commentRef = db.collection("comments").doc(commentId);
		const comment = await commentRef.get();

		if (comment.exists && comment.data().likes > 0) {
			await commentRef.update({
				likes: FieldValue.increment(-1),
			});
		}

		return { success: true };
	} catch (error) {
		console.error("Error unliking comment:", error);
		return { success: false, error: error.message };
	}
};

// Get comment by ID
const getCommentById = async (commentId) => {
	try {
		const commentRef = db.collection("comments").doc(commentId);
		const comment = await commentRef.get();

		if (comment.exists) {
			return {
				success: true,
				data: { id: comment.id, ...comment.data() },
			};
		}

		return { success: false, error: "Comment not found" };
	} catch (error) {
		console.error("Error fetching comment:", error);
		return { success: false, error: error.message };
	}
};

// Get comments count for a post
const getCommentsCount = async (postId) => {
	try {
		const commentsRef = db.collection("comments");
		const querySnapshot = await commentsRef
			.where("postId", "==", postId)
			.where("status", "==", "active")
			.get();

		return { success: true, data: querySnapshot.size };
	} catch (error) {
		console.error("Error getting comments count:", error);
		return { success: false, error: error.message };
	}
};

// Like a reply
const likeReply = async (commentId, replyIndex) => {
	try {
		const commentRef = db.collection("comments").doc(commentId);
		const comment = await commentRef.get();

		if (comment.exists) {
			const replies = comment.data().replies || [];
			if (replyIndex >= 0 && replyIndex < replies.length) {
				replies[replyIndex].likes = (replies[replyIndex].likes || 0) + 1;

				await commentRef.update({
					replies: replies,
					updatedAt: Timestamp.now(),
				});

				return { success: true };
			}
		}

		return { success: false, error: "Reply not found" };
	} catch (error) {
		console.error("Error liking reply:", error);
		return { success: false, error: error.message };
	}
};

// Report a comment
const reportComment = async (commentId, reportData) => {
	try {
		const reportsRef = db.collection("commentReports");
		const newReport = {
			commentId,
			...reportData,
			createdAt: Timestamp.now(),
			status: "pending",
		};

		const docRef = await reportsRef.add(newReport);

		return {
			success: true,
			data: { id: docRef.id, ...newReport },
		};
	} catch (error) {
		console.error("Error reporting comment:", error);
		return { success: false, error: error.message };
	}
};

// Get recent comments by user
const getCommentsByUser = async (userId, limit = 10) => {
	try {
		const commentsRef = db.collection("comments");
		const querySnapshot = await commentsRef
			.where("authorId", "==", userId)
			.where("status", "==", "active")
			.orderBy("createdAt", "desc")
			.get();

		const comments = [];
		querySnapshot.forEach((doc) => {
			comments.push({
				id: doc.id,
				...doc.data(),
			});
		});

		return { success: true, data: comments.slice(0, limit) };
	} catch (error) {
		console.error("Error fetching user comments:", error);
		return { success: false, error: error.message };
	}
};

// Pin a comment (admin feature)
const pinComment = async (commentId) => {
	try {
		const commentRef = db.collection("comments").doc(commentId);
		await commentRef.update({
			isPinned: true,
			updatedAt: Timestamp.now(),
		});

		return { success: true };
	} catch (error) {
		console.error("Error pinning comment:", error);
		return { success: false, error: error.message };
	}
};

// Unpin a comment (admin feature)
const unpinComment = async (commentId) => {
	try {
		const commentRef = db.collection("comments").doc(commentId);
		await commentRef.update({
			isPinned: false,
			updatedAt: Timestamp.now(),
		});

		return { success: true };
	} catch (error) {
		console.error("Error unpinning comment:", error);
		return { success: false, error: error.message };
	}
};

module.exports = {
	getCommentsByPostId,
	addComment,
	likeComment,
	addReply,
	editComment,
	deleteComment,
	unlikeComment,
	getCommentById,
	getCommentsCount,
	likeReply,
	reportComment,
	getCommentsByUser,
	pinComment,
	unpinComment,
};
	reportComment,
	getCommentsByUser,
	pinComment,
	unpinComment,
};
