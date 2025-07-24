const admin = require("firebase-admin");
const serviceAccount = require("../serviceAccountKey.json");

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		projectId: "trading-76356",
	});
}

const db = admin.firestore();

async function checkAdminUser() {
	try {
		console.log("🔍 Checking admin user in Firestore...");

		// First, let's list all users to see what we have
		const usersSnapshot = await db.collection("users").get();
		console.log(`📊 Total users in collection: ${usersSnapshot.size}`);

		usersSnapshot.forEach((doc) => {
			const data = doc.data();
			console.log(`👤 User ${doc.id}:`, {
				email: data.email,
				role: data.role,
				roleType: typeof data.role,
				roleBytes: Buffer.from(data.role || "", "utf8"),
				roleLength: (data.role || "").length,
				rawData: JSON.stringify(data.role),
			});
		});

		// Check specifically for admin@t2soft.com
		const adminQuery = await db
			.collection("users")
			.where("email", "==", "admin@t2soft.com")
			.get();

		if (adminQuery.empty) {
			console.log("❌ No user found with email admin@t2soft.com");
		} else {
			adminQuery.forEach((doc) => {
				const data = doc.data();
				console.log("🔍 Admin user found:", {
					id: doc.id,
					email: data.email,
					role: data.role,
					roleType: typeof data.role,
					roleHex: Buffer.from(data.role || "", "utf8").toString("hex"),
					adminRoleHex: Buffer.from("admin", "utf8").toString("hex"),
					exactMatch: data.role === "admin",
					trimmedMatch: (data.role || "").trim() === "admin",
					fullData: data,
				});
			});
		}
	} catch (error) {
		console.error("🚨 Error checking admin user:", error);
	}
}

checkAdminUser()
	.then(() => {
		console.log("✅ Admin user check completed");
		process.exit(0);
	})
	.catch((error) => {
		console.error("❌ Error:", error);
		process.exit(1);
	});
