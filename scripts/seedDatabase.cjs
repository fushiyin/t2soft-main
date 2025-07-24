#!/usr/bin/env node

/**
 * Firebase Database Seeder
 * 
 * This script populates your Firebase collections with dummy data for development.
 * 
 * Usage:
 * - Seed all collections: node scripts/seedDatabase.js
 * - Seed specific collection: node scripts/seedDatabase.js --collection courses
 * - Reset and seed: node scripts/seedDatabase.js --reset
 */

require("dotenv").config();
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

// Import seeders
const { seedCourses } = require("./seeders/courseSeeder.cjs");
const { seedPosts } = require("./seeders/postSeeder.cjs");
const { seedUsers: seedAuthUsers } = require("./seeders/authUserSeeder.cjs");
const { seedEnrollments } = require("./seeders/enrollmentSeeder.cjs");
const { seedCategories } = require("./seeders/categorySeeder.cjs");
const { seedDocuments } = require("./seeders/documentSeeder.cjs");

// Initialize Firebase Admin
let serviceAccount;
try {
	serviceAccount = require("../serviceAccountKey.json");
} catch (error) {
	console.error("❌ Service account key not found. Please ensure serviceAccountKey.json exists.");
	process.exit(1);
}

if (!initializeApp.length) {
	initializeApp({
		credential: cert(serviceAccount),
		projectId: "trading-76356",
	});
}

const db = getFirestore();

// Available collections to seed
const SEEDERS = {
	categories: seedCategories,
	courses: seedCourses,
	posts: seedPosts,
	users: seedAuthUsers,
	enrollments: seedEnrollments,
	documents: seedDocuments,
};

// Parse command line arguments
const args = process.argv.slice(2);
const shouldReset = args.includes("--reset");
const collectionFlag = args.indexOf("--collection");
const specificCollection = collectionFlag !== -1 ? args[collectionFlag + 1] : null;

async function clearCollection(collectionName) {
	console.log(`🗑️ Clearing ${collectionName} collection...`);
	
	const snapshot = await db.collection(collectionName).get();
	const batch = db.batch();
	
	snapshot.docs.forEach((doc) => {
		batch.delete(doc.ref);
	});
	
	if (!snapshot.empty) {
		await batch.commit();
		console.log(`✅ Cleared ${snapshot.size} documents from ${collectionName}`);
	} else {
		console.log(`ℹ️ ${collectionName} collection was already empty`);
	}
}

async function seedDatabase() {
	console.log("🌱 Starting database seeding process...\n");
	
	try {
		const collectionsToSeed = specificCollection 
			? [specificCollection]
			: Object.keys(SEEDERS);
		
		// Reset collections if requested
		if (shouldReset) {
			console.log("🔄 Resetting collections...\n");
			for (const collection of collectionsToSeed) {
				await clearCollection(collection);
			}
			console.log("✅ Reset complete!\n");
		}
		
		// Seed collections in order (categories first, then others)
		const orderedCollections = ["categories", "courses", "users", "posts", "enrollments", "documents"];
		const collectionsToRun = orderedCollections.filter(c => collectionsToSeed.includes(c));
		
		for (const collection of collectionsToRun) {
			if (SEEDERS[collection]) {
				await SEEDERS[collection]();
				console.log(""); // Add spacing
			}
		}
		
		console.log("🎉 Database seeding completed successfully!");
		console.log("\n📊 Seeded Collections:");
		collectionsToRun.forEach(collection => {
			console.log(`   ✓ ${collection}`);
		});
		
		console.log("\n🔗 Access your data:");
		console.log("   • Firebase Console: https://console.firebase.google.com/");
		console.log("   • Local Emulator UI: http://localhost:4000");
		console.log("   • Firestore Emulator: http://localhost:8080");
		
	} catch (error) {
		console.error("❌ Error during seeding:", error);
		process.exit(1);
	}
}

// Help text
function showHelp() {
	console.log(`
🌱 Firebase Database Seeder

Usage:
  node scripts/seedDatabase.js                    Seed all collections
  node scripts/seedDatabase.js --collection posts  Seed specific collection
  node scripts/seedDatabase.js --reset            Clear and reseed all collections

Available collections:
  ${Object.keys(SEEDERS).map(c => `• ${c}`).join("\n  ")}

Options:
  --collection <name>  Seed only the specified collection
  --reset             Clear existing data before seeding
  --help              Show this help message

Examples:
  node scripts/seedDatabase.js --collection courses
  node scripts/seedDatabase.js --reset --collection posts
	`);
}

// Main execution
if (args.includes("--help")) {
	showHelp();
} else {
	seedDatabase()
		.then(() => process.exit(0))
		.catch((error) => {
			console.error("Fatal error:", error);
			process.exit(1);
		});
}
