import React, { useState } from "react";
import { Search } from "lucide-react";

const SideBar = ({ recentPosts = [], mostReadPosts = [], hashtags = [], onSearch }) => {
	const [searchTerm, setSearchTerm] = useState("");

	const handleSearch = (e) => {
		e.preventDefault();
		if (onSearch) onSearch(searchTerm);
	};

	return (
		<aside className="w-full md:w-80 flex-shrink-0">
			<div className="bg-[#202a3c] rounded-2xl shadow-lg p-6 mb-8">
				{/* Search Box */}
				<form
					onSubmit={handleSearch}
					className="mb-8"
				>
					<label className="block text-cyan-200 font-bold mb-2">Search</label>
					<div className="relative">
						<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 h-5 w-5" />
						<input
							className="w-full pl-10 pr-4 py-2 rounded bg-[#1a2233] text-cyan-100 mb-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
							placeholder="Search..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						className="w-full bg-cyan-400 text-[#1a2233] font-bold py-2 rounded mt-2 hover:bg-cyan-300 transition"
					>
						SEARCH
					</button>
				</form>

				{/* Recent Posts */}
				<div className="mb-8">
					<h3 className="text-cyan-300 font-bold text-lg mb-2 tracking-wide">RECENT</h3>
					<ul className="space-y-2">
						{recentPosts.length === 0 ? (
							<li className="text-cyan-100 font-mono text-base">No recent posts.</li>
						) : (
							recentPosts.map((post) => (
								<li key={post.id}>
									<a
										href={post.href || "#"}
										className="text-cyan-100 hover:text-cyan-300 font-mono text-base leading-tight line-clamp-2"
									>
										{post.title}
									</a>
								</li>
							))
						)}
					</ul>
				</div>

				{/* Most Read Posts */}
				<div className="mb-8">
					<h3 className="text-cyan-300 font-bold text-lg mb-2 tracking-wide">
						MOST READ
					</h3>
					<ul className="space-y-2">
						{mostReadPosts.length === 0 ? (
							<li className="text-cyan-100 font-mono text-base">
								No most read posts.
							</li>
						) : (
							mostReadPosts.map((post) => (
								<li key={post.id}>
									<a
										href={post.href || "#"}
										className="text-cyan-100 hover:text-cyan-300 font-mono text-base leading-tight line-clamp-2"
									>
										{post.title}
									</a>
								</li>
							))
						)}
					</ul>
				</div>

				{/* Hashtags */}
				<div>
					<h3 className="text-cyan-300 font-bold text-lg mb-2 tracking-wide">
						# Hashtags
					</h3>
					<div className="flex flex-wrap gap-2">
						{hashtags.length === 0 ? (
							<span className="text-cyan-100 font-mono text-base">No hashtags.</span>
						) : (
							hashtags.map((tag) => (
								<span
									key={tag}
									className="bg-cyan-900 text-cyan-200 px-3 py-1 rounded text-xs font-mono cursor-pointer hover:bg-cyan-700 transition"
								>
									#{tag}
								</span>
							))
						)}
					</div>
				</div>
			</div>
		</aside>
	);
};

export default SideBar;
