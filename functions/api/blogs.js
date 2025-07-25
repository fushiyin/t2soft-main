const express = require("express");
const {
	getAllBlogPosts,
	getBlogPostById,
	searchBlogPosts,
	getBlogCategories,
	getFeaturedBlogPosts,
	getBlogTags,
	getBlogPostsByTag,
	getRelatedBlogPosts,
	incrementBlogViews,
} = require("../services/blogService");

const router = express.Router();

// Get all blog posts with pagination
router.get("/posts", async (req, res) => {
	try {
		const { page = 1, limit = 9, category } = req.query;
		const result = await getAllBlogPosts(parseInt(page), parseInt(limit), category);
		res.json({ success: true, ...result });
	} catch (error) {
		console.error("Error fetching blog posts:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get blog post by ID
router.get("/posts/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const post = await getBlogPostById(id);
		res.json({ success: true, data: post });
	} catch (error) {
		console.error("Error fetching blog post:", error);
		if (error.message === "Blog post not found") {
			res.status(404).json({ success: false, error: error.message });
		} else {
			res.status(500).json({ success: false, error: error.message });
		}
	}
});

// Search blog posts
router.get("/search", async (req, res) => {
	try {
		const { q: query, page = 1, limit = 9 } = req.query;

		if (!query || query.trim().length < 2) {
			return res.status(400).json({
				success: false,
				error: "Search query must be at least 2 characters long",
			});
		}

		const result = await searchBlogPosts(query.trim(), parseInt(page), parseInt(limit));
		res.json({ success: true, ...result });
	} catch (error) {
		console.error("Error searching blog posts:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get blog categories
router.get("/categories", async (req, res) => {
	try {
		const categories = await getBlogCategories();
		res.json({ success: true, data: categories });
	} catch (error) {
		console.error("Error fetching blog categories:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get featured blog posts
router.get("/featured", async (req, res) => {
	try {
		const { limit = 3 } = req.query;
		const posts = await getFeaturedBlogPosts(parseInt(limit));
		res.json({ success: true, data: posts });
	} catch (error) {
		console.error("Error fetching featured blog posts:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get blog tags
router.get("/tags", async (req, res) => {
	try {
		const tags = await getBlogTags();
		res.json({ success: true, data: tags });
	} catch (error) {
		console.error("Error fetching blog tags:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get posts by tag
router.get("/tags/:tag", async (req, res) => {
	try {
		const { tag } = req.params;
		const { page = 1, limit = 9 } = req.query;

		const result = await getBlogPostsByTag(tag, parseInt(page), parseInt(limit));
		res.json({ success: true, ...result });
	} catch (error) {
		console.error("Error fetching posts by tag:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get related posts
router.get("/posts/:id/related", async (req, res) => {
	try {
		const { id } = req.params;
		const { limit = 3 } = req.query;

		const posts = await getRelatedBlogPosts(id, parseInt(limit));
		res.json({ success: true, data: posts });
	} catch (error) {
		console.error("Error fetching related blog posts:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Increment blog post views
router.post("/posts/:id/views", async (req, res) => {
	try {
		const { id } = req.params;
		await incrementBlogViews(id);
		res.json({ success: true, message: "View count incremented" });
	} catch (error) {
		console.error("Error incrementing blog views:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get blog statistics
router.get("/stats", async (req, res) => {
	try {
		const [categories, tags] = await Promise.all([getBlogCategories(), getBlogTags()]);

		const totalPosts = categories.reduce((sum, cat) => sum + cat.count, 0);

		res.json({
			success: true,
			data: {
				totalPosts,
				totalCategories: categories.length,
				totalTags: tags.length,
				categories,
				tags,
			},
		});
	} catch (error) {
		console.error("Error fetching blog statistics:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

module.exports = router;
