import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ArrowRight, Search, ChevronLeft, ChevronRight, User, Calendar } from "lucide-react";
import thumbnail from "@/assets/image/default-thumbnail.png";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import striptags from "striptags";
const Blog = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 10;

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

	const filteredArticles = articles.filter(
		(article) =>
			(article.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
			(article.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// Reset to first page on search
	useEffect(() => {
		setCurrentPage(1);
	}, [searchTerm]);

	const recentPosts = articles.slice(0, 5);
	const mostReadPosts = articles.slice(0, 3); // Placeholder for most read

	// Pagination logic
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = filteredArticles.slice(indexOfFirstPost, indexOfLastPost);
	const totalPages = Math.ceil(filteredArticles.length / postsPerPage);

	const paginate = (pageNumber) => {
		if (pageNumber > 0 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber);
		}
	};

	if (loading)
		return (
			<div className="text-center py-20 bg-white text-gray-700 min-h-screen">
				<LoadingSpinner />
			</div>
		);
	if (error)
		return (
			<div className="text-center py-20 bg-white text-red-500 min-h-screen">
				Error: {error}
			</div>
		);

	const featuredArticle = currentPosts.length > 0 ? currentPosts[0] : null;
	const otherArticles = currentPosts.length > 1 ? currentPosts.slice(1) : [];

	return (
		<section className="py-24 min-h-screen bg-gray-50 text-gray-800 relative overflow-hidden">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
				<div className="text-left mb-12 border-b border-gray-200 pb-6">
					<h1 className="text-5xl font-serif font-bold text-black mb-2">Blogs</h1>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
					<main className="lg:col-span-2">
						{/* Featured Article */}
						{featuredArticle && (
							<div
								key={featuredArticle.id}
								className="mb-12 group"
							>
								<img
									src={featuredArticle.imageUrl || thumbnail}
									alt={featuredArticle.title}
									className="w-full h-80 object-cover rounded-lg mb-6 border border-gray-200"
								/>
								<div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
									<span className="flex items-center gap-2">
										<User size={14} /> {featuredArticle.author || "Admin"}
									</span>
									<span className="flex items-center gap-2">
										<Calendar size={14} />
										{featuredArticle.created_at
											? new Date(
													featuredArticle.created_at.seconds * 1000,
												).toLocaleDateString()
											: "N/A"}
									</span>
								</div>
								<h2 className="text-3xl font-bold font-serif text-black mb-3 group-hover:text-blue-600 transition-colors">
									{featuredArticle.title}
								</h2>
								<p className="text-gray-600 mb-4 text-base line-clamp-3">
									{striptags(featuredArticle.content || featuredArticle.excerpt)}
								</p>
								<a
									href="#"
									className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-800"
								>
									Read more <ArrowRight size={16} />
								</a>
							</div>
						)}

						{/* Other Articles */}
						<div className="space-y-10">
							{otherArticles.map((article) => (
								<div
									key={article.id}
									className="grid md:grid-cols-3 gap-6 items-start group"
								>
									<div className="md:col-span-1">
										<img
											src={article.imageUrl || thumbnail}
											alt={article.title}
											className="w-full h-32 object-cover rounded-lg border border-gray-200"
										/>
									</div>
									<div className="md:col-span-2">
										<div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
											<span className="flex items-center gap-1.5">
												<User size={12} /> {article.author || "Admin"}
											</span>
											<span className="flex items-center gap-1.5">
												<Calendar size={12} />
												{article.created_at
													? new Date(
															article.created_at.seconds * 1000,
														).toLocaleDateString()
													: "N/A"}
											</span>
										</div>
										<h2 className="text-xl font-bold font-serif text-black mb-2 group-hover:text-blue-600 transition-colors">
											{article.title}
										</h2>
										<p className="text-gray-500 mb-3 text-sm line-clamp-3">
											{striptags(article.content || article.excerpt)}
										</p>
										<a
											href="#"
											className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"
										>
											Đọc thêm <ArrowRight size={14} />
										</a>
									</div>
								</div>
							))}
						</div>

						{/* Pagination */}
						{totalPages > 1 && (
							<div className="flex justify-center items-center mt-12 space-x-3 text-gray-700">
								<button
									onClick={() => paginate(currentPage - 1)}
									disabled={currentPage === 1}
									className="p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									<ChevronLeft size={20} />
								</button>
								<span className="font-semibold text-sm">
									Trang {currentPage} / {totalPages}
								</span>
								<button
									onClick={() => paginate(currentPage + 1)}
									disabled={currentPage === totalPages}
									className="p-2 rounded-full bg-white hover:bg-gray-100 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
								>
									<ChevronRight size={20} />
								</button>
							</div>
						)}
					</main>
					<aside className="lg:col-span-1">
						<div className="lg:sticky lg:top-24 space-y-8">
							{/* Search Box */}
							<div className="bg-white border border-gray-200 rounded-lg p-5">
								<h3 className="text-lg font-bold mb-4 font-serif border-b border-gray-200 pb-2">
									Tìm Kiếm
								</h3>
								<div className="relative">
									<input
										type="text"
										placeholder="Search articles..."
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
										className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 pl-10 pr-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
									/>
									<Search
										className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
										size={18}
									/>
								</div>
							</div>

							{/* Recent Posts */}
							<div className="bg-white border border-gray-200 rounded-lg p-5">
								<h3 className="text-lg font-bold mb-4 font-serif border-b border-gray-200 pb-2">
									Mới nhất
								</h3>
								<ul className="space-y-3">
									{recentPosts.map((post) => (
										<li key={post.id}>
											<a
												href="#"
												className="text-gray-600 hover:text-black hover:underline transition-colors line-clamp-2 text-sm"
											>
												{post.title}
											</a>
										</li>
									))}
								</ul>
							</div>

							{/* Most Read */}
							<div className="bg-white border border-gray-200 rounded-lg p-5">
								<h3 className="text-lg font-bold mb-4 font-serif border-b border-gray-200 pb-2">
									Nổi bật
								</h3>
								<ul className="space-y-3">
									{mostReadPosts.map((post) => (
										<li key={post.id}>
											<a
												href="#"
												className="text-gray-600 hover:text-black hover:underline transition-colors line-clamp-2 text-sm"
											>
												{post.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</div>
					</aside>
				</div>
			</div>
		</section>
	);
};

export default Blog;
