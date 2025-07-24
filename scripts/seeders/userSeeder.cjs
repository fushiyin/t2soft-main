const { db } = require("../utils/firebaseAdmin.cjs");
const { faker } = require("@faker-js/faker");

// Generate user data
function generateUsers(count = 15) {
	const users = [];
	const roles = ["student", "instructor", "admin"];
	
	for (let i = 0; i < count; i++) {
		const firstName = faker.person.firstName();
		const lastName = faker.person.lastName();
		const email = faker.internet.email({ firstName, lastName });
		const id = faker.string.uuid();
		
		users.push({
			id,
			uid: id, // Firebase Auth UID
			email,
			firstName,
			lastName,
			displayName: `${firstName} ${lastName}`,
			avatar: faker.image.avatar(),
			bio: faker.lorem.paragraph(),
			role: faker.helpers.arrayElement(roles),
			isActive: faker.datatype.boolean(0.9), // 90% active users
			emailVerified: faker.datatype.boolean(0.8), // 80% verified emails
			phone: faker.phone.number(),
			location: {
				country: faker.location.country(),
				city: faker.location.city(),
				timezone: faker.location.timeZone(),
			},
			preferences: {
				newsletter: faker.datatype.boolean(0.6),
				notifications: faker.datatype.boolean(0.8),
				language: faker.helpers.arrayElement(["en", "es", "fr", "de", "zh"]),
				theme: faker.helpers.arrayElement(["light", "dark", "auto"]),
			},
			social: {
				twitter: faker.helpers.maybe(() => `@${faker.internet.userName()}`, { probability: 0.4 }),
				linkedin: faker.helpers.maybe(() => faker.internet.url(), { probability: 0.3 }),
				github: faker.helpers.maybe(() => `@${faker.internet.userName()}`, { probability: 0.2 }),
			},
			stats: {
				coursesEnrolled: faker.number.int({ min: 0, max: 10 }),
				coursesCompleted: faker.number.int({ min: 0, max: 5 }),
				totalWatchTime: faker.number.int({ min: 0, max: 5000 }), // minutes
				streak: faker.number.int({ min: 0, max: 30 }), // days
			},
			lastLogin: faker.date.recent({ days: 30 }),
			created_at: faker.date.past({ years: 2 }),
			updated_at: faker.date.recent({ days: 7 }),
		});
	}
	
	// Add a default admin user
	users.push({
		id: "admin-user",
		uid: "admin-user",
		email: "admin@t2soft.com",
		firstName: "Admin",
		lastName: "User",
		displayName: "Admin User",
		avatar: "https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff",
		bio: "System administrator",
		role: "admin",
		isActive: true,
		emailVerified: true,
		phone: "+1-555-0123",
		location: {
			country: "United States",
			city: "San Francisco",
			timezone: "America/Los_Angeles",
		},
		preferences: {
			newsletter: true,
			notifications: true,
			language: "en",
			theme: "dark",
		},
		social: {
			twitter: "@t2soft",
			linkedin: "https://linkedin.com/company/t2soft",
			github: "@t2soft",
		},
		stats: {
			coursesEnrolled: 0,
			coursesCompleted: 0,
			totalWatchTime: 0,
			streak: 0,
		},
		lastLogin: new Date(),
		created_at: new Date("2023-01-01"),
		updated_at: new Date(),
	});
	
	return users;
}

async function seedUsers() {
	console.log("👥 Seeding users collection...");
	
	try {
		const users = generateUsers(20);
		const batch = db.batch();
		
		for (const user of users) {
			const userRef = db.collection("users").doc(user.id);
			batch.set(userRef, user);
		}
		
		await batch.commit();
		console.log(`✅ Successfully seeded ${users.length} users`);
		
	} catch (error) {
		console.error("❌ Error seeding users:", error);
		throw error;
	}
}

module.exports = { seedUsers, generateUsers };
