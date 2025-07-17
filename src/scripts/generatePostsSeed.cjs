// Usage: node src/scripts/generatePostsSeed.cjs
// Make sure you have a Firebase service account key and set GOOGLE_APPLICATION_CREDENTIALS env var
require("dotenv").config();
const { initializeApp, applicationDefault, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { v4: uuidv4 } = require("uuid");
const faker = require("faker");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin
initializeApp({
	credential: cert(serviceAccount),
	projectId: "trading-76356",
});

const db = getFirestore();

async function seedPosts() {
	const batch = db.batch();
	for (let i = 0; i < 15; i++) {
		const id = uuidv4();
		const now = new Date();
		batch.set(db.collection("posts").doc(id), {
			id,
			author_id: "admin",
			content: faker.lorem.paragraphs(2),
			course_id: "",
			created_at: now,
			updated_at: now,
			is_pinned: Math.random() < 0.2, // 20% pinned
			title: faker.lorem.sentence(),
			type: null,
		});
	}
	await batch.commit();
	console.log("Dummy posts seeded to Firestore!");
}

seedPosts().catch(console.error);
