import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, CheckCircle, TrendingUp } from "lucide-react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [emailSent, setEmailSent] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email) {
			toast.error("Please enter your email address");
			return;
		}

		setLoading(true);
		try {
			await sendPasswordResetEmail(auth, email);
			setEmailSent(true);
			toast.success("Password reset email sent!");
		} catch (error) {
			console.error("Password reset error:", error);
			let errorMessage = "Failed to send reset email";

			switch (error.code) {
				case "auth/user-not-found":
					errorMessage = "No account found with this email address";
					break;
				case "auth/invalid-email":
					errorMessage = "Invalid email address";
					break;
				case "auth/too-many-requests":
					errorMessage = "Too many requests. Please try again later";
					break;
				default:
					errorMessage = error.message;
			}

			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	if (emailSent) {
		return (
			<div className="min-h-screen bg-gradient-to-br from-[#070e20] via-[#0a1628] to-[#1e3a8a] flex items-center justify-center px-4 py-8">
				<div className="w-full max-w-md">
					<div className="text-center mb-8">
						<Link
							to="/"
							className="inline-flex items-center space-x-2 mb-6"
						>
							<div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
								<TrendingUp className="h-6 w-6 text-white" />
							</div>
							<span className="text-xl font-bold text-white">TradeMaster</span>
						</Link>
					</div>

					<div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50 text-center">
						<div className="mb-6">
							<CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4" />
							<h1 className="text-2xl font-bold text-white mb-2">Email Sent!</h1>
							<p className="text-gray-400">
								We've sent a password reset link to{" "}
								<span className="text-green-400 font-medium">{email}</span>
							</p>
						</div>

						<div className="space-y-4">
							<p className="text-sm text-gray-400">
								Check your email and follow the instructions to reset your password.
							</p>
							<p className="text-sm text-gray-400">
								Didn't receive the email? Check your spam folder or{" "}
								<button
									onClick={() => setEmailSent(false)}
									className="text-green-400 hover:text-green-300 underline"
								>
									try again
								</button>
							</p>
						</div>

						<Link
							to="/user-login"
							className="inline-flex items-center justify-center w-full mt-6 px-4 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
						>
							<ArrowLeft className="h-5 w-5 mr-2" />
							Back to Login
						</Link>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#070e20] via-[#0a1628] to-[#1e3a8a] flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md">
				<div className="text-center mb-8">
					<Link
						to="/"
						className="inline-flex items-center space-x-2 mb-6"
					>
						<div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
							<TrendingUp className="h-6 w-6 text-white" />
						</div>
						<span className="text-xl font-bold text-white">TradeMaster</span>
					</Link>
					<h1 className="text-3xl font-bold text-white mb-2">Forgot Password?</h1>
					<p className="text-gray-400">
						Enter your email address and we'll send you a link to reset your password.
					</p>
				</div>

				<div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50">
					<form
						onSubmit={handleSubmit}
						className="space-y-6"
					>
						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Email Address
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
									placeholder="Enter your email address"
									required
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
						>
							{loading ? (
								<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
							) : (
								"Send Reset Email"
							)}
						</button>
					</form>

					<div className="mt-6 text-center">
						<Link
							to="/user-login"
							className="inline-flex items-center text-green-400 hover:text-green-300 transition-colors duration-200 font-medium"
						>
							<ArrowLeft className="h-4 w-4 mr-1" />
							Back to Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
