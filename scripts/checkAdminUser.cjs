const admin = require("firebase-admin");
const fs = require("fs");

// Initialize Firebase Admin SDK
const serviceAccount = JSON.parse(fs.readFileSync("./serviceAccountKey.json", "utf8"));

if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		projectId: "trading-76356",
	});
}

const auth = admin.auth();
const db = admin.firestore();

async function checkAdminUser() {
	try {
		console.log("🔍 Checking admin user...");
		
		// Check if admin user exists in Firebase Auth
		const adminEmail = "admin@t2soft.com";
		let authUser;
		try {
			authUser = await auth.getUserByEmail(adminEmail);
			console.log("✅ Admin user found in Firebase Auth:");
			console.log("  - UID:", authUser.uid);
			console.log("  - Email:", authUser.email);
			console.log("  - Email Verified:", authUser.emailVerified);
			console.log("  - Disabled:", authUser.disabled);
		} catch (error) {
			console.log("❌ Admin user not found in Firebase Auth:", error.message);
			return;
		}

		// Check if admin user profile exists in Firestore
		try {
			const userDoc = await db.collection("users").doc(authUser.uid).get();
			if (userDoc.exists) {
				const userData = userDoc.data();
				console.log("✅ Admin user profile found in Firestore:");
				console.log("  - Role:", userData.role);
				console.log("  - Active:", userData.isActive);
				console.log("  - Email Verified:", userData.emailVerified);
				console.log("  - Display Name:", userData.displayName);
			} else {
				console.log("❌ Admin user profile not found in Firestore");
				
				// Create admin profile if it doesn't exist
				console.log("🔧 Creating admin user profile...");
				const adminProfile = {
					uid: authUser.uid,
					email: authUser.email,
					firstName: "Admin",
					lastName: "User",
					displayName: "Admin User",
					avatar: `https://ui-avatars.com/api/?name=Admin+User&background=6366f1&color=ffffff`,
					bio: "System Administrator",
					role: "admin",
					isActive: true,
					emailVerified: true,
					phone: null,
					location: {
						country: null,
						city: null,
						timezone: "UTC",
					},
					preferences: {
						newsletter: false,
						notifications: true,
						language: "en",
						theme: "dark",
					},
					social: {
						twitter: null,
						linkedin: null,
						github: null,
					},
					stats: {
						coursesEnrolled: 0,
						coursesCompleted: 0,
						totalWatchTime: 0,
						streak: 0,
					},
					lastLogin: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				};

				await db.collection("users").doc(authUser.uid).set(adminProfile);
				console.log("✅ Admin user profile created successfully");
			}
		} catch (error) {
			console.log("❌ Error checking Firestore profile:", error.message);
		}

		// Update email verification in Firebase Auth if needed
		if (!authUser.emailVerified) {
			console.log("🔧 Updating email verification status...");
			await auth.updateUser(authUser.uid, {
				emailVerified: true,
			});
			console.log("✅ Email verification updated");
		}

		console.log("🎉 Admin user check completed successfully");
		
	} catch (error) {
		console.error("❌ Error:", error);
	}
}

checkAdminUser();
