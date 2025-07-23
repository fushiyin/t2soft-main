import { categories, documents } from "@/constant/mockData";
import { useState } from "react";

const CategoryPage = ({ onDocumentClick }) => {
	const [selectedCategory, setSelectedCategory] = useState("All");
	const [searchTerm, setSearchTerm] = useState("");

	const filteredDocuments = documents.filter((doc) => {
		const matchesCategory = selectedCategory === "All" || doc.category === selectedCategory;
		const matchesSearch =
			doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
		return matchesCategory && matchesSearch;
	});

	const getCategoryColor = (categoryName) => {
		const category = categories.find((cat) => cat.name === categoryName);
		return category ? category.color : "#6b7280";
	};

	return (
		<div className="min-h-screen bg-gray-50 pt-16">
			{/* Header */}
			<div className="bg-white shadow-sm border-b">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
					<div className="text-center">
						<h1 className="text-4xl font-bold text-gray-900 mb-4">Document Library</h1>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Explore our comprehensive collection of financial analysis, market
							insights, and trading guides organized by category.
						</p>
					</div>
				</div>
			</div>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Search Bar */}
				<div className="mb-8">
					<div className="relative max-w-md mx-auto">
						<input
							type="text"
							placeholder="Search documents..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
						/>
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center">
							<svg
								className="h-5 w-5 text-gray-400"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
								/>
							</svg>
						</div>
					</div>
				</div>

				{/* Category Filters */}
				<div className="mb-8">
					<div className="flex flex-wrap justify-center gap-3">
						{categories.map((category) => (
							<button
								key={category.name}
								onClick={() => setSelectedCategory(category.name)}
								className={`px-6 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 ${
									selectedCategory === category.name
										? "text-white shadow-lg"
										: "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
								}`}
								style={{
									backgroundColor:
										selectedCategory === category.name
											? category.color
											: undefined,
								}}
							>
								{category.name}
								<span className="ml-2 px-2 py-1 bg-white bg-opacity-20 rounded-full text-xs">
									{category.count}
								</span>
							</button>
						))}
					</div>
				</div>

				{/* Documents Grid */}
				{filteredDocuments.length === 0 ? (
					<div className="text-center py-16">
						<svg
							className="mx-auto h-16 w-16 text-gray-400 mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1}
								d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
							/>
						</svg>
						<h3 className="text-lg font-medium text-gray-900 mb-2">
							No documents found
						</h3>
						<p className="text-gray-500">
							Try adjusting your search or filter criteria.
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{filteredDocuments.map((document) => (
							<div
								key={document.id}
								onClick={() => onDocumentClick(document)}
								className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200"
							>
								<div className="p-6">
									{/* Category Badge */}
									<div className="flex items-center justify-between mb-4">
										<span
											className="px-3 py-1 rounded-full text-xs font-medium text-white"
											style={{
												backgroundColor: getCategoryColor(
													document.category,
												),
											}}
										>
											{document.category}
										</span>
										<span className="text-xs text-gray-500">
											{document.readTime}
										</span>
									</div>

									{/* Title */}
									<h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
										{document.title}
									</h3>

									{/* Description */}
									<p className="text-gray-600 mb-4 line-clamp-3">
										{document.description}
									</p>

									{/* Tags */}
									<div className="flex flex-wrap gap-2 mb-4">
										{document.tags.slice(0, 3).map((tag, index) => (
											<span
												key={index}
												className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
											>
												{tag}
											</span>
										))}
									</div>

									{/* Footer */}
									<div className="flex items-center justify-between text-sm text-gray-500 border-t pt-4">
										<span>By {document.author}</span>
										<span>{new Date(document.date).toLocaleDateString()}</span>
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default CategoryPage;
