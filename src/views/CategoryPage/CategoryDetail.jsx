import React, { useState } from "react";
import { Search, Filter, TrendingUp, FileText, Users, Clock } from "lucide-react";
import { CategoryCard } from "@/layouts/components/CategoryCard";
import { categories, documents } from "@/constant/mockData";

export const HomePage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredCategories = categories.filter(
		(category) =>
			category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			category.description.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const totalDocuments = documents.length;
	const recentDocuments = documents
		.sort((a, b) => new Date(b.uploadDate) - new Date(a.uploadDate))
		.slice(0, 3);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
			{/* Header */}
			<header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
					<div className="flex flex-col md:flex-row md:items-center md:justify-between">
						<div className="mb-4 md:mb-0">
							<h1 className="text-3xl font-bold text-gray-900 mb-2">
								Financial Document Center
							</h1>
							<p className="text-gray-600">
								Access comprehensive financial analysis and market reports
							</p>
						</div>

						<div className="flex items-center space-x-4">
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
								<input
									type="text"
									placeholder="Search categories..."
									value={searchTerm}
									onChange={(e) => setSearchTerm(e.target.value)}
									className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
								/>
							</div>
							<button className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
								<Filter className="w-5 h-5" />
								<span>Filter</span>
							</button>
						</div>
					</div>
				</div>
			</header>

			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{/* Stats Section */}
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
					<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm">Total Documents</p>
								<p className="text-2xl font-bold text-gray-900">{totalDocuments}</p>
							</div>
							<div className="p-3 bg-blue-50 rounded-lg">
								<FileText className="w-6 h-6 text-blue-600" />
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm">Categories</p>
								<p className="text-2xl font-bold text-gray-900">
									{categories.length}
								</p>
							</div>
							<div className="p-3 bg-green-50 rounded-lg">
								<TrendingUp className="w-6 h-6 text-green-600" />
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm">Active Users</p>
								<p className="text-2xl font-bold text-gray-900">1,247</p>
							</div>
							<div className="p-3 bg-purple-50 rounded-lg">
								<Users className="w-6 h-6 text-purple-600" />
							</div>
						</div>
					</div>

					<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-gray-500 text-sm">Last Updated</p>
								<p className="text-2xl font-bold text-gray-900">Today</p>
							</div>
							<div className="p-3 bg-orange-50 rounded-lg">
								<Clock className="w-6 h-6 text-orange-600" />
							</div>
						</div>
					</div>
				</div>

				{/* Categories Section */}
				<section className="mb-12">
					<div className="flex items-center justify-between mb-8">
						<h2 className="text-2xl font-bold text-gray-900">Document Categories</h2>
						<span className="text-sm text-gray-500">
							{filteredCategories.length} of {categories.length} categories
						</span>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
						{filteredCategories.map((category) => (
							<CategoryCard
								key={category.id}
								category={category}
							/>
						))}
					</div>

					{filteredCategories.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500 text-lg">
								No categories found matching your search.
							</p>
						</div>
					)}
				</section>

				{/* Recent Documents Section */}
				<section>
					<h2 className="text-2xl font-bold text-gray-900 mb-8">Recently Added</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{recentDocuments.map((document) => (
							<div
								key={document.id}
								className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
							>
								<div className="flex items-start justify-between mb-4">
									<div className="flex items-center space-x-3">
										<div className="p-2 bg-blue-50 rounded-lg">
											<FileText className="w-5 h-5 text-blue-600" />
										</div>
										<div>
											<h3 className="font-semibold text-gray-900">
												{document.title}
											</h3>
											<span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
												{document.category}
											</span>
										</div>
									</div>
								</div>
								<p className="text-gray-600 text-sm mb-4">{document.description}</p>
								<div className="flex items-center justify-between text-xs text-gray-500">
									<span>
										{new Date(document.uploadDate).toLocaleDateString()}
									</span>
									<span>{document.fileSize}</span>
								</div>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
};
