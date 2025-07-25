const express = require("express");
const {
	getAllDocuments,
	getDocumentsByCategory,
	getDocumentById,
	searchDocuments,
	incrementDownloadCount,
} = require("../services/documentService");

const router = express.Router();

// Get all documents
router.get("/", async (req, res) => {
	try {
		const { category, search } = req.query;

		let documents;
		if (search) {
			documents = await searchDocuments(search);
		} else if (category && category !== "All") {
			documents = await getDocumentsByCategory(category);
		} else {
			documents = await getAllDocuments();
		}

		res.json({ success: true, data: documents });
	} catch (error) {
		console.error("Error fetching documents:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

// Get document by ID
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const document = await getDocumentById(id);
		res.json({ success: true, data: document });
	} catch (error) {
		console.error("Error fetching document:", error);
		if (error.message === "Document not found") {
			res.status(404).json({ success: false, error: error.message });
		} else {
			res.status(500).json({ success: false, error: error.message });
		}
	}
});

// Increment download count
router.post("/:id/download", async (req, res) => {
	try {
		const { id } = req.params;
		await incrementDownloadCount(id);
		res.json({ success: true, message: "Download count incremented" });
	} catch (error) {
		console.error("Error incrementing download count:", error);
		res.status(500).json({ success: false, error: error.message });
	}
});

module.exports = router;
