const { db } = require("../utils/firebaseAdmin");

const POSTS_COLLECTION = "posts";

// Get all posts with optional limit
const getAllPosts = async (limit = 10) => {
	try {
		let query = db.collection(POSTS_COLLECTION);

		if (limit) {
			query = query.limit(limit);
		}

		const snapshot = await query.get();
		const posts = [];

		snapshot.forEach((doc) => {
			posts.push({ id: doc.id, ...doc.data() });
		});

		return posts;
	} catch (error) {
		throw new Error(`Error fetching all posts: ${error.message}`);
	}
};

// Get most recent posts (sorted by updated_at DESC)
const getMostRecentPosts = async (limit = 6) => {
	try {
		const snapshot = await db
			.collection(POSTS_COLLECTION)
			.orderBy("updated_at", "desc")
			.limit(limit)
			.get();

		const posts = [];
		snapshot.forEach((doc) => {
			posts.push({ id: doc.id, ...doc.data() });
		});

		return posts;
	} catch (error) {
		throw new Error(`Error fetching recent posts: ${error.message}`);
	}
};

// Get most popular posts (sorted by readCount DESC)
const getMostPopularPosts = async (limit = 6) => {
	try {
		const snapshot = await db.collection(POSTS_COLLECTION)
			.orderBy("readCount", "desc")
			.limit(limit)
			.get();
		
		const posts = [];
		snapshot.forEach(doc => {
			posts.push({ id: doc.id, ...doc.data() });
		});
		
		return posts;
	} catch (error) {
		throw new Error(`Error fetching popular posts: ${error.message}`);
	}
};

// Get pinned posts
const getPinnedPosts = async (limit = 3) => {
	try {
		let query = db.collection(POSTS_COLLECTION).where("is_pinned", "==", true);

		if (limit) {
			query = query.limit(limit);
		}

		const snapshot = await query.get();
		const posts = [];

		snapshot.forEach((doc) => {
			posts.push({ id: doc.id, ...doc.data() });
		});

		return posts;
	} catch (error) {
		throw new Error(`Error fetching pinned posts: ${error.message}`);
	}
};

// Get posts by category
const getPostsByCategory = async (category, limit = 6) => {
	try {
		let query = db.collection(POSTS_COLLECTION).where("category", "==", category);

		if (limit) {
			query = query.limit(limit);
		}

		const snapshot = await query.get();
		const posts = [];

		snapshot.forEach((doc) => {
			posts.push({ id: doc.id, ...doc.data() });
		});

		return posts;
	} catch (error) {
		throw new Error(`Error fetching posts by category: ${error.message}`);
	}
};

// Get posts by author
const getPostsByAuthor = async (author_id, limit = 6) => {
	try {
		let query = db.collection(POSTS_COLLECTION).where("author_id", "==", author_id);

		if (limit) {
			query = query.limit(limit);
		}

		const snapshot = await query.get();
		const posts = [];

		snapshot.forEach((doc) => {
			posts.push({ id: doc.id, ...doc.data() });
		});

		return posts;
	} catch (error) {
		throw new Error(`Error fetching posts by author: ${error.message}`);
	}
};

// Get posts by course
const getPostsByCourse = async (course_id, limit = 6) => {
	try {
		let query = db.collection(POSTS_COLLECTION).where("course_id", "==", course_id);

		if (limit) {
			query = query.limit(limit);
		}

		const snapshot = await query.get();
		const posts = [];

		snapshot.forEach((doc) => {
			posts.push({ id: doc.id, ...doc.data() });
		});

		return posts;
	} catch (error) {
		throw new Error(`Error fetching posts by course: ${error.message}`);
	}
};

// Search posts
const searchPosts = async (searchTerm, limit = 10) => {
	try {
		// Simple search in title and content
		// Note: For better search, consider using Algolia or similar service
		let query = db.collection(POSTS_COLLECTION);

		if (limit) {
			query = query.limit(limit);
		}

		const snapshot = await query.get();
		const posts = [];

		snapshot.forEach((doc) => {
			const data = doc.data();
			const searchLower = searchTerm.toLowerCase();

			if (
				data.title?.toLowerCase().includes(searchLower) ||
				data.content?.toLowerCase().includes(searchLower)
			) {
				posts.push({ id: doc.id, ...data });
			}
		});

		return posts;
	} catch (error) {
		throw new Error(`Error searching posts: ${error.message}`);
	}
};

// Get post by ID
const getPostById = async (id) => {
	try {
		const doc = await db.collection(POSTS_COLLECTION).doc(id).get();

		if (!doc.exists) {
			throw new Error("Post not found");
		}

		return { id: doc.id, ...doc.data() };
	} catch (error) {
		throw new Error(`Error fetching post by ID: ${error.message}`);
	}
};

// Increment post read count
const incrementPostReadCount = async (id) => {
	try {
		const docRef = db.collection(POSTS_COLLECTION).doc(id);
		
		// Use transaction to ensure atomic increment
		await db.runTransaction(async (transaction) => {
			const doc = await transaction.get(docRef);
			
			if (!doc.exists) {
				throw new Error("Post not found");
			}
			
			const currentReadCount = doc.data().readCount || 0;
			transaction.update(docRef, {
				readCount: currentReadCount + 1
			});
		});
		
		return { success: true };
	} catch (error) {
		throw new Error(`Error incrementing read count: ${error.message}`);
	}
};

// Toggle post pin status
const togglePostPin = async (id) => {
	try {
		const docRef = db.collection(POSTS_COLLECTION).doc(id);
		const doc = await docRef.get();

		if (!doc.exists) {
			throw new Error("Post not found");
		}

		const currentPinStatus = doc.data().is_pinned || false;
		await docRef.update({
			is_pinned: !currentPinStatus,
			updated_at: admin.firestore.FieldValue.serverTimestamp(),
		});

		const updatedDoc = await docRef.get();
		return { id: updatedDoc.id, ...updatedDoc.data() };
	} catch (error) {
		throw new Error(`Error toggling pin status: ${error.message}`);
	}
};

// Create new post
const createPost = async (postData) => {
	try {
		const timestamp = admin.firestore.FieldValue.serverTimestamp();
		const newPost = {
			...postData,
			readCount: 0, // Initialize readCount to 0 for new posts
			is_pinned: false,
			created_at: timestamp,
			updated_at: timestamp
		};
		
		const docRef = await db.collection(POSTS_COLLECTION).add(newPost);
		const doc = await docRef.get();
		
		return { id: doc.id, ...doc.data() };
	} catch (error) {
		throw new Error(`Error creating post: ${error.message}`);
	}
};

// Update post
const updatePost = async (id, updateData) => {
	try {
		const docRef = db.collection(POSTS_COLLECTION).doc(id);

		await docRef.update({
			...updateData,
			updated_at: admin.firestore.FieldValue.serverTimestamp(),
		});

		const doc = await docRef.get();
		return { id: doc.id, ...doc.data() };
	} catch (error) {
		throw new Error(`Error updating post: ${error.message}`);
	}
};

// Delete post
const deletePost = async (id) => {
	try {
		await db.collection(POSTS_COLLECTION).doc(id).delete();
		return { success: true };
	} catch (error) {
		throw new Error(`Error deleting post: ${error.message}`);
	}
};

module.exports = {
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
	togglePostPin,
	createPost,
	updatePost,
	deletePost,
};
