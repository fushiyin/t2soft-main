const admin = require("firebase-admin");

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
	try {
		// Try to load service account key
		const serviceAccount = require("../../serviceAccountKey.json");
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
			projectId: "trading-76356",
		});
		console.log("🔥 Firebase Admin initialized with service account");
	} catch (error) {
		// Fallback to default credentials
		admin.initializeApp({
			projectId: "trading-76356",
		});
		console.log("🔥 Firebase Admin initialized with default credentials");
	}
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
