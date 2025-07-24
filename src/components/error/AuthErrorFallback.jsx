/* eslint-disable */
import React from "react";
import { AlertTriangle, LogIn, Home } from "lucide-react";
import { Link } from "react-router-dom";

const AuthErrorFallback = ({ error, onRetry }) => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-[#070e20] via-[#0a1628] to-[#1e3a8a] flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md">
				<div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50 text-center">
					<div className="mb-6">
						<AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
						<h1 className="text-2xl font-bold text-white mb-2">
							Authentication Error
						</h1>
						<p className="text-gray-400">
							Something went wrong with the authentication system.
						</p>
					</div>

					<div className="space-y-4">
						<button
							onClick={onRetry}
							className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200"
						>
							Try Again
						</button>
						
						<Link
							to="/user-login"
							className="w-full inline-flex items-center justify-center px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200"
						>
							<LogIn className="h-5 w-5 mr-2" />
							Back to Login
						</Link>
						
						<Link
							to="/"
							className="w-full inline-flex items-center justify-center px-4 py-3 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg transition-all duration-200"
						>
							<Home className="h-5 w-5 mr-2" />
							Go Home
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthErrorFallback;
