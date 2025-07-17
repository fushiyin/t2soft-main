import React, { useState } from "react";
import { Clock, User, Calendar, Tag, Search } from "lucide-react";
import SideBar from "./component/SideBar";

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

	const filteredArticles = articles.filter((article) => {
		const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
		const matchesSearch =
			article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const recentPosts = articles.slice(0, 5);
	const mostReadPosts = articles.slice(0, 3);
	const hashtags = Array.from(
		articles.reduce((set, a) => {
			a.tags.forEach((t) => set.add(t));
			return set;
		}, new Set()),
	);

	const handleSidebarSearch = (term) => {
		setSearchTerm(term);
	};

	return (
		<section className="py-20 min-h-screen bg-gradient-to-b from-white via-blue-50 to-cyan-50 !pt-[120px]">
			<div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row gap-16">
				<div className="flex-1 min-w-0">
					{filteredArticles.length > 0 && (
						<div className="mb-14">
							<div className="flex flex-col md:flex-row gap-0 md:gap-12 items-stretch">
								<img
									src={filteredArticles[0].image}
									alt={filteredArticles[0].title}
									className="w-full md:w-1/2 h-64 md:h-auto object-cover rounded-none md:rounded-l-xl"
								/>
								<div className="flex-1 flex flex-col justify-center px-0 md:px-10 py-8 bg-white/80 md:bg-transparent">
									<div className="flex items-center gap-4 mb-2">
										<span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">
											{filteredArticles[0].category}
										</span>
										<span className="text-xs font-mono text-gray-400">
											{new Date(
												filteredArticles[0].date,
											).toLocaleDateString()}
										</span>
									</div>
									<h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 font-mono leading-tight">
										{filteredArticles[0].title}
									</h2>
									<p className="text-cyan-800 mb-6 text-lg font-mono leading-relaxed">
										{filteredArticles[0].excerpt}
									</p>
									<div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-4">
										<span>{filteredArticles[0].author}</span>
										<span>&bull;</span>
										<span>{filteredArticles[0].readTime}</span>
									</div>
									<a
										href="#"
										className="inline-block text-cyan-600 font-bold font-mono text-base border-b-2 border-cyan-400 hover:border-cyan-600 transition"
									>
										Read More
									</a>
								</div>
							</div>
							<div className="h-px w-full bg-gradient-to-r from-cyan-200 via-cyan-100 to-transparent mt-10" />
						</div>
					)}

					{/* Article Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-12">
						{filteredArticles.slice(1).map((article) => (
							<div
								key={article.id}
								className="group bg-white/70 rounded-none border-l-2 border-cyan-200 p-0 flex flex-col min-h-[320px] transition-all duration-200 hover:bg-cyan-50"
							>
								<img
									src={article.image}
									alt={article.title}
									className="w-full h-48 object-cover object-center rounded-none"
								/>
								<div className="flex-1 flex flex-col px-8 py-8">
									<div className="flex items-center gap-4 mb-2">
										<span className="text-xs font-mono text-cyan-500 uppercase tracking-widest">
											{article.category}
										</span>
										<span className="text-xs font-mono text-gray-400">
											{new Date(article.date).toLocaleDateString()}
										</span>
									</div>
									<h3 className="text-xl font-bold text-gray-900 mb-2 font-mono line-clamp-2">
										{article.title}
									</h3>
									<p className="text-cyan-800 mb-4 font-mono line-clamp-3">
										{article.excerpt}
									</p>
									<div className="flex items-center gap-4 text-xs font-mono text-gray-500 mb-4">
										<span>{article.author}</span>
										<span>&bull;</span>
										<span>{article.readTime}</span>
									</div>
									<div className="flex flex-wrap gap-2 mt-auto">
										{article.tags.slice(0, 2).map((tag) => (
											<span
												key={tag}
												className="bg-cyan-50 text-cyan-700 px-3 py-1 rounded text-xs font-mono border border-cyan-100"
											>
												#{tag}
											</span>
										))}
									</div>
									<a
										href="#"
										className="inline-block mt-4 text-cyan-600 font-bold font-mono text-base border-b border-cyan-300 hover:border-cyan-600 transition"
									>
										Read More
									</a>
								</div>
							</div>
						))}
					</div>
					{filteredArticles.length === 0 && (
						<div className="text-center py-12">
							<p className="text-cyan-700 text-lg font-mono">
								No articles found matching your criteria.
							</p>
						</div>
					)}
				</div>
				{/* Sidebar */}
				<SideBar
					recentPosts={recentPosts}
					mostReadPosts={mostReadPosts}
					hashtags={hashtags}
					onSearch={handleSidebarSearch}
				/>
			</div>
		</section>
	);
};

export default Blog;
