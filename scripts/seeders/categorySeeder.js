const { db } = require("../utils/firebaseAdmin");
const { faker } = require("@faker-js/faker");

// Generate category data
function generateCategories() {
	const categories = [
		{
			id: "crypto",
			name: "Cryptocurrency",
			description: "Learn about digital currencies, blockchain technology, and crypto trading",
			icon: "🪙",
			color: "#F59E0B",
			courseCount: 12,
			isActive: true,
			featured: true,
			order: 1,
		},
		{
			id: "trading",
			name: "Trading",
			description: "Master trading strategies, technical analysis, and market psychology",
			icon: "📈",
			color: "#10B981",
			courseCount: 8,
			isActive: true,
			featured: true,
			order: 2,
		},
		{
			id: "defi",
			name: "DeFi",
			description: "Explore decentralized finance protocols and yield farming",
			icon: "🏦",
			color: "#8B5CF6",
			courseCount: 6,
			isActive: true,
			featured: true,
			order: 3,
		},
		{
			id: "nft",
			name: "NFT",
			description: "Create, mint, and trade non-fungible tokens",
			icon: "🎨",
			color: "#EF4444",
			courseCount: 4,
			isActive: true,
			featured: false,
			order: 4,
		},
		{
			id: "programming",
			name: "Programming",
			description: "Build trading bots and blockchain applications",
			icon: "💻",
			color: "#3B82F6",
			courseCount: 10,
			isActive: true,
			featured: true,
			order: 5,
		},
		{
			id: "analysis",
			name: "Market Analysis",
			description: "Technical and fundamental analysis techniques",
			icon: "📊",
			color: "#06B6D4",
			courseCount: 7,
			isActive: true,
			featured: false,
			order: 6,
		},
	];

	return categories.map(category => ({
		...category,
		created_at: faker.date.past({ years: 1 }),
		updated_at: faker.date.recent({ days: 30 }),
	}));
}

async function seedCategories() {
	console.log("🗂️ Seeding categories collection...");
	
	try {
		const categories = generateCategories();
		const batch = db.batch();
		
		for (const category of categories) {
			const categoryRef = db.collection("categories").doc(category.id);
			batch.set(categoryRef, category);
		}
		
		await batch.commit();
		console.log(`✅ Successfully seeded ${categories.length} categories`);
		
	} catch (error) {
		console.error("❌ Error seeding categories:", error);
		throw error;
	}
}

module.exports = { seedCategories, generateCategories };
