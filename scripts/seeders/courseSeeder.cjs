const { db } = require("../utils/firebaseAdmin.cjs");

const coursesData = [
	{
		id: "crypto-basics",
		title: "Cryptocurrency Fundamentals",
		description: "Learn the basics of cryptocurrency, blockchain technology, and digital assets.",
		category: "Crypto",
		level: "Beginner",
		duration: "4 weeks",
		price: 299.99,
		instructor: "John Smith",
		image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400",
		rating: 4.8,
		enrollments: 1250,
		lessons: [
			{
				id: "lesson-1",
				title: "What is Cryptocurrency?",
				duration: "15 min",
				type: "video"
			},
			{
				id: "lesson-2", 
				title: "Understanding Blockchain",
				duration: "20 min",
				type: "video"
			},
			{
				id: "lesson-3",
				title: "Bitcoin vs Altcoins",
				duration: "18 min",
				type: "video"
			}
		],
		skills: ["Blockchain", "Bitcoin", "Cryptocurrency", "Digital Wallets"],
		status: "published",
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: "trading-strategies",
		title: "Advanced Trading Strategies",
		description: "Master professional trading techniques and risk management strategies.",
		category: "Trading",
		level: "Advanced",
		duration: "8 weeks",
		price: 599.99,
		instructor: "Sarah Johnson",
		image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
		rating: 4.9,
		enrollments: 890,
		lessons: [
			{
				id: "lesson-1",
				title: "Technical Analysis Deep Dive",
				duration: "30 min",
				type: "video"
			},
			{
				id: "lesson-2",
				title: "Risk Management Principles",
				duration: "25 min",
				type: "video"
			},
			{
				id: "lesson-3",
				title: "Portfolio Diversification",
				duration: "22 min",
				type: "video"
			}
		],
		skills: ["Technical Analysis", "Risk Management", "Portfolio Management", "Market Psychology"],
		status: "published",
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: "defi-protocols",
		title: "DeFi Protocols and Yield Farming",
		description: "Explore decentralized finance protocols and learn about yield farming strategies.",
		category: "DeFi",
		level: "Intermediate",
		duration: "6 weeks",
		price: 449.99,
		instructor: "Mike Chen",
		image: "https://images.unsplash.com/photo-1640340434855-6084b1f4901c?w=400",
		rating: 4.7,
		enrollments: 675,
		lessons: [
			{
				id: "lesson-1",
				title: "Introduction to DeFi",
				duration: "20 min",
				type: "video"
			},
			{
				id: "lesson-2",
				title: "Liquidity Pools Explained",
				duration: "28 min",
				type: "video"
			},
			{
				id: "lesson-3",
				title: "Yield Farming Strategies",
				duration: "35 min",
				type: "video"
			}
		],
		skills: ["DeFi", "Yield Farming", "Liquidity Pools", "Smart Contracts"],
		status: "published",
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: "nft-marketplace",
		title: "NFT Creation and Trading",
		description: "Learn how to create, mint, and trade NFTs on various marketplaces.",
		category: "NFT",
		level: "Beginner",
		duration: "3 weeks",
		price: 199.99,
		instructor: "Emily Davis",
		image: "https://images.unsplash.com/photo-1640161704729-cbe966a08476?w=400",
		rating: 4.6,
		enrollments: 980,
		lessons: [
			{
				id: "lesson-1",
				title: "What are NFTs?",
				duration: "12 min",
				type: "video"
			},
			{
				id: "lesson-2",
				title: "Creating Your First NFT",
				duration: "25 min",
				type: "hands-on"
			},
			{
				id: "lesson-3",
				title: "NFT Marketplace Strategies",
				duration: "18 min",
				type: "video"
			}
		],
		skills: ["NFTs", "Digital Art", "Marketplace Trading", "Smart Contracts"],
		status: "published",
		created_at: new Date(),
		updated_at: new Date()
	},
	{
		id: "algorithmic-trading",
		title: "Algorithmic Trading with Python",
		description: "Build automated trading systems using Python and popular trading APIs.",
		category: "Programming",
		level: "Advanced",
		duration: "10 weeks",
		price: 799.99,
		instructor: "Alex Rodriguez",
		image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
		rating: 4.9,
		enrollments: 445,
		lessons: [
			{
				id: "lesson-1",
				title: "Python for Trading",
				duration: "40 min",
				type: "coding"
			},
			{
				id: "lesson-2",
				title: "API Integration",
				duration: "35 min",
				type: "coding"
			},
			{
				id: "lesson-3",
				title: "Building Trading Bots",
				duration: "45 min",
				type: "project"
			}
		],
		skills: ["Python", "API Integration", "Algorithmic Trading", "Data Analysis"],
		status: "published",
		created_at: new Date(),
		updated_at: new Date()
	}
];

async function seedCourses() {
	console.log('🎓 Seeding courses collection...');
	
	try {
		const batch = db.batch();
		
		for (const course of coursesData) {
			const courseRef = db.collection('courses').doc(course.id);
			batch.set(courseRef, course);
		}
		
		await batch.commit();
		console.log(`✅ Successfully seeded ${coursesData.length} courses`);
		
	} catch (error) {
		console.error('❌ Error seeding courses:', error);
		throw error;
	}
}

module.exports = { seedCourses, coursesData };
