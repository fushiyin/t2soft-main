const { auth, db } = require("../utils/firebaseAdmin.cjs");
const { faker } = require("@faker-js/faker");

// Predefined test users for authentication testing
const TEST_USERS = [
	{
		email: "admin@t2soft.com",
		password: "Admin123!",
		displayName: "Admin User",
		firstName: "Admin",
		lastName: "User",
		role: "admin",
		isActive: true,
		emailVerified: true,
		bio: "System administrator with full access to all features.",
		avatar: "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff",
	},
	{
		email: "test@example.com",
		password: "Test123!",
		displayName: "Test User",
		firstName: "Test",
		lastName: "User",
		role: "student",
		isActive: true,
		emailVerified: true,
		bio: "Test user account for development and testing.",
		avatar: "https://ui-avatars.com/api/?name=Test+User&background=28a745&color=fff",
	},
	{
		email: "instructor@t2soft.com",
		password: "Instructor123!",
		displayName: "John Instructor",
		firstName: "John",
		lastName: "Instructor",
		role: "instructor",
		isActive: true,
		emailVerified: true,
		bio: "Experienced instructor with expertise in trading and finance.",
		avatar: "https://ui-avatars.com/api/?name=John+Instructor&background=6f42c1&color=fff",
	},
	{
		email: "student@example.com",
		password: "Student123!",
		displayName: "Jane Student",
		firstName: "Jane",
		lastName: "Student",
		role: "student",
		isActive: true,
		emailVerified: false,
		bio: "Beginner student learning about trading fundamentals.",
		avatar: "https://ui-avatars.com/api/?name=Jane+Student&background=dc3545&color=fff",
	},
	{
		email: "demo@t2soft.com",
		password: "Demo123!",
		displayName: "Demo User",
		firstName: "Demo",
		lastName: "User",
		role: "student",
		isActive: true,
		emailVerified: true,
		bio: "Demo account for showcasing platform features.",
		avatar: "https://ui-avatars.com/api/?name=Demo+User&background=fd7e14&color=fff",
	},
];

// Generate random users
function generateRandomUsers(count = 15) {
	const users = [];
	const roles = ["student", "instructor"];
	const domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "t2soft.com"];
	
	for (let i = 0; i < count; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const domain = faker.helpers.arrayElement(domains);
		const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
		
		users.push({
			email,
			password: "Password123!",
			displayName: `${firstName} ${lastName}`,
			firstName,
			lastName,
			role: faker.helpers.arrayElement(roles),
			isActive: faker.datatype.boolean(0.9),
			emailVerified: faker.datatype.boolean(0.7),
			bio: faker.lorem.paragraph(),
			avatar: faker.image.avatar(),
		});
	}
	
	return users;
}

// Create Firebase Auth user
async function createAuthUser(userData) {
	try {
		const userRecord = await auth.createUser({
			email: userData.email,
			password: userData.password,
			displayName: userData.displayName,
			emailVerified: userData.emailVerified,
			disabled: !userData.isActive,
		});

		console.log(`✅ Created Auth user: ${userData.email} (${userRecord.uid})`);
		return userRecord;
	} catch (error) {
		if (error.code === "auth/email-already-exists") {
			console.log(`⚠️  Auth user already exists: ${userData.email}`);
			// Get existing user
			const existingUser = await auth.getUserByEmail(userData.email);
			return existingUser;
		} else {
			console.error(`❌ Error creating Auth user ${userData.email}:`, error.message);
			throw error;
		}
	}
}

// Create Firestore user document
async function createFirestoreUser(authUser, userData) {
	try {
		const userDoc = {
			uid: authUser.uid,
			email: userData.email,
			firstName: userData.firstName,
			lastName: userData.lastName,
			displayName: userData.displayName,
			avatar: userData.avatar,
			bio: userData.bio,
			role: userData.role,
			isActive: userData.isActive,
			emailVerified: userData.emailVerified,
			phone: userData.phone || null,
			location: {
				country: faker.location.country(),
				city: faker.location.city(),
				timezone: faker.location.timeZone(),
			},
			preferences: {
				newsletter: faker.datatype.boolean(0.6),
				notifications: faker.datatype.boolean(0.8),
				language: faker.helpers.arrayElement(["en", "ko", "vi"]),
				theme: faker.helpers.arrayElement(["light", "dark", "auto"]),
			},
			social: {
				twitter: faker.helpers.maybe(() => `@${faker.internet.userName()}`, {
					probability: 0.3,
				}),
				linkedin: faker.helpers.maybe(() => faker.internet.url(), { probability: 0.3 }),
				github: faker.helpers.maybe(() => `@${faker.internet.userName()}`, {
					probability: 0.2,
				}),
			},
			stats: {
				coursesEnrolled: faker.number.int({ min: 0, max: 8 }),
				coursesCompleted: faker.number.int({ min: 0, max: 5 }),
				totalWatchTime: faker.number.int({ min: 0, max: 3000 }),
				streak: faker.number.int({ min: 0, max: 25 }),
			},
			lastLogin: faker.date.recent({ days: 15 }),
			createdAt: new Date(),
			updatedAt: new Date(),
		};

		await db.collection("users").doc(authUser.uid).set(userDoc);
		console.log(`✅ Created Firestore document for: ${userData.email}`);
		return userDoc;
	} catch (error) {
		console.error(`❌ Error creating Firestore user ${userData.email}:`, error.message);
		throw error;
	}
}

// Seed test users (predefined accounts)
async function seedTestUsers() {
	console.log("👥 Seeding test users...");
	
	const results = [];
	
	for (const userData of TEST_USERS) {
		try {
			const authUser = await createAuthUser(userData);
			const firestoreUser = await createFirestoreUser(authUser, userData);
			
			results.push({
				auth: authUser,
				firestore: firestoreUser,
				credentials: {
					email: userData.email,
					password: userData.password,
				},
			});
		} catch (error) {
			console.error(`❌ Failed to seed user: ${userData.email}`, error.message);
		}
	}
	
	console.log(`✅ Successfully seeded ${results.length} test users`);
	return results;
}

// Seed random users
async function seedRandomUsers(count = 10) {
	console.log(`👥 Seeding ${count} random users...`);
	
	const randomUsers = generateRandomUsers(count);
	const results = [];
	
	for (const userData of randomUsers) {
		try {
			const authUser = await createAuthUser(userData);
			const firestoreUser = await createFirestoreUser(authUser, userData);
			
			results.push({
				auth: authUser,
				firestore: firestoreUser,
			});
		} catch (error) {
			console.error(`❌ Failed to seed random user: ${userData.email}`, error.message);
		}
	}
	
	console.log(`✅ Successfully seeded ${results.length} random users`);
	return results;
}

// Main seeder function
async function seedUsers(options = {}) {
	const { includeTestUsers = true, includeRandomUsers = true, randomUserCount = 10 } = options;
	
	console.log("🚀 Starting user seeding process...");
	
	try {
		const results = {
			testUsers: [],
			randomUsers: [],
		};
		
		if (includeTestUsers) {
			results.testUsers = await seedTestUsers();
		}
		
		if (includeRandomUsers) {
			results.randomUsers = await seedRandomUsers(randomUserCount);
		}
		
		console.log("\n📊 Seeding Summary:");
		console.log(`• Test users: ${results.testUsers.length}`);
		console.log(`• Random users: ${results.randomUsers.length}`);
		console.log(`• Total users: ${results.testUsers.length + results.randomUsers.length}`);
		
		if (results.testUsers.length > 0) {
			console.log("\n🔑 Test User Credentials:");
			results.testUsers.forEach((user) => {
				console.log(`• ${user.credentials.email} / ${user.credentials.password}`);
			});
		}
		
		return results;
	} catch (error) {
		console.error("❌ Error in user seeding process:", error);
		throw error;
	}
}

// Clean up users (for development)
async function cleanupUsers() {
	console.log("🧹 Cleaning up users...");
	
	try {
		// Delete Firestore users
		const usersSnapshot = await db.collection("users").get();
		const batch = db.batch();
		
		usersSnapshot.docs.forEach((doc) => {
			batch.delete(doc.ref);
		});
		
		await batch.commit();
		console.log(`✅ Deleted ${usersSnapshot.size} Firestore user documents`);
		
		// Note: Firebase Auth users need to be deleted individually
		// This is more complex and should be done carefully in production
		console.log("⚠️  Firebase Auth users need manual cleanup");
	} catch (error) {
		console.error("❌ Error cleaning up users:", error);
		throw error;
	}
}

module.exports = {
	seedUsers,
	seedTestUsers,
	seedRandomUsers,
	cleanupUsers,
	TEST_USERS,
};
