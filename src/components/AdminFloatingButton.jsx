import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Settings, X, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useRole";
import { idRouter } from "@/routes/idRouter";

const AdminFloatingButton = () => {
	const { isAdmin } = useAuth();
	const location = useLocation();
	const [isExpanded, setIsExpanded] = useState(false);

	// Only show on home page for admin users

	return (
		<div className="fixed bottom-6 right-6 z-50">
			{/* Expanded Menu */}
			{isExpanded && (
				<div className="mb-4 bg-gray-800 rounded-lg shadow-2xl border border-gray-700 p-4 min-w-[200px]">
					<div className="flex items-center justify-between mb-3">
						<h3 className="text-white font-semibold text-sm">Admin Tools</h3>
						<button
							onClick={() => setIsExpanded(false)}
							className="text-gray-400 hover:text-white transition-colors"
						>
							<X className="h-4 w-4" />
						</button>
					</div>

					<div className="space-y-2">
						<Link
							to={`${idRouter.admin}/${idRouter.adminDashboard}`}
							className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 text-sm"
							onClick={() => setIsExpanded(false)}
						>
							<Settings className="h-4 w-4" />
							<span>Dashboard</span>
						</Link>

						<Link
							to={`${idRouter.admin}/${idRouter.adminPosts}`}
							className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 text-sm"
							onClick={() => setIsExpanded(false)}
						>
							<span className="h-4 w-4 flex items-center justify-center">📝</span>
							<span>Posts</span>
						</Link>

						<Link
							to={`${idRouter.admin}/${idRouter.adminSettings}`}
							className="flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md transition-all duration-200 text-sm"
							onClick={() => setIsExpanded(false)}
						>
							<span className="h-4 w-4 flex items-center justify-center">⚙️</span>
							<span>Settings</span>
						</Link>
					</div>
				</div>
			)}

			{/* Main Floating Button */}
			<button
				onClick={() => setIsExpanded(!isExpanded)}
				className={`
					group relative bg-gradient-to-r from-purple-500 to-purple-600 
					hover:from-purple-400 hover:to-purple-500 text-white 
					p-4 rounded-full shadow-lg hover:shadow-xl 
					transition-all duration-300 transform hover:scale-110 
					border-2 border-purple-400/20 backdrop-blur-sm
					${isExpanded ? "rotate-45" : "hover:rotate-12"}
				`}
			>
				<Settings className="h-6 w-6" />

				{/* Tooltip */}
				{!isExpanded && (
					<div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
						<div className="flex items-center space-x-2">
							<Shield className="h-4 w-4" />
							<span>Admin Tools</span>
						</div>
						{/* Arrow */}
						<div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-800 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
					</div>
				)}
			</button>
		</div>
	);
};

export default AdminFloatingButton;
