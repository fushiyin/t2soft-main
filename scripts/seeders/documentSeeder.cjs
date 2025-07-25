const { db } = require("../utils/firebaseAdmin.cjs");
const { faker } = require("@faker-js/faker");

// Generate documents data
function generateDocuments(count = 30) {
	const categories = [
		"Crypto",
		"Trading",
		"DeFi",
		"NFT",
		"Technology",
		"Market Analysis",
		"Programming",
		"Finance",
		"Legal",
		"Compliance",
	];

	const documentTypes = [
		{ ext: "pdf", mime: "application/pdf" },
		{ ext: "doc", mime: "application/msword" },
		{
			ext: "docx",
			mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		},
		{ ext: "xls", mime: "application/vnd.ms-excel" },
		{ ext: "xlsx", mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" },
		{ ext: "ppt", mime: "application/vnd.ms-powerpoint" },
		{
			ext: "pptx",
			mime: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		},
		{ ext: "txt", mime: "text/plain" },
	];

	const documents = [];

	for (let i = 0; i < count; i++) {
		const category = faker.helpers.arrayElement(categories);
		const docType = faker.helpers.arrayElement(documentTypes);
		const title = faker.lorem.sentence({ min: 3, max: 8 }).replace(/\.$/, "");
		const fileName = `${title
			.toLowerCase()
			.replace(/\s+/g, "_")
			.replace(/[^a-z0-9_]/g, "")}.${docType.ext}`;
		const id = faker.string.uuid();

		documents.push({
			id,
			title,
			description: faker.lorem.paragraph({ min: 1, max: 3 }),
			category,
			fileName,
			fileUrl: `https://storage.googleapis.com/trading-76356.appspot.com/documents/${id}/${fileName}`,
			mimeType: docType.mime,
			fileSize: faker.number.int({ min: 1024, max: 10485760 }), // 1KB to 10MB
			downloadCount: faker.number.int({ min: 0, max: 500 }),
			isPublic: faker.datatype.boolean(0.7), // 70% public
			tags: faker.lorem.words(3).split(" "),
			author: faker.person.fullName(),
			version: faker.system.semver(),
			language: faker.helpers.arrayElement(["en", "es", "fr", "de", "zh"]),
			createAt: faker.date.past({ years: 2 }),
			updatedAt: faker.date.recent({ days: 30 }),
		});
	}

	return documents;
}

// Predefined sample documents with realistic data
const sampleDocuments = [
	{
		id: "bitcoin-whitepaper",
		title: "Bitcoin: A Peer-to-Peer Electronic Cash System",
		description:
			"The original Bitcoin whitepaper by Satoshi Nakamoto explaining the concept of a decentralized digital currency.",
		category: "Crypto",
		fileName: "bitcoin_whitepaper.pdf",
		fileUrl:
			"https://storage.googleapis.com/trading-76356.appspot.com/documents/bitcoin-whitepaper/bitcoin_whitepaper.pdf",
		mimeType: "application/pdf",
		fileSize: 184292,
		downloadCount: 1250,
		isPublic: true,
		tags: ["bitcoin", "cryptocurrency", "whitepaper", "satoshi"],
		author: "Satoshi Nakamoto",
		version: "1.0.0",
		language: "en",
		createAt: new Date("2008-10-31"),
		updatedAt: new Date("2008-10-31"),
	},
	{
		id: "defi-guide-2024",
		title: "DeFi Complete Guide 2024",
		description:
			"Comprehensive guide to Decentralized Finance protocols, yield farming strategies, and risk management in DeFi.",
		category: "DeFi",
		fileName: "defi_complete_guide_2024.pdf",
		fileUrl:
			"https://storage.googleapis.com/trading-76356.appspot.com/documents/defi-guide-2024/defi_complete_guide_2024.pdf",
		mimeType: "application/pdf",
		fileSize: 2458624,
		downloadCount: 890,
		isPublic: true,
		tags: ["defi", "yield-farming", "protocols", "guide"],
		author: "T2Soft Research Team",
		version: "2.1.0",
		language: "en",
		createAt: new Date("2024-01-15"),
		updatedAt: new Date("2024-12-01"),
	},
	{
		id: "trading-strategies-excel",
		title: "Advanced Trading Strategies Calculator",
		description:
			"Excel spreadsheet with formulas for calculating risk/reward ratios, position sizing, and technical indicators.",
		category: "Trading",
		fileName: "trading_strategies_calculator.xlsx",
		fileUrl:
			"https://storage.googleapis.com/trading-76356.appspot.com/documents/trading-strategies-excel/trading_strategies_calculator.xlsx",
		mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		fileSize: 1024576,
		downloadCount: 654,
		isPublic: false,
		tags: ["trading", "excel", "calculator", "strategies"],
		author: "Sarah Johnson",
		version: "3.2.1",
		language: "en",
		createAt: new Date("2024-03-10"),
		updatedAt: new Date("2024-11-15"),
	},
	{
		id: "nft-market-analysis",
		title: "NFT Market Analysis Q4 2024",
		description:
			"Detailed analysis of NFT market trends, top collections performance, and future predictions for the digital collectibles space.",
		category: "NFT",
		fileName: "nft_market_analysis_q4_2024.pptx",
		fileUrl:
			"https://storage.googleapis.com/trading-76356.appspot.com/documents/nft-market-analysis/nft_market_analysis_q4_2024.pptx",
		mimeType: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
		fileSize: 5242880,
		downloadCount: 423,
		isPublic: true,
		tags: ["nft", "market-analysis", "trends", "collectibles"],
		author: "Mike Chen",
		version: "1.3.0",
		language: "en",
		createAt: new Date("2024-10-01"),
		updatedAt: new Date("2024-12-20"),
	},
	{
		id: "compliance-checklist",
		title: "Crypto Trading Compliance Checklist",
		description:
			"Essential compliance requirements for cryptocurrency trading platforms and individual traders in various jurisdictions.",
		category: "Legal",
		fileName: "crypto_compliance_checklist.docx",
		fileUrl:
			"https://storage.googleapis.com/trading-76356.appspot.com/documents/compliance-checklist/crypto_compliance_checklist.docx",
		mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
		fileSize: 512000,
		downloadCount: 312,
		isPublic: false,
		tags: ["compliance", "legal", "regulations", "crypto"],
		author: "Legal Department",
		version: "2.0.0",
		language: "en",
		createAt: new Date("2024-06-01"),
		updatedAt: new Date("2024-12-01"),
	},
];

async function seedDocuments() {
	console.log("📄 Seeding documents collection...");

	try {
		// Generate random documents
		const randomDocuments = generateDocuments(25);

		// Combine sample and random documents
		const allDocuments = [...sampleDocuments, ...randomDocuments];

		const batch = db.batch();

		for (const document of allDocuments) {
			const docRef = db.collection("documents").doc(document.id);
			batch.set(docRef, document);
		}

		await batch.commit();
		console.log(`✅ Successfully seeded ${allDocuments.length} documents`);
		console.log(`   • ${sampleDocuments.length} sample documents`);
		console.log(`   • ${randomDocuments.length} generated documents`);
	} catch (error) {
		console.error("❌ Error seeding documents:", error);
		throw error;
	}
}

module.exports = { seedDocuments, generateDocuments };
