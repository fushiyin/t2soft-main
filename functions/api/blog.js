const express = require("express");

const {
	getAllPosts,
	getPostById,
	getMostRecentPosts,
	getMostPopularPosts,
	getPinnedPosts,
	getPostsByCategory,
	getPostsByAuthor,
	getPostsByCourse,
	searchPosts,
	incrementPostReadCount,
	createPost,
	updatePost,
	deletePost,
	togglePostPin,
} = require("../services/blogService");

const router = express.Router();

// Get all blog posts with filters
router.get("/", async (req, res) => {
	try {
		const { category, search, author_id, is_pinned, limit = 6 } = req.query;

		let posts;
		if (search) {
			posts = await searchPosts(search, Number(limit));
		} else if (category && category !== "All") {
			posts = await getPostsByCategory(category, Number(limit));
		} else if (author_id) {
			posts = await getPostsByAuthor(author_id, Number(limit));
		} else if (is_pinned !== undefined) {
			const pinnedFilter = is_pinned === 'true';
			posts = await getPinnedPosts(pinnedFilter ? Number(limit) : null);
		} else {
			posts = await getAllPosts(Number(limit));
		}

		res.json(posts);
	} catch (error) {
		console.error("Error fetching blog posts:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get most recent blog posts (sorted by updated_at DESC)
router.get("/recent", async (req, res) => {
	try {
		const { limit = 6 } = req.query;
		const posts = await getMostRecentPosts(Number(limit));
		res.json(posts);
	} catch (error) {
		console.error("Error fetching most recent blog posts:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get most popular blog posts (sorted by readCount DESC)
router.get("/popular", async (req, res) => {
	try {
		const { limit = 6 } = req.query;
		const posts = await getMostPopularPosts(Number(limit));
		res.json(posts);
	} catch (error) {
		console.error("Error fetching popular blog posts:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get pinned blog posts
router.get("/pinned", async (req, res) => {
	try {
		const { limit = 3 } = req.query;
		const posts = await getPinnedPosts(Number(limit));
		res.json(posts);
	} catch (error) {
		console.error("Error fetching pinned blog posts:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get posts by category
router.get("/category/:category", async (req, res) => {
	try {
		const { category } = req.params;
		const { limit = 6 } = req.query;
		const posts = await getPostsByCategory(category, Number(limit));
		res.json(posts);
	} catch (error) {
		console.error("Error fetching posts by category:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get posts by author
router.get("/author/:author_id", async (req, res) => {
	try {
		const { author_id } = req.params;
		const { limit = 6 } = req.query;
		const posts = await getPostsByAuthor(author_id, Number(limit));
		res.json(posts);
	} catch (error) {
		console.error("Error fetching posts by author:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get posts by course
router.get("/course/:course_id", async (req, res) => {
	try {
		const { course_id } = req.params;
		const { limit = 6 } = req.query;
		const posts = await getPostsByCourse(course_id, Number(limit));
		res.json(posts);
	} catch (error) {
		console.error("Error fetching posts by course:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get blog post by ID
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const post = await getPostById(id);
		res.json(post);
	} catch (error) {
		console.error("Error fetching blog post:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Increment post read count
router.patch("/:id/increment-read", async (req, res) => {
	try {
		const { id } = req.params;
		await incrementPostReadCount(id);
		res.json({ success: true, message: "Read count incremented" });
	} catch (error) {
		console.error("Error incrementing post read count:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Toggle post pin status
router.patch("/:id/toggle-pin", async (req, res) => {
	try {
		const { id } = req.params;
		const updatedPost = await togglePostPin(id);
		res.json({ success: true, data: updatedPost });
	} catch (error) {
		console.error("Error toggling post pin status:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Increment post view count (legacy endpoint)
router.post("/:id/view", async (req, res) => {
	try {
		const { id } = req.params;
		await incrementPostReadCount(id);
		res.json({ success: true, message: "View count incremented" });
	} catch (error) {
		console.error("Error incrementing post view count:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Create a new blog post
router.post("/", async (req, res) => {
	try {
		const newPost = req.body;
		const createdPost = await createPost(newPost);
		res.status(201).json({ success: true, data: createdPost });
	} catch (error) {
		console.error("Error creating blog post:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Update an existing blog post
router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const updatedPost = req.body;
		const post = await updatePost(id, updatedPost);
		res.json({ success: true, data: post });
	} catch (error) {
		console.error("Error updating blog post:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Delete a blog post
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await deletePost(id);
		res.json({ success: true, message: "Post deleted successfully" });
	} catch (error) {
		console.error("Error deleting blog post:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

module.exports = router;
