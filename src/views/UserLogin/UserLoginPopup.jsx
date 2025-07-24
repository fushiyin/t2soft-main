/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Eye, EyeOff, TrendingUp, ArrowRight, AlertCircle } from "lucide-react";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
	FacebookAuthProvider,
	TwitterAuthProvider,
	updateProfile,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "react-hot-toast";

const UserLoginPopup = () => {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [popupBlocked, setPopupBlocked] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const validateForm = () => {
		if (!formData.email) {
			toast.error("Email is required");
			return false;
		}

		if (!formData.password) {
			toast.error("Password is required");
			return false;
		}

		if (!isLogin && !formData.name) {
			toast.error("Name is required");
			return false;
		}

		if (!isLogin && formData.password !== formData.confirmPassword) {
			toast.error("Passwords do not match");
			return false;
		}

		if (!isLogin && formData.password.length < 6) {
			toast.error("Password must be at least 6 characters");
			return false;
		}

		return true;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		setLoading(true);
		try {
			if (isLogin) {
				await signInWithEmailAndPassword(auth, formData.email, formData.password);
				toast.success("Welcome back!");
			} else {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					formData.email,
					formData.password,
				);

				await updateProfile(userCredential.user, {
					displayName: formData.name,
				});

				toast.success("Account created successfully!");
			}
			navigate("/");
		} catch (error) {
			console.error("Authentication error:", error);
			let errorMessage = "Authentication failed";

			switch (error.code) {
				case "auth/user-not-found":
					errorMessage = "No account found with this email";
					break;
				case "auth/wrong-password":
					errorMessage = "Incorrect password";
					break;
				case "auth/email-already-in-use":
					errorMessage = "Email is already registered";
					break;
				case "auth/weak-password":
					errorMessage = "Password is too weak";
					break;
				case "auth/invalid-email":
					errorMessage = "Invalid email address";
					break;
				case "auth/too-many-requests":
					errorMessage = "Too many attempts. Please try again later";
					break;
				default:
					errorMessage = error.message;
			}

			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const handleSocialLogin = async (provider) => {
		setLoading(true);
		setPopupBlocked(false);

		try {
			let authProvider;
			switch (provider) {
				case "google":
					authProvider = new GoogleAuthProvider();
					authProvider.setCustomParameters({
						prompt: "select_account",
					});
					break;
				case "facebook":
					authProvider = new FacebookAuthProvider();
					authProvider.addScope("email");
					break;
				case "twitter":
					authProvider = new TwitterAuthProvider();
					break;
				default:
					throw new Error("Unknown provider");
			}

			// Try popup first, fallback to redirect if COOP error
			try {
				const result = await signInWithPopup(auth, authProvider);
				if (result) {
					toast.success(`Welcome! Signed in with ${provider}`);
					navigate("/");
				}
			} catch (popupError) {
				// Check if it's a COOP or popup-related error
				if (
					popupError.code === "auth/popup-blocked" ||
					popupError.code === "auth/popup-closed-by-user" ||
					popupError.message.includes("Cross-Origin-Opener-Policy") ||
					popupError.message.includes("window.closed")
				) {
					setPopupBlocked(true);
					toast.error(`Popup blocked. Please allow popups or use email login.`);
				} else {
					throw popupError; // Re-throw if it's a different error
				}
			}
		} catch (error) {
			console.error(`${provider} login error:`, error);
			let errorMessage = `Failed to sign in with ${provider}`;

			switch (error.code) {
				case "auth/popup-closed-by-user":
					errorMessage = "Sign in was cancelled";
					break;
				case "auth/popup-blocked":
					setPopupBlocked(true);
					errorMessage = "Popup was blocked. Please allow popups and try again";
					break;
				case "auth/account-exists-with-different-credential":
					errorMessage = "Account exists with different sign-in method";
					break;
				case "auth/operation-not-allowed":
					errorMessage = `${provider} sign in is not enabled`;
					break;
				case "auth/too-many-requests":
					errorMessage = "Too many requests. Please try again later";
					break;
				default:
					if (error.message.includes("Cross-Origin-Opener-Policy")) {
						setPopupBlocked(true);
						errorMessage =
							"Browser security settings prevent popup login. Please use email login or enable popups.";
					} else {
						errorMessage = error.message;
					}
			}

			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	const toggleMode = () => {
		setIsLogin(!isLogin);
		setFormData({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
		setPopupBlocked(false);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-[#070e20] via-[#0a1628] to-[#1e3a8a] flex items-center justify-center px-4 py-8">
			<div className="w-full max-w-md">
				{/* Logo and Header */}
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
					<h1 className="text-3xl font-bold text-white mb-2">
						{isLogin ? "Welcome Back!" : "Create Account"}
					</h1>
					<p className="text-gray-400">
						{isLogin
							? "Sign in to access your trading dashboard"
							: "Join us and start your trading journey"}
					</p>
				</div>

				{/* Main Form Card */}
				<div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-gray-700/50">
					{/* Popup Warning */}
					{popupBlocked && (
						<div className="mb-6 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg flex items-start">
							<AlertCircle className="h-5 w-5 text-orange-400 mr-3 mt-0.5 flex-shrink-0" />
							<div className="text-sm">
								<p className="text-orange-300 font-medium mb-1">Popup Blocked</p>
								<p className="text-orange-200">
									Your browser blocked the login popup. Please enable popups for
									this site or use email login below.
								</p>
							</div>
						</div>
					)}

					{/* Social Login Buttons */}
					<div className="space-y-3 mb-6">
						<button
							onClick={() => handleSocialLogin("google")}
							disabled={loading}
							className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
						>
							<svg
								className="w-5 h-5 mr-2"
								viewBox="0 0 24 24"
							>
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							Continue with Google
						</button>

						{/* <div className="grid grid-cols-2 gap-3">
							<button
								onClick={() => handleSocialLogin("facebook")}
								disabled={loading}
								className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
							>
								<svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
								Facebook
							</button>

							<button
								onClick={() => handleSocialLogin("twitter")}
								disabled={loading}
								className="flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
							>
								<svg className="w-5 h-5 mr-2" fill="#1DA1F2" viewBox="0 0 24 24">
									<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
								</svg>
								Twitter
							</button>
						</div> */}
					</div>

					{/* Divider */}
					<div className="relative mb-6">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-600"></div>
						</div>
						<div className="relative flex justify-center text-sm">
							<span className="px-2 bg-gray-800 text-gray-400">
								Or continue with email
							</span>
						</div>
					</div>

					{/* Email/Password Form */}
					<form
						onSubmit={handleSubmit}
						className="space-y-4"
					>
						{!isLogin && (
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-2">
									Full Name
								</label>
								<div className="relative">
									<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
									<input
										type="text"
										name="name"
										value={formData.name}
										onChange={handleInputChange}
										className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
										placeholder="Enter your full name"
										required={!isLogin}
									/>
								</div>
							</div>
						)}

						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Email Address
							</label>
							<div className="relative">
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
								<input
									type="email"
									name="email"
									value={formData.email}
									onChange={handleInputChange}
									className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
									placeholder="Enter your email address"
									required
								/>
							</div>
						</div>

						<div>
							<label className="block text-sm font-medium text-gray-300 mb-2">
								Password
							</label>
							<div className="relative">
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
								<input
									type={showPassword ? "text" : "password"}
									name="password"
									value={formData.password}
									onChange={handleInputChange}
									className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
									placeholder="Enter your password"
									required
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
						</div>

						{!isLogin && (
							<div>
								<label className="block text-sm font-medium text-gray-300 mb-2">
									Confirm Password
								</label>
								<div className="relative">
									<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
									<input
										type={showConfirmPassword ? "text" : "password"}
										name="confirmPassword"
										value={formData.confirmPassword}
										onChange={handleInputChange}
										className="w-full pl-10 pr-12 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
										placeholder="Confirm your password"
										required={!isLogin}
									/>
									<button
										type="button"
										onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
									>
										{showConfirmPassword ? (
											<EyeOff className="h-5 w-5" />
										) : (
											<Eye className="h-5 w-5" />
										)}
									</button>
								</div>
							</div>
						)}

						{isLogin && (
							<div className="flex items-center justify-between">
								<label className="flex items-center">
									<input
										type="checkbox"
										checked={rememberMe}
										onChange={(e) => setRememberMe(e.target.checked)}
										className="h-4 w-4 text-green-500 focus:ring-green-500 border-gray-600 rounded bg-gray-700"
									/>
									<span className="ml-2 text-sm text-gray-300">Remember me</span>
								</label>
								<Link
									to="/forgot-password"
									className="text-sm text-green-400 hover:text-green-300 transition-colors"
								>
									Forgot password?
								</Link>
							</div>
						)}

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
						>
							{loading ? (
								<div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
							) : (
								<>
									{isLogin ? "Sign In" : "Create Account"}
									<ArrowRight className="ml-2 h-5 w-5" />
								</>
							)}
						</button>
					</form>

					{/* Toggle Mode */}
					<div className="mt-6 text-center">
						<p className="text-gray-400">
							{isLogin ? "Don't have an account?" : "Already have an account?"}
							<button
								onClick={toggleMode}
								className="ml-1 text-green-400 hover:text-green-300 font-medium transition-colors"
							>
								{isLogin ? "Sign up" : "Sign in"}
							</button>
						</p>
					</div>
				</div>

				{/* Footer */}
				<div className="mt-8 text-center">
					<p className="text-sm text-gray-400">
						By continuing, you agree to our{" "}
						<Link
							to="/terms"
							className="text-green-400 hover:text-green-300"
						>
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link
							to="/privacy"
							className="text-green-400 hover:text-green-300"
						>
							Privacy Policy
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserLoginPopup;
