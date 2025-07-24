#!/usr/bin/env node

const { seedUsers } = require("./seeders/authUserSeeder.cjs");

async function runUserSeeder() {
	try {
		console.log("🚀 Starting User Seeder for TradeMaster...");
		console.log("=".repeat(50));
		
		// Seed users with both test accounts and random users
		await seedUsers({
			includeTestUsers: true, // Create predefined test accounts
			includeRandomUsers: true, // Create random user accounts
			randomUserCount: 15, // Number of random users to create
		});
		
		console.log("\n" + "=".repeat(50));
		console.log("🎉 User seeding completed successfully!");
		console.log("\n📋 What was created:");
		console.log("• Firebase Auth users (with email/password authentication)");
		console.log("• Firestore user documents (with profile data)");
		console.log("• Test accounts ready for development");
		
		console.log("\n🔑 Test Account Credentials:");
		console.log("• Admin: admin@t2soft.com / admin123");
		console.log("• Test User: test@example.com / test123");
		console.log("• Instructor: instructor@t2soft.com / instructor123");
		console.log("• Student: student@example.com / student123");
		console.log("• Demo: demo@t2soft.com / demo123");
		
		console.log("\n💡 Next steps:");
		console.log("• Start your development server");
		console.log("• Navigate to the login page");
		console.log("• Use any of the test accounts above");
		console.log("• Check Firebase Console for created users");
		
		process.exit(0);
	} catch (error) {
		console.error("❌ Error during user seeding:", error);
		process.exit(1);
	}
}

// Run the seeder if this file is executed directly
if (require.main === module) {
	runUserSeeder();
}

module.exports = { runUserSeeder };
