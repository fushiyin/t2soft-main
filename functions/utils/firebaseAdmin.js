const admin = require("firebase-admin");

// Check if Firebase Admin is already initialized
if (!admin.apps.length) {
	// For Firebase Functions environment
	if (process.env.FUNCTIONS_EMULATOR) {
		// When running in emulator
		admin.initializeApp({
			projectId: "trading-76356",
		});
	} else {
		// For production or when service account key is available
		try {
			const serviceAccount = require("../../serviceAccountKey.json");
			admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
				projectId: "trading-76356",
			});
		} catch (error) {
			// Fallback to default credentials (for deployed functions)
			admin.initializeApp();
		}
	}
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };