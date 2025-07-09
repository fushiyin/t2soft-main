import React, { useState } from "react";

const pinnedPost = {
	id: 0,
	title: "Why Trading Psychology Matters More Than You Think",
	category: "Pinned",
	author: "Alex Morgan",
	date: "August 28, 2022",
	thumbnail:
		"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80",
};

const featuredPost = {
	id: 1,
	title: "5 Easy Ways You Can Turn Future Into Success",
	category: "Inspiration",
	author: "Katen Doe",
	date: "August 20, 2022",
	thumbnail:
		"https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=1600&q=80",
};

const popularPosts = [
	{
		id: 2,
		title: "What Can You Do About Fashion Right Now",
		date: "August 17, 2022",
		thumbnail: "https://randomuser.me/api/portraits/women/44.jpg",
	},
	{
		id: 3,
		title: "3 Easy Ways To Make Your iPhone Faster",
		date: "August 19, 2022",
		thumbnail:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 4,
		title: "Facts About Business That Will Help You Success",
		date: "August 23, 2022",
		thumbnail: "https://randomuser.me/api/portraits/women/65.jpg",
	},
	{
		id: 5,
		title: "Your Light Is About To Stop Being Relevant",
		date: "August 23, 2022",
		thumbnail: "https://randomuser.me/api/portraits/men/32.jpg",
	},
];

const recentPosts = [
	{
		id: 6,
		title: "How to Start Trading Crypto in 2024",
		date: "August 25, 2022",
		thumbnail:
			"https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 7,
		title: "Top 5 Strategies for Day Traders",
		date: "August 24, 2022",
		thumbnail:
			"https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 8,
		title: "Understanding Technical Analysis",
		date: "August 23, 2022",
		thumbnail:
			"https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
	},
	{
		id: 9,
		title: "The Psychology of Successful Traders",
		date: "August 22, 2022",
		thumbnail:
			"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80",
	},
];

function Blog() {
	const [tab, setTab] = useState("Popular");
	const posts = tab === "Popular" ? popularPosts : recentPosts;

	return (
		<section className="relative w-full min-h-screen py-24 px-4 flex flex-col items-center justify-center overflow-x-hidden blog-bg-grid">
			{/* Custom grid and chart background */}
			<div className="absolute inset-0 z-0 pointer-events-none">
				{/* SVG for faint line chart */}
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 1600 600"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className="absolute left-0 top-0 w-full h-full"
				>
					<path
						d="M0 400 Q400 300 600 350 Q800 400 1000 250 Q1200 200 1600 350"
						stroke="#3a4a7a"
						strokeWidth="4"
						opacity="0.13"
						fill="none"
					/>
					<circle
						cx="400"
						cy="300"
						r="12"
						fill="#3a4a7a"
						opacity="0.13"
					/>
					<circle
						cx="800"
						cy="400"
						r="12"
						fill="#3a4a7a"
						opacity="0.13"
					/>
					<circle
						cx="1200"
						cy="200"
						r="12"
						fill="#3a4a7a"
						opacity="0.13"
					/>
				</svg>
			</div>
			<h2 className="relative z-10 text-4xl md:text-5xl font-extrabold text-center mb-20 text-white tracking-tight drop-shadow-xl">
				Blog & Insights
			</h2>
			{/* Pinned Post Section */}
			<div className="w-[92vw] max-w-[1500px] mx-auto mb-20 relative z-10">
				<div className="flex flex-col md:flex-row items-center gap-0 md:gap-10 rounded-3xl overflow-hidden border-0 bg-white/10 dark:bg-white/10 backdrop-blur-xl shadow-2xl min-h-[400px] transition-transform hover:scale-[1.015] hover:shadow-3xl group relative">
					<div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-transparent group-hover:border-yellow-400 transition-all duration-300" />
					<img
						src={pinnedPost.thumbnail}
						alt={pinnedPost.title}
						className="w-full md:w-1/2 h-72 md:h-[420px] object-cover object-center transition-transform duration-300 group-hover:scale-105"
					/>
					<div className="flex-1 flex flex-col justify-center px-0 md:px-12 py-10 md:py-0">
						<span className="inline-block bg-yellow-400/90 text-black text-xs font-semibold px-5 py-1.5 rounded-full mb-4 w-max shadow-lg tracking-wide">
							{pinnedPost.category}
						</span>
						<h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-white leading-tight drop-shadow-lg">
							{pinnedPost.title}
						</h3>
						<div className="flex items-center gap-3 text-gray-200/90 text-lg font-medium">
							<span>{pinnedPost.author}</span>
							<span className="mx-1">•</span>
							<span>{pinnedPost.date}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="w-[92vw] max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-[2fr_400px] gap-16 items-stretch relative z-10">
				{/* Featured Post */}
				<div className="rounded-3xl overflow-hidden shadow-2xl bg-white/10 dark:bg-white/10 backdrop-blur-xl flex flex-col relative min-h-[400px] justify-center transition-transform hover:scale-[1.01] hover:shadow-3xl group">
					<div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-transparent group-hover:border-pink-400 transition-all duration-300" />
					<div className="relative w-full">
						<img
							src={featuredPost.thumbnail}
							alt={featuredPost.title}
							className="w-full h-72 md:h-[420px] object-cover object-center transition-transform duration-300 group-hover:scale-105"
						/>
						<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
						<div className="absolute left-0 bottom-0 p-10 w-full flex flex-col gap-4">
							<span className="inline-block bg-gradient-to-r from-pink-500 to-orange-400 text-white text-xs font-semibold px-5 py-1.5 rounded-full mb-2 w-max shadow-lg tracking-wide">
								{featuredPost.category}
							</span>
							<h2 className="text-white text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg leading-tight">
								{featuredPost.title}
							</h2>
							<div className="flex items-center gap-3 text-white/80 text-lg font-medium">
								<span>{featuredPost.author}</span>
								<span className="mx-1">•</span>
								<span>{featuredPost.date}</span>
							</div>
						</div>
					</div>
				</div>
				{/* Sidebar */}
				<div className="rounded-3xl bg-white/10 dark:bg-white/10 backdrop-blur-xl shadow-2xl px-8 py-12 w-full flex flex-col gap-10 md:gap-8 md:justify-center md:min-h-[400px] md:max-w-[400px] mx-auto transition-transform hover:scale-[1.01] hover:shadow-3xl">
					{/* Tabs */}
					<div className="flex gap-3 mb-2">
						<button
							className={`px-7 py-2.5 rounded-full font-semibold text-base transition-all shadow-lg backdrop-blur-md ${tab === "Popular" ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white scale-105" : "bg-white/20 dark:bg-white/10 text-gray-200 hover:bg-white/30"}`}
							onClick={() => setTab("Popular")}
						>
							Popular
						</button>
						<button
							className={`px-7 py-2.5 rounded-full font-semibold text-base transition-all shadow-lg backdrop-blur-md ${tab === "Recent" ? "bg-gradient-to-r from-pink-500 to-orange-400 text-white scale-105" : "bg-white/20 dark:bg-white/10 text-gray-200 hover:bg-white/30"}`}
							onClick={() => setTab("Recent")}
						>
							Recent
						</button>
					</div>
					{/* List of posts */}
					<div className="flex flex-col gap-8">
						{posts.map((post) => (
							<div
								key={post.id}
								className="flex items-center gap-5 group cursor-pointer transition-transform hover:scale-105"
							>
								<img
									src={post.thumbnail}
									alt={post.title}
									className="w-16 h-16 rounded-2xl object-cover object-center bg-gray-200 dark:bg-[#23242a] shadow-md transition-transform group-hover:scale-110"
								/>
								<div className="flex-1 min-w-0">
									<div className="font-semibold text-white text-lg truncate group-hover:underline">
										{post.title}
									</div>
									<div className="text-xs text-gray-300 mt-1 truncate">
										{post.date}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Blog;
