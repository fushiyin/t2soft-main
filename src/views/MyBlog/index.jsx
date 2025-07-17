import React, { useState, useEffect } from "react";
import { Clock, User, Calendar, Tag, Search } from "lucide-react";
import SideBar from "./component/SideBar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

const Blog = () => {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		async function fetchArticles() {
			try {
				const querySnapshot = await getDocs(collection(db, "posts"));
				const posts = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				}));
				setArticles(posts);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		}
		fetchArticles();
	}, []);

	const filteredArticles = articles.filter((article) => {
		const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
		const matchesSearch =
			(article.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
			(article.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase());
		return matchesCategory && matchesSearch;
	});

	const recentPosts = articles.slice(0, 5);
	const mostReadPosts = articles.slice(0, 3);
	const hashtags = Array.from(
		articles.reduce((set, a) => {
			(a.tags || []).forEach((t) => set.add(t));
			return set;
		}, new Set()),
	);

	const handleSidebarSearch = (term) => {
		setSearchTerm(term);
	};

	if (loading) return <div className="text-center py-20 text-gray-700">Loading...</div>;
	if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;

	return (
		<section className="py-16 min-h-screen bg-white">
			<div className="max-w-5xl mx-auto px-4">
				<h1 className="text-3xl font-bold text-black mb-10 border-b border-gray-200 pb-4 font-mono">
					My Blog
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{filteredArticles.map((article) => (
						<div
							key={article.id}
							className="flex flex-col border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow min-h-[220px]"
						>
							<h2 className="text-xl font-semibold text-black mb-2 font-mono line-clamp-2">
								{article.title}
							</h2>
							<p className="text-gray-700 text-base mb-4 line-clamp-3 font-mono">
								{article.excerpt}
							</p>
							<div className="flex items-center gap-4 text-xs text-gray-500 font-mono mt-auto">
								<span>{article.author}</span>
								<span>&bull;</span>
								<span>
									{article.date
										? new Date(article.date).toLocaleDateString()
										: ""}
								</span>
							</div>
							{/* Optionally add a Read More link */}
							{/* <a href="#" className="inline-block mt-4 text-black font-bold font-mono text-base border-b border-black hover:opacity-70 transition">Read More</a> */}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Blog;
