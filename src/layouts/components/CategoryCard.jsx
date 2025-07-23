import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText } from "lucide-react";

export const CategoryCard = ({ category }) => {
	return (
		<Link
			to={`/category/${category.id}`}
			className="block"
		>
			<div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
				<div
					className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white text-2xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300`}
				>
					{category.icon}
				</div>

				<div className="mb-4">
					<h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
						{category.name}
					</h3>
					<p className="text-gray-600 text-sm leading-relaxed">{category.description}</p>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center space-x-2 text-sm text-gray-500">
						<FileText className="w-4 h-4" />
						<span>{category.documentCount} documents</span>
					</div>
					<div className="flex items-center text-blue-600 group-hover:text-blue-700 transition-colors">
						<span className="text-sm font-medium mr-1">View all</span>
						<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</div>
				</div>
			</div>
		</Link>
	);
};
