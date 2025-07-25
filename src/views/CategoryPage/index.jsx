import React, { useState, useEffect } from "react";
import { Search, Filter, Download, Eye, User, FileText, Calendar, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "@/components/Loading/LoadingSpinner.jsx";
import { fetchDocuments, incrementDocumentDownload } from "@/lib/api";

const CategoryPage = ({ onDocumentClick }) => {
	const { t } = useTranslation();
	const [selectedCategory, setSelectedCategory] = useState("Tất cả");
	const [searchTerm, setSearchTerm] = useState("");
	const [documents, setDocuments] = useState([]);
	const [categories, setCategories] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchDocumentsData();
	}, []);

	const fetchDocumentsData = async () => {
		setLoading(true);
		setError(null);

		try {
			console.log("🔄 Attempting to fetch documents from Firebase API...");
			const response = await fetchDocuments();

			if (response.data.success && response.data.data.length > 0) {
				console.log(response.data.data);
				setDocuments(response.data.data);

				const categoryCount = response.data.data.reduce((acc, doc) => {
					acc[doc.category] = (acc[doc.category] || 0) + 1;
					return acc;
				}, {});

				const calculatedCategories = [
					{ name: "Tất cả", count: response.data.data.length, color: "#6b7280" },
					...Object.entries(categoryCount).map(([name, count]) => ({
						name,
						count,
						color: "#6b7280",
					})),
				];

				setCategories(calculatedCategories);
			} else {
				throw new Error("No documents found");
			}
		} catch (apiError) {
			console.warn("⚠️ Documents API failed, falling back to mock data:", apiError.message);
			setError(null);
		} finally {
			setLoading(false);
		}
	};

	const filteredDocuments = documents.filter((doc) => {
		const matchesCategory = selectedCategory === "Tất cả" || doc?.category === selectedCategory;
		const matchesSearch =
			doc?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			doc?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			doc?.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));
		return matchesCategory && matchesSearch;
	});

	const getCategoryColor = (categoryName) => {
		const colors = {
			Trading: "#059669",
			Analysis: "#0284c7",
			Education: "#7c3aed",
			Research: "#dc2626",
			Market: "#ea580c",
		};
		return colors[categoryName] || "#6b7280";
	};

	const formatFileSize = (bytes) => {
		if (bytes === 0) return "0 Bytes";
		const k = 1024;
		const sizes = ["Bytes", "KB", "MB", "GB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
			day: "numeric",
		});
	};

	const handleDownload = async (document) => {
		try {
			await incrementDocumentDownload(document.id);
			window.open(document.fileUrl, "_blank");
		} catch (error) {
			console.error("Error downloading document:", error);
			// Still allow download even if count increment fails
			window.open(document.fileUrl, "_blank");
		}
	};

	return (
		<>
			{/* Professional Educational Header */}
			<section className="relative py-20 pt-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
				{/* Subtle Grid Pattern */}
				<div className="absolute inset-0 opacity-30">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23475569' fill-opacity='0.1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20h-2zM0 20h2v20H0V20zm4 0h2v20H4V20zm4 0h2v20H8V20zm4 0h2v20h-2V20zm4 0h2v20h-2V20zm4 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2zm0 4h20v2H20v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
						}}
					></div>
				</div>

				<div className="max-w-7xl mx-auto px-6 relative z-10">
					<div className="text-center max-w-4xl mx-auto">
						<h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
							Thư Viện <span className="text-blue-600">Tài liệu</span>
						</h1>
						<p className="text-lg md:text-xl text-slate-600 mb-8 leading-relaxed">
							Khám phá bộ sưu tập tài liệu chuyên sâu về giao dịch, phân tích thị
							trường và đào tạo. Tất cả tài liệu đều được cung cấp miễn phí và có thể
							tải xuống để hỗ trợ bạn trong hành trình giao dịch của mình.
						</p>
					</div>
				</div>
			</section>

			<section className="bg-white py-6 md:py-20">
				<div className="max-w-7xl mx-auto px-6">
					{/* Enhanced Search and Filter Bar */}
					<div className="bg-slate-50 rounded-3xl p-6 md:p-8 mb-5 md:mb-12 border border-slate-200">
						<div className="flex flex-col md:flex-row gap-4 md:gap-6 items-stretch md:items-center">
							{/* Search */}
							<div className="flex-1 max-w-2xl">
								<div className="relative">
									<Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
									<input
										type="text"
										placeholder="Tìm kiếm"
										className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm transition-all duration-200 shadow-sm placeholder:text-slate-400"
										value={searchTerm}
										onChange={(e) => setSearchTerm(e.target.value)}
									/>
								</div>
							</div>

							{/* Category Filter */}
							<div className="flex items-center gap-3 min-w-fit">
								<Filter className="h-5 w-5 text-slate-500" />
								<select
									className="px-4 py-4 bg-white border border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:outline-none text-sm transition-all duration-200 shadow-sm min-w-[160px]"
									value={selectedCategory}
									onChange={(e) => setSelectedCategory(e.target.value)}
								>
									{categories?.map((category) => (
										<option
											key={category.name}
											value={category.name}
										>
											{category.name} ({category.count})
										</option>
									))}
								</select>
							</div>
						</div>
					</div>

					{loading ? (
						<div className="flex justify-center py-20">
							<LoadingSpinner />
						</div>
					) : error ? (
						<div className="text-center py-20">
							<p className="text-slate-600">{error}</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{filteredDocuments?.map((document) => (
								<article
									key={document.id}
									className="group cursor-pointer bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-slate-200 hover:-translate-y-1"
								>
									{/* Document Header */}
									<div className="relative p-6 bg-gradient-to-br from-slate-50 to-blue-50">
										{/* Category Badge */}
										<div className="flex items-center justify-between mb-4">
											<span
												className="px-3 py-1.5 rounded-full text-xs font-semibold text-white shadow-sm"
												style={{
													backgroundColor: getCategoryColor(
														document.category,
													),
												}}
											>
												{document.category}
											</span>
											<div className="flex items-center gap-1 text-xs text-slate-500">
												<Clock className="h-3 w-3" />
												<span>{document.readTime || "5 min read"}</span>
											</div>
										</div>

										{/* File Type Icon */}
										<div className="text-center mb-4">
											<div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-200">
												<FileText className="h-8 w-8 text-slate-600" />
											</div>
										</div>
									</div>

									{/* Document Content */}
									<div className="p-6 pt-0">
										<h3 className="font-bold text-slate-800 text-lg leading-tight mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
											{document.title}
										</h3>

										<p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3">
											{document.description}
										</p>

										{/* Tags */}
										<div className="flex flex-wrap gap-2 mb-6">
											{document?.tags?.slice(0, 3)?.map((tag, index) => (
												<span
													key={index}
													className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs rounded-lg font-medium"
												>
													{tag}
												</span>
											))}
										</div>

										{/* Document Meta */}
										<div className="flex items-center justify-between text-xs text-slate-500 mb-6 pt-4 border-t border-slate-100">
											<div className="flex items-center gap-4">
												<span className="flex items-center gap-1.5">
													<Download className="h-3 w-3" />
													{document.downloadCount || 0}
												</span>
												<span className="flex items-center gap-1.5">
													<Calendar className="h-3 w-3" />
													{formatDate(document.uploadDate || new Date())}
												</span>
											</div>
											<span className="font-medium">
												{formatFileSize(document.fileSize)}
											</span>
										</div>

										{/* Action Buttons */}
										<div className="flex gap-3">
											<button
												onClick={() => handleDownload(document)}
												className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl text-sm font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-lg"
											>
												<Download className="h-4 w-4" />
												Tải xuống
											</button>
											<button
												onClick={() =>
													onDocumentClick && onDocumentClick(document)
												}
												className="px-4 py-3 bg-slate-100 text-slate-700 rounded-2xl text-sm font-semibold hover:bg-slate-200 transition-all duration-300 flex items-center justify-center"
											>
												<Eye className="h-4 w-4" />
											</button>
										</div>
									</div>
								</article>
							))}
						</div>
					)}

					{/* No Results State */}
					{!loading && !error && filteredDocuments.length === 0 && (
						<div className="text-center my:8 md:py-20">
							<div className="rounded-3xl p-12 max-w-md mx-auto">
								<FileText className="mx-auto h-16 w-16 text-slate-400 mb-6" />
								<h3 className="text-xl font-semibold text-slate-800 mb-3">
									No documents found
								</h3>
								<p className="text-slate-600 mb-6">
									Try adjusting your search terms or browse different categories.
								</p>
								<button
									onClick={() => {
										setSearchTerm("");
										setSelectedCategory("Tất cả");
									}}
									className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-semibold hover:bg-blue-700 transition-colors"
								>
									Reset Filters
								</button>
							</div>
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default CategoryPage;
