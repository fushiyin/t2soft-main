import React from "react";
import { Download, FileText, Calendar, HardDrive } from "lucide-react";

export const DocumentCard = ({ document }) => {
	const getFileTypeColor = (fileType) => {
		switch (fileType.toLowerCase()) {
			case "pdf":
				return "bg-red-100 text-red-800";
			case "xlsx":
			case "xls":
				return "bg-green-100 text-green-800";
			case "docx":
			case "doc":
				return "bg-blue-100 text-blue-800";
			default:
				return "bg-gray-100 text-gray-800";
		}
	};

	return (
		<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
			<div className="flex items-start justify-between mb-4">
				<div className="flex items-center space-x-3">
					<div className="p-2 bg-blue-50 rounded-lg">
						<FileText className="w-5 h-5 text-blue-600" />
					</div>
					<div>
						<h3 className="font-semibold text-gray-900 text-lg">{document.title}</h3>
						<span
							className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getFileTypeColor(document.fileType)}`}
						>
							{document.fileType}
						</span>
					</div>
				</div>
				<button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
					<Download className="w-5 h-5" />
				</button>
			</div>

			<p className="text-gray-600 mb-4 leading-relaxed">{document.description}</p>

			<div className="flex items-center justify-between text-sm text-gray-500">
				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-1">
						<Calendar className="w-4 h-4" />
						<span>{new Date(document.uploadDate).toLocaleDateString()}</span>
					</div>
					<div className="flex items-center space-x-1">
						<HardDrive className="w-4 h-4" />
						<span>{document.fileSize}</span>
					</div>
				</div>
			</div>
		</div>
	);
};
