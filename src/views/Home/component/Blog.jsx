import React, { useState } from "react";
import { Clock, User, Calendar, Tag, Search } from "lucide-react";

const Blog = () => {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");

	const articles = [
		{
			id: 1,
			title: "5 Essential Forex Trading Strategies for Beginners",
			excerpt:
				"Learn the fundamental strategies that every new forex trader should master to start their journey successfully.",
			image: "https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=400",
			author: "Sarah Johnson",
			date: "2024-01-15",
			readTime: "8 min read",
			category: "Forex",
			tags: ["Forex", "Beginner", "Strategies"],
		},
		{
			id: 2,
			title: "Understanding Bitcoin Market Cycles",
			excerpt:
				"Discover how Bitcoin market cycles work and how to use this knowledge to make better trading decisions.",
			image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400",
			author: "Michael Chen",
			date: "2024-01-12",
			readTime: "12 min read",
			category: "Crypto",
			tags: ["Bitcoin", "Market Analysis", "Crypto"],
		},
		{
			id: 3,
			title: "Risk Management: The Key to Long-Term Success",
			excerpt:
				"Master the art of risk management to protect your capital and ensure sustainable trading profits.",
			image: "https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400",
			author: "Emma Rodriguez",
			date: "2024-01-10",
			readTime: "15 min read",
			category: "Education",
			tags: ["Risk Management", "Trading Psychology", "Education"],
		},
		{
			id: 4,
			title: "Technical Analysis: Chart Patterns That Actually Work",
			excerpt:
				"Explore the most reliable chart patterns and how to use them effectively in your trading strategy.",
			image: "https://images.pexels.com/photos/186461/pexels-photo-186461.jpeg?auto=compress&cs=tinysrgb&w=400",
			author: "David Kim",
			date: "2024-01-08",
			readTime: "10 min read",
			category: "Market News",
			tags: ["Technical Analysis", "Chart Patterns", "Trading"],
		},
		{
			id: 5,
			title: "DeFi Revolution: What Traders Need to Know",
			excerpt:
				"Understanding decentralized finance and its impact on cryptocurrency trading opportunities.",
			image: "https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=400",
			author: "Alex Thompson",
			date: "2024-01-05",
			readTime: "11 min read",
			category: "Crypto",
			tags: ["DeFi", "Cryptocurrency", "Innovation"],
		},
		{
			id: 6,
			title: "Market Psychology: Trading the Crowd",
			excerpt:
				"Learn how market psychology affects price movements and how to use this knowledge to your advantage.",
			image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400",
			author: "Lisa Wong",
			date: "2024-01-03",
			readTime: "9 min read",
			category: "Education",
			tags: ["Psychology", "Market Behavior", "Trading"],
		},
	];

	const categories = ["All", "Forex", "Crypto", "Market News", "Education"];

	const filteredArticles = articles.filter((article) => {
		const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
		const matchesSearch =
			article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const getCategoryColor = (category) => {
		switch (category) {
			case "Forex":
				return "bg-blue-100 text-blue-800";
			case "Crypto":
				return "bg-purple-100 text-purple-800";
			case "Market News":
				return "bg-red-100 text-red-800";
			case "Education":
				return "bg-green-100 text-green-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<section className="py-20 bg-gray-900 min-h-screen">
			<div className="container mx-auto px-4">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Trading Blog</h1>
					<p className="text-xl text-gray-300 max-w-2xl mx-auto">
						Stay updated with the latest trading insights, market analysis, and
						educational content
					</p>
				</div>

				{/* Search and Filter */}
				<div className="flex flex-col md:flex-row gap-4 mb-12">
					<div className="flex-1">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
							<input
								type="text"
								placeholder="Search articles..."
								className="w-full pl-10 pr-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-green-400 focus:outline-none"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
					</div>

					<div className="flex space-x-2">
						{categories.map((category) => (
							<button
								key={category}
								onClick={() => setSelectedCategory(category)}
								className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
									selectedCategory === category
										? "bg-green-400 text-gray-900"
										: "bg-gray-800 text-gray-300 hover:bg-gray-700"
								}`}
							>
								{category}
							</button>
						))}
					</div>
				</div>

				{/* Featured Article */}
				{filteredArticles.length > 0 && (
					<div className="mb-12">
						<div className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700">
							<div className="md:flex">
								<div className="md:w-1/2">
									<img
										src={filteredArticles[0].image}
										alt={filteredArticles[0].title}
										className="w-full h-64 md:h-full object-cover"
									/>
								</div>
								<div className="md:w-1/2 p-8">
									<div className="flex items-center space-x-2 mb-4">
										<span
											className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(filteredArticles[0].category)}`}
										>
											{filteredArticles[0].category}
										</span>
										<span className="text-gray-500 text-sm">Featured</span>
									</div>
									<h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
										{filteredArticles[0].title}
									</h2>
									<p className="text-gray-300 mb-6">
										{filteredArticles[0].excerpt}
									</p>
									<div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
										<div className="flex items-center space-x-1">
											<User className="h-4 w-4" />
											<span>{filteredArticles[0].author}</span>
										</div>
										<div className="flex items-center space-x-1">
											<Calendar className="h-4 w-4" />
											<span>
												{new Date(
													filteredArticles[0].date,
												).toLocaleDateString()}
											</span>
										</div>
										<div className="flex items-center space-x-1">
											<Clock className="h-4 w-4" />
											<span>{filteredArticles[0].readTime}</span>
										</div>
									</div>
									<button className="bg-green-400 text-gray-900 px-6 py-2 rounded-lg font-medium hover:bg-green-300 transition-colors duration-200">
										Read More
									</button>
								</div>
							</div>
						</div>
					</div>
				)}

				{/* Article Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{filteredArticles.slice(1).map((article) => (
						<div
							key={article.id}
							className="bg-gray-800 rounded-2xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300 border border-gray-700"
						>
							<img
								src={article.image}
								alt={article.title}
								className="w-full h-48 object-cover"
							/>
							<div className="p-6">
								<div className="flex items-center space-x-2 mb-3">
									<span
										className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}
									>
										{article.category}
									</span>
								</div>
								<h3 className="text-xl font-bold text-white mb-3">
									{article.title}
								</h3>
								<p className="text-gray-400 mb-4 line-clamp-3">{article.content}</p>

								<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
									<div className="flex items-center space-x-1">
										<User className="h-4 w-4" />
										<span>{article.author}</span>
									</div>
									<div className="flex items-center space-x-1">
										<Clock className="h-4 w-4" />
										<span>{article.readTime}</span>
									</div>
								</div>

								<div className="flex items-center justify-between">
									<div className="flex flex-wrap gap-1">
										{article.tags.slice(0, 2).map((tag) => (
											<span
												key={tag}
												className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
											>
												#{tag}
											</span>
										))}
									</div>
									<button className="text-green-400 hover:text-green-300 transition-colors duration-200 font-medium">
										Read More
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				{filteredArticles.length === 0 && (
					<div className="text-center py-12">
						<p className="text-gray-400 text-lg">
							No articles found matching your criteria.
						</p>
					</div>
				)}
			</div>
		</section>
	);
};

export default Blog;
