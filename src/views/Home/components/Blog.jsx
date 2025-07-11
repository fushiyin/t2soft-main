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
					<defs>
						<linearGradient id="neonLine" x1="0" y1="0" x2="1600" y2="0" gradientUnits="userSpaceOnUse">
							<stop stopColor="#00fff0" />
							<stop offset="1" stopColor="#ff00ea" />
						</linearGradient>
					</defs>
					<path
						d="M0 400 Q400 300 600 350 Q800 400 1000 250 Q1200 200 1600 350"
						stroke="url(#neonLine)"
						strokeWidth="5"
						opacity="0.25"
						filter="url(#glow)"
						fill="none"
					/>
					<filter id="glow">
						<feGaussianBlur stdDeviation="6" result="coloredBlur" />
						<feMerge>
							<feMergeNode in="coloredBlur" />
							<feMergeNode in="SourceGraphic" />
						</feMerge>
					</filter>
					<circle
						cx="400"
						cy="300"
						r="16"
						fill="#00fff0"
						opacity="0.18"
					/>
					<circle
						cx="800"
						cy="400"
						r="16"
						fill="#ff00ea"
						opacity="0.18"
					/>
					<circle
						cx="1200"
						cy="200"
						r="16"
						fill="#00fff0"
						opacity="0.18"
					/>
				</svg>
			</div>
			<h2 className="relative z-10 text-4xl md:text-5xl font-extrabold text-center mb-20 text-white tracking-tight drop-shadow-xl neon-text-glow">
				Blog & Insights
			</h2>
			{/* Pinned Post Section */}
			<div className="w-[92vw] max-w-[1200px] mx-auto mb-20 relative z-10">
				<div className="flex flex-col md:flex-row items-center gap-0 md:gap-10 rounded-3xl overflow-hidden border-0 bg-white/10 dark:bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] min-h-[400px] transition-transform hover:scale-[1.015] hover:shadow-[0_0_32px_8px_#00fff0aa] group relative border border-[#00fff0]/30">
					<div className="absolute inset-0 pointer-events-none rounded-3xl border-4 border-transparent group-hover:border-[#00fff0] group-hover:shadow-[0_0_32px_8px_#00fff0aa] transition-all duration-300" />
					<img
						src={pinnedPost.thumbnail}
						alt={pinnedPost.title}
						className="w-full md:w-1/2 h-72 md:h-[420px] object-cover object-center transition-transform duration-300 group-hover:scale-105 shadow-[0_0_32px_0_#00fff0aa]"
					/>
					<div className="flex-1 flex flex-col justify-center px-0 md:px-12 py-10 md:py-0">
						<span className="inline-block bg-[#00fff0]/90 text-black text-xs font-semibold px-5 py-1.5 rounded-full mb-4 w-max shadow-lg tracking-wide neon-badge-glow">
							{pinnedPost.category}
						</span>
						<h3 className="text-3xl md:text-4xl font-extrabold mb-4 text-white leading-tight drop-shadow-lg neon-text-glow">
							{pinnedPost.title}
						</h3>
						<div className="flex items-center gap-3 text-[#00fff0]/90 text-lg font-medium">
							<span>{pinnedPost.author}</span>
							<span className="mx-1">•</span>
							<span>{pinnedPost.date}</span>
						</div>
					</div>
				</div>
			</div>
			<div className="w-[92vw] max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-stretch relative z-10">
				{/* Sidebar */}
				<div className="rounded-3xl bg-white/10 dark:bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] px-8 py-12 w-full flex flex-col gap-10 md:gap-8 md:justify-center md:min-h-[400px] md:max-w-[400px] mx-auto transition-transform hover:scale-[1.01] hover:shadow-[0_0_32px_8px_#00fff0aa] border border-[#00fff0]/30">
					{/* Tabs */}
					<div className="flex gap-3 mb-2">
						<button
							className={`px-7 py-2.5 rounded-full font-semibold text-base transition-all shadow-lg backdrop-blur-md neon-btn ${tab === "Popular" ? "bg-gradient-to-r from-[#00fff0] to-[#ff00ea] text-white scale-105 neon-btn-glow" : "bg-white/20 dark:bg-white/10 text-gray-200 hover:bg-white/30"}`}
							onClick={() => setTab("Popular")}
						>
							Popular
						</button>
						<button
							className={`px-7 py-2.5 rounded-full font-semibold text-base transition-all shadow-lg backdrop-blur-md neon-btn ${tab === "Recent" ? "bg-gradient-to-r from-[#00fff0] to-[#ff00ea] text-white scale-105 neon-btn-glow" : "bg-white/20 dark:bg-white/10 text-gray-200 hover:bg-white/30"}`}
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
								className="flex items-center gap-5 group cursor-pointer transition-transform hover:scale-105 hover:shadow-[0_0_16px_4px_#00fff0aa]"
							>
								<img
									src={post.thumbnail}
									alt={post.title}
									className="w-16 h-16 rounded-2xl object-cover object-center bg-gray-200 dark:bg-[#23242a] shadow-md transition-transform group-hover:scale-110 border border-[#00fff0]/30"
								/>
								<div className="flex-1 min-w-0">
									<div className="font-semibold text-white text-lg truncate group-hover:underline neon-text-glow">
										{post.title}
									</div>
									<div className="text-xs text-[#00fff0] mt-1 truncate">
										{post.date}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* Empty main column for grid balance, could add more widgets here in the future */}
				<div className="hidden md:block" />
			</div>
		</section>
	);
}

export default Blog;
