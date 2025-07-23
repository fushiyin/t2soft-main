// Mock data for documents
export const documents = [
	{
		id: 1,
		title: "Bitcoin Technical Analysis Q1 2025",
		category: "Crypto",
		author: "Sarah Johnson",
		date: "2025-01-15",
		description:
			"Comprehensive analysis of Bitcoin price movements and market trends for the first quarter of 2025.",
		content:
			"This detailed analysis covers Bitcoin's performance, key support and resistance levels, and future price predictions based on technical indicators and market sentiment.",
		tags: ["Bitcoin", "Technical Analysis", "Q1 2025"],
		readTime: "8 min read",
	},
	{
		id: 2,
		title: "Ethereum 2.0 Staking Guide",
		category: "Crypto",
		author: "Mike Chen",
		date: "2025-01-12",
		description: "Complete guide to Ethereum 2.0 staking rewards and validator requirements.",
		content:
			"Learn everything about Ethereum 2.0 staking, including how to become a validator, expected returns, and risk management strategies.",
		tags: ["Ethereum", "Staking", "DeFi"],
		readTime: "12 min read",
	},
	{
		id: 3,
		title: "EUR/USD Weekly Forecast",
		category: "Forex",
		author: "Emma Rodriguez",
		date: "2025-01-14",
		description: "Weekly analysis and forecast for the EUR/USD currency pair.",
		content:
			"Detailed weekly forecast for EUR/USD including key economic events, technical levels, and trading opportunities for the upcoming week.",
		tags: ["EUR/USD", "Forex", "Weekly Forecast"],
		readTime: "6 min read",
	},
	{
		id: 4,
		title: "GBP/JPY Trading Strategy",
		category: "Forex",
		author: "James Wilson",
		date: "2025-01-10",
		description: "Advanced trading strategy for the GBP/JPY currency pair.",
		content:
			"Comprehensive trading strategy covering entry points, risk management, and profit targets for GBP/JPY trading.",
		tags: ["GBP/JPY", "Trading Strategy", "Risk Management"],
		readTime: "10 min read",
	},
	{
		id: 5,
		title: "Apple Inc. (AAPL) Earnings Analysis",
		category: "Stock",
		author: "Lisa Thompson",
		date: "2025-01-13",
		description: "In-depth analysis of Apple's latest quarterly earnings report.",
		content:
			"Comprehensive breakdown of Apple's Q4 2024 earnings, revenue streams, and future growth prospects in the tech sector.",
		tags: ["AAPL", "Earnings", "Tech Stocks"],
		readTime: "9 min read",
	},
	{
		id: 6,
		title: "Tesla Stock Price Prediction",
		category: "Stock",
		author: "Robert Kim",
		date: "2025-01-11",
		description: "Price prediction and analysis for Tesla stock based on recent developments.",
		content:
			"Analysis of Tesla's stock price potential, considering EV market trends, production capacity, and technological innovations.",
		tags: ["TSLA", "Price Prediction", "EV Stocks"],
		readTime: "7 min read",
	},
	{
		id: 7,
		title: "S&P 500 Market Outlook 2025",
		category: "Index",
		author: "David Brown",
		date: "2025-01-16",
		description: "2025 market outlook and predictions for the S&P 500 index.",
		content:
			"Comprehensive market outlook for 2025, covering economic factors, sector analysis, and potential market scenarios for the S&P 500.",
		tags: ["S&P 500", "Market Outlook", "2025 Predictions"],
		readTime: "15 min read",
	},
	{
		id: 8,
		title: "NASDAQ 100 Tech Rally Analysis",
		category: "Index",
		author: "Anna Martinez",
		date: "2025-01-09",
		description: "Analysis of the recent tech rally in NASDAQ 100 components.",
		content:
			"Deep dive into the factors driving the recent tech rally, key performers, and sustainability of current trends in the NASDAQ 100.",
		tags: ["NASDAQ 100", "Tech Rally", "Market Analysis"],
		readTime: "11 min read",
	},
	{
		id: 9,
		title: "Commodity Market Trends 2025",
		category: "Others",
		author: "Peter Davis",
		date: "2025-01-08",
		description: "Overview of commodity market trends and investment opportunities.",
		content:
			"Comprehensive analysis of commodity markets including gold, oil, agricultural products, and their investment potential for 2025.",
		tags: ["Commodities", "Investment", "Market Trends"],
		readTime: "13 min read",
	},
	{
		id: 10,
		title: "Real Estate Investment Guide",
		category: "Others",
		author: "Jennifer Lee",
		date: "2025-01-07",
		description: "Guide to real estate investment strategies and market analysis.",
		content:
			"Complete guide to real estate investing, covering market analysis, financing options, and risk management strategies.",
		tags: ["Real Estate", "Investment Guide", "Property"],
		readTime: "14 min read",
	},
];

export const categories = [
	{ name: "All", color: "#6366f1", count: documents.length },
	{
		name: "Crypto",
		color: "#f59e0b",
		count: documents.filter((doc) => doc.category === "Crypto").length,
	},
	{
		name: "Forex",
		color: "#10b981",
		count: documents.filter((doc) => doc.category === "Forex").length,
	},
	{
		name: "Stock",
		color: "#ef4444",
		count: documents.filter((doc) => doc.category === "Stock").length,
	},
	{
		name: "Index",
		color: "#8b5cf6",
		count: documents.filter((doc) => doc.category === "Index").length,
	},
	{
		name: "Others",
		color: "#6b7280",
		count: documents.filter((doc) => doc.category === "Others").length,
	},
];
