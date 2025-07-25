const { db, admin } = require("../utils/firebaseAdmin");

async function getAllDocuments() {
	try {
		const snapshot = await db.collection("documents").get();
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error("Error fetching documents:", error);
		throw error;
	}
}

async function getDocumentsByCategory(category) {
	try {
		const snapshot = await db.collection("documents").where("category", "==", category).get();
		return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
	} catch (error) {
		console.error("Error fetching documents by category:", error);
		throw error;
	}
}

async function getDocumentById(id) {
	try {
		const doc = await db.collection("documents").doc(id).get();
		if (!doc.exists) {
			throw new Error("Document not found");
		}
		return { id: doc.id, ...doc.data() };
	} catch (error) {
		console.error("Error fetching document by ID:", error);
		throw error;
	}
}

async function searchDocuments(searchTerm) {
	try {
		const snapshot = await db.collection("documents").get();
		const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

		// Client-side filtering since Firestore doesn't support full-text search
		return docs.filter(
			(doc) =>
				doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
				doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
				doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())),
		);
	} catch (error) {
		console.error("Error searching documents:", error);
		throw error;
	}
}

async function incrementDownloadCount(id) {
	try {
		const docRef = db.collection("documents").doc(id);
		await db.runTransaction(async (transaction) => {
			const doc = await transaction.get(docRef);
			if (!doc.exists) {
				throw new Error("Document not found");
			}
			const newDownloadCount = (doc.data().downloadCount || 0) + 1;
			transaction.update(docRef, { downloadCount: newDownloadCount });
		});
	} catch (error) {
		console.error("Error incrementing download count:", error);
		throw error;
	}
}

module.exports = {
	getAllDocuments,
	getDocumentsByCategory,
	getDocumentById,
	searchDocuments,
	incrementDownloadCount,
};
