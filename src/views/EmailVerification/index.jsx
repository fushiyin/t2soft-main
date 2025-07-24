import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, XCircle, Mail, TrendingUp } from "lucide-react";
import { applyActionCode } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";

const EmailVerification = () => {
	const [verificationStatus, setVerificationStatus] = useState("verifying"); // verifying, success, error
	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		const verifyEmail = async () => {
			try {
				// Get the action code from URL parameters
				const urlParams = new URLSearchParams(window.location.search);
				const actionCode = urlParams.get("oobCode");

				if (!actionCode) {
					setVerificationStatus("error");
					setErrorMessage("Invalid verification link. Please try again or request a new verification email.");
					return;
				}

				// Apply the email verification
				await applyActionCode(auth, actionCode);
				setVerificationStatus("success");
				toast.success("Email verified successfully! You can now log in.");
			} catch (error) {
				console.error("Email verification error:", error);
				setVerificationStatus("error");
				
				switch (error.code) {
					case "auth/expired-action-code":
						setErrorMessage("Verification link has expired. Please request a new one.");
						break;
					case "auth/invalid-action-code":
						setErrorMessage("Invalid verification link. Please request a new one.");
						break;
					case "auth/user-disabled":
						setErrorMessage("This account has been disabled. Please contact support.");
						break;
					case "auth/user-not-found":
						setErrorMessage("No account found. Please create a new account.");
						break;
					default:
						setErrorMessage("Failed to verify email. Please try again or contact support.");
				}
			}
		};

		verifyEmail();
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#070e20] via-[#0a1628] to-[#1e3a8a] flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md">
				{/* Logo and Header */}
				<div className="text-center mb-8">
					<Link to="/" className="inline-flex items-center space-x-2 mb-6">
						<div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
							<TrendingUp className="h-6 w-6 text-white" />
						</div>
						<span className="text-xl font-bold text-white">TradeMaster</span>
					</Link>
				</div>

				{/* Verification Status Card */}
				<div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50">
					<div className="text-center">
						{verificationStatus === "verifying" && (
							<>
								<div className="mb-4">
									<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
								</div>
								<h1 className="text-2xl font-bold text-white mb-2">
									Verifying Email
								</h1>
								<p className="text-gray-400">
									Please wait while we verify your email address...
								</p>
							</>
						)}

						{verificationStatus === "success" && (
							<>
								<div className="mb-4">
									<CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
								</div>
								<h1 className="text-2xl font-bold text-white mb-2">
									Email Verified!
								</h1>
								<p className="text-gray-400 mb-6">
									Your email has been successfully verified. You can now log in to your account.
								</p>
								<Link
									to="/user-login"
									className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200"
								>
									Continue to Login
								</Link>
							</>
						)}

						{verificationStatus === "error" && (
							<>
								<div className="mb-4">
									<XCircle className="h-12 w-12 text-red-500 mx-auto" />
								</div>
								<h1 className="text-2xl font-bold text-white mb-2">
									Verification Failed
								</h1>
								<p className="text-gray-400 mb-6">
									{errorMessage}
								</p>
								<div className="space-y-3">
									<Link
										to="/login"
										className="block w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-200 text-center"
									>
										Go to Login
									</Link>
									<Link
										to="/contact"
										className="block w-full px-6 py-3 border border-gray-600 text-gray-300 hover:bg-gray-700 rounded-lg transition-all duration-200 text-center"
									>
										Contact Support
									</Link>
								</div>
							</>
						)}
					</div>
				</div>

				{/* Additional Info */}
				<div className="mt-8 text-center">
					<p className="text-sm text-gray-400">
						Having trouble with verification?{" "}
						<Link to="/contact" className="text-green-400 hover:text-green-300">
							Contact our support team
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default EmailVerification;
