import React from "react";

const LoadingSpinner = () => {
	return (
		<div className="flex items-center justify-center min-h-[400px]">
			<div className="relative">
				<div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin"></div>
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin animate-reverse"></div>
				</div>
			</div>
			<div className="ml-6">
				<div className="text-lg font-mono font-bold text-gray-900 mb-2">
					LOADING COURSES
				</div>
				<div className="text-sm font-mono text-gray-500">Fetching YouTube playlists...</div>
			</div>
		</div>
	);
};

export default LoadingSpinner;
