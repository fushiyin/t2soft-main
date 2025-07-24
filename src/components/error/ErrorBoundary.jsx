/* eslint-disable */
import React from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hasError: false,
			error: null,
			errorInfo: null,
		};
	}

	static getDerivedStateFromError() {
		return { hasError: true };
	}

	componentDidCatch(error, errorInfo) {
		console.error("ErrorBoundary caught an error:", error, errorInfo);
		this.setState({
			error: error,
			errorInfo: errorInfo,
		});
		toast.error("An unexpected error occurred!");
	}

	handleRetry = () => {
		this.setState({
			hasError: false,
			error: null,
			errorInfo: null,
		});
	};

	handleGoHome = () => {
		window.location.href = "/";
	};

	render() {
		if (this.state.hasError) {
			const { customFallback: CustomFallback } = this.props;

			if (CustomFallback) {
				return (
					<CustomFallback
						error={this.state.error}
						errorInfo={this.state.errorInfo}
						onRetry={this.handleRetry}
						onGoHome={this.handleGoHome}
					/>
				);
			}

			return (
				<div className="min-h-screen bg-gradient-to-br from-[#070e20] via-[#0a1628] to-[#1e3a8a] flex items-center justify-center px-4 py-8">
					<div className="w-full max-w-2xl">
						<div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50 text-center">
							<div className="mb-6">
								<AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
								<h1 className="text-3xl font-bold text-white mb-2">
									Oops! Something went wrong
								</h1>
								<p className="text-gray-400 text-lg">
									We encountered an unexpected error. Our team has been notified.
								</p>
							</div>

							<div className="flex flex-col sm:flex-row gap-4 justify-center">
								<button
									onClick={this.handleRetry}
									className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
								>
									<RefreshCw className="h-5 w-5 mr-2" />
									Try Again
								</button>
								<button
									onClick={this.handleGoHome}
									className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200"
								>
									<Home className="h-5 w-5 mr-2" />
									Go Home
								</button>
							</div>

							<div className="mt-6 pt-6 border-t border-gray-600">
								<p className="text-sm text-gray-400">
									If this problem persists, please contact support with error code: 
									<span className="font-mono text-green-400 ml-1">
										{Date.now().toString(36)}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
