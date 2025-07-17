import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorMessage = ({ message, onRetry }) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-[400px] text-center">
			<div className="w-16 h-16 border-2 border-red-200 flex items-center justify-center mb-6">
				<AlertCircle className="w-8 h-8 text-red-500" />
			</div>

			<h3 className="text-xl font-bold text-gray-900 mb-4 font-mono">
				ERROR LOADING COURSES
			</h3>

			<p className="text-gray-600 mb-8 max-w-md font-mono">{message}</p>

			{onRetry && (
				<button
					onClick={onRetry}
					className="flex items-center space-x-3 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 group"
				>
					<RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
					<span className="font-mono font-medium">RETRY</span>
				</button>
			)}
		</div>
	);
};

export default ErrorMessage;
