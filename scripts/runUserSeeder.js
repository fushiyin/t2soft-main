const { seedUsers } = require("./seeders/authUserSeeder");

async function runUserSeeder() {
	try {
		console.log("🚀 Starting User Seeder for TradeMaster...");
		console.log("=".repeat(50));
		
		// Seed users with both test accounts and random users
		const results = await seedUsers({
			includeTestUsers: true,    // Create predefined test accounts
			includeRandomUsers: true,  // Create random user accounts
			randomUserCount: 15,       // Number of random users to create
		});
		
		console.log("\n" + "=".repeat(50));
		console.log("🎉 User seeding completed successfully!");
		console.log("\n📋 What was created:");
		console.log("• Firebase Auth users (with email/password authentication)");
		console.log("• Firestore user documents (with profile data)");
		console.log("• Test accounts ready for development");
		
		console.log("\n🔐 Ready-to-use test accounts:");
		console.log("┌─────────────────────────────────────────────────────────┐");
		console.log("│  Email                 │  Password      │  Role         │");
		console.log("├─────────────────────────────────────────────────────────┤");
		console.log("│  admin@t2soft.com      │  Admin123!     │  admin        │");
		console.log("│  test@example.com      │  Test123!      │  student      │");
		console.log("│  instructor@t2soft.com │  Instructor123!│  instructor   │");
		console.log("│  student@example.com   │  Student123!   │  student      │");
		console.log("│  demo@t2soft.com       │  Demo123!      │  student      │");
		console.log("└─────────────────────────────────────────────────────────┘");
		
		console.log("\n✨ You can now test the authentication system!");
		console.log("🌐 Visit: http://localhost:5174/user-login");
		
		process.exit(0);
		
	} catch (error) {
		console.error("\n❌ Error running user seeder:", error.message);
		process.exit(1);
	}
}

// Run the seeder if this script is executed directly
if (require.main === module) {
	runUserSeeder();
}

module.exports = { runUserSeeder };
