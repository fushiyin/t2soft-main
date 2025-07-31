const express = require("express");
const router = express.Router();
const {
	getCommentsByPostId,
	addComment,
	editComment,
	deleteComment,
	likeComment,
	unlikeComment,
	addReply,
	likeReply,
	getCommentById,
	getCommentsCount,
	getCommentsByUser,
	reportComment,
	pinComment,
	unpinComment,
} = require("../services/commentService");

// GET /comments?postId=xxx - Get comments for a specific post
router.get("/", async (req, res) => {
	try {
		const { postId } = req.query;

		if (!postId) {
			return res.status(400).json({
				success: false,
				error: "postId is required",
			});
		}

		const result = await getCommentsByPostId(postId);

		if (result.success) {
			res.json({
				success: true,
				data: result.data,
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in GET /comments:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// POST /comments - Create a new comment
router.post("/", async (req, res) => {
	try {
		const { postId, authorId, authorName, content } = req.body;

		if (!postId || !authorId || !authorName || !content) {
			return res.status(400).json({
				success: false,
				error: "Missing required fields: postId, authorId, authorName, content",
			});
		}

		const commentData = {
			postId,
			authorId,
			authorName,
			content: content.trim(),
		};

		const result = await addComment(commentData);

		if (result.success) {
			res.status(201).json({
				success: true,
				data: result.data,
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in POST /comments:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// GET /comments/:id - Get a specific comment
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await getCommentById(id);

		if (result.success) {
			res.json({
				success: true,
				data: result.data,
			});
		} else {
			res.status(404).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in GET /comments/:id:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// PUT /comments/:id - Edit a comment
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { content } = req.body;

		if (!content) {
			return res.status(400).json({
				success: false,
				error: "Content is required",
			});
		}

		const result = await editComment(id, content);

		if (result.success) {
			res.json({
				success: true,
				message: "Comment updated successfully",
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in PUT /comments/:id:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// DELETE /comments/:id - Delete a comment
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await deleteComment(id);

		if (result.success) {
			res.json({
				success: true,
				message: "Comment deleted successfully",
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in DELETE /comments/:id:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// POST /comments/:id/like - Like a comment
router.post("/:id/like", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await likeComment(id);

		if (result.success) {
			res.json({
				success: true,
				message: "Comment liked successfully",
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in POST /comments/:id/like:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// POST /comments/:id/unlike - Unlike a comment
router.post("/:id/unlike", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await unlikeComment(id);

		if (result.success) {
			res.json({
				success: true,
				message: "Comment unliked successfully",
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in POST /comments/:id/unlike:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// POST /comments/:id/reply - Add a reply to a comment
router.post("/:id/reply", async (req, res) => {
	try {
		const { id } = req.params;
		const { authorId, authorName, content } = req.body;

		if (!authorId || !authorName || !content) {
			return res.status(400).json({
				success: false,
				error: "Missing required fields: authorId, authorName, content",
			});
		}

		const replyData = {
			authorId,
			authorName,
			content: content.trim(),
		};

		const result = await addReply(id, replyData);

		if (result.success) {
			res.status(201).json({
				success: true,
				data: result.data,
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in POST /comments/:id/reply:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// GET /comments/count?postId=xxx - Get comment count for a post
router.get("/count", async (req, res) => {
	try {
		const { postId } = req.query;

		if (!postId) {
			return res.status(400).json({
				success: false,
				error: "postId is required",
			});
		}

		const result = await getCommentsCount(postId);

		if (result.success) {
			res.json({
				success: true,
				data: { count: result.data },
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in GET /comments/count:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// GET /comments/user/:userId - Get comments by user
router.get("/user/:userId", async (req, res) => {
	try {
		const { userId } = req.params;
		const { limit } = req.query;

		const result = await getCommentsByUser(userId, limit ? parseInt(limit) : 10);

		if (result.success) {
			res.json({
				success: true,
				data: result.data,
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in GET /comments/user/:userId:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// POST /comments/:id/report - Report a comment
router.post("/:id/report", async (req, res) => {
	try {
		const { id } = req.params;
		const reportData = req.body;

		const result = await reportComment(id, reportData);

		if (result.success) {
			res.status(201).json({
				success: true,
				data: result.data,
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in POST /comments/:id/report:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// POST /comments/:id/pin - Pin a comment (admin)
router.post("/:id/pin", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await pinComment(id);

		if (result.success) {
			res.json({
				success: true,
				message: "Comment pinned successfully",
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in POST /comments/:id/pin:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

// POST /comments/:id/unpin - Unpin a comment (admin)
router.post("/:id/unpin", async (req, res) => {
	try {
		const { id } = req.params;

		const result = await unpinComment(id);

		if (result.success) {
			res.json({
				success: true,
				message: "Comment unpinned successfully",
			});
		} else {
			res.status(500).json({
				success: false,
				error: result.error,
			});
		}
	} catch (error) {
		console.error("Error in POST /comments/:id/unpin:", error);
		res.status(500).json({
			success: false,
			error: "Internal server error",
		});
	}
});

module.exports = router;
