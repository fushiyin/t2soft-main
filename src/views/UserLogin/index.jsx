/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	Mail,
	Lock,
	User,
	Eye,
	EyeOff,
	TrendingUp,
	ArrowRight,
} from "lucide-react";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signInWithPopup,
	signInWithRedirect,
	getRedirectResult,
	GoogleAuthProvider,
	FacebookAuthProvider,
	TwitterAuthProvider,
	updateProfile,
	sendEmailVerification,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { idRouter } from "@/routes/idRouter";

const UserLogin = () => {
	const navigate = useNavigate();
	const [isLogin, setIsLogin] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);
	const [showResendVerification, setShowResendVerification] = useState(false);

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	// Handle any initialization if needed
	useEffect(() => {
		// Check for redirect result on component mount (for Google auth redirect fallback)
		const checkRedirectResult = async () => {
			try {
				const result = await getRedirectResult(auth);
				if (result && result.user) {
					// User successfully signed in with redirect
					await createUserProfile(result.user);
					toast.success("Welcome! Signed in successfully");
					navigate("/");
				}
			} catch (error) {
				console.error("Redirect result error:", error);
				if (error.code !== "auth/redirect-cancelled-by-user") {
					toast.error("Authentication failed. Please try again.");
				}
			}
		};

		checkRedirectResult();
	}, [navigate]);

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

	// Create user profile in Firestore for social login users
	const createUserProfile = async (user) => {
		try {
			const userDocRef = doc(db, "users", user.uid);
			const userDoc = await getDoc(userDocRef);
			
			// Only create if document doesn't exist
			if (!userDoc.exists()) {
				const userData = {
					uid: user.uid,
					email: user.email,
					firstName: user.displayName?.split(' ')[0] || 'User',
					lastName: user.displayName?.split(' ').slice(1).join(' ') || '',
					displayName: user.displayName || user.email,
					avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || user.email)}&background=random`,
					bio: `Welcome ${user.displayName || user.email}! Complete your profile to get started.`,
					role: "student", // Default role for social login users
					isActive: true,
					emailVerified: user.emailVerified,
					phone: user.phoneNumber || null,
					location: {
						country: null,
						city: null,
						timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
					},
					preferences: {
						newsletter: true,
						notifications: true,
						language: "en",
						theme: "dark",
					},
					social: {
						twitter: null,
						linkedin: null,
						github: null,
					},
					stats: {
						coursesEnrolled: 0,
						coursesCompleted: 0,
						totalWatchTime: 0,
						streak: 0,
					},
					lastLogin: new Date(),
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				
				await setDoc(userDocRef, userData);
				console.log("✅ Created Firestore profile for social login user");
			} else {
				// Update last login time
				await setDoc(userDocRef, { 
					lastLogin: new Date(),
					updatedAt: new Date() 
				}, { merge: true });
			}
		} catch (error) {
			console.error("Error creating user profile:", error);
			// Don't throw error here as the auth was successful
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) return;

		setLoading(true);
		try {
			if (isLogin) {
				const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
				
				// Check if email is verified
				if (!userCredential.user.emailVerified) {
					// Sign out the user immediately
					await auth.signOut();
					setShowResendVerification(true);
					toast.error(
						"Please verify your email before logging in. Check your inbox for the verification link.",
						{
							duration: 6000,
						}
					);
					return;
				}
				
				toast.success("Welcome back!");
			} else {
				const userCredential = await createUserWithEmailAndPassword(
					auth,
					formData.email,
					formData.password
				);
				
				await updateProfile(userCredential.user, {
					displayName: formData.name,
				});
				
				// Send email verification
				await sendEmailVerification(userCredential.user, {
					url: `${window.location.origin}/${idRouter.userLogin}`, // Redirect back to login after verification
					handleCodeInApp: false,
				});
				
				// Sign out the user until they verify their email
				await auth.signOut();
				
				// Create Firestore user document (but mark as unverified)
				const tempUser = {
					...userCredential.user,
					emailVerified: false,
				};
				await createUserProfile(tempUser);
				
				toast.success(
					"Account created! Please check your email and click the verification link before logging in.",
					{
						duration: 8000,
					}
				);
				
				// Switch to login mode
				setIsLogin(true);
				setFormData({
					name: "",
					email: formData.email, // Keep email for convenience
					password: "",
					confirmPassword: "",
				});
				
				return; // Don't navigate to home
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
				case "auth/network-request-failed":
					errorMessage = "Network error. Please check your connection";
					break;
				default:
					errorMessage = error.message;
			}

			toast.error(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	// Resend verification email
	const handleResendVerification = async () => {
		if (!formData.email) {
			toast.error("Please enter your email address");
			return;
		}

		setLoading(true);
		try {
			// First try to sign in to get the user
			const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
			
			if (userCredential.user.emailVerified) {
				setShowResendVerification(false);
				await auth.signOut();
				return;
			}

			// Send verification email
			await sendEmailVerification(userCredential.user, {
				url: `${window.location.origin}/login`,
				handleCodeInApp: false,
			});
			
			// Sign out immediately
			await auth.signOut();
			
			toast.success("Verification email sent! Please check your inbox.");
			setShowResendVerification(false);
		} catch (error) {
			console.error("Resend verification error:", error);
			if (error.code === "auth/wrong-password") {
				toast.error("Incorrect password. Please enter the correct password to resend verification.");
			} else if (error.code === "auth/user-not-found") {
				toast.error("No account found with this email address.");
			} else {
				toast.error("Failed to resend verification email. Please try again.");
			}
		} finally {
			setLoading(false);
		}
	};

	const handleSocialLogin = async (provider) => {
		setLoading(true);
		try {
			let authProvider;
			switch (provider) {
				case "google":
					authProvider = new GoogleAuthProvider();
					// Add custom parameters for better UX and COOP compatibility
					authProvider.setCustomParameters({
						prompt: 'select_account',
						access_type: 'offline'
					});
					// Add scopes
					authProvider.addScope('email');
					authProvider.addScope('profile');
					break;
				case "facebook":
					authProvider = new FacebookAuthProvider();
					// Request additional permissions if needed
					authProvider.addScope('email');
					break;
				case "twitter":
					authProvider = new TwitterAuthProvider();
					break;
				default:
					throw new Error("Unknown provider");
			}

			// Try popup first, fallback to redirect if popup fails
			try {
				const result = await signInWithPopup(auth, authProvider);
				if (result && result.user) {
					const providerName = provider.charAt(0).toUpperCase() + provider.slice(1);
					
					// Create Firestore user document if it doesn't exist
					await createUserProfile(result.user);
					
					toast.success(`Welcome! Signed in with ${providerName}`);
					navigate("/");
				}
			} catch (popupError) {
				console.log("Popup failed, trying redirect:", popupError);
				
				// If popup fails due to COOP or other issues, try redirect
				if (
					popupError.code === "auth/popup-blocked" ||
					popupError.code === "auth/popup-closed-by-user" ||
					popupError.message.includes("Cross-Origin-Opener-Policy") ||
					popupError.message.includes("COOP")
				) {
					await signInWithRedirect(auth, authProvider);
					// The redirect will handle the rest, and useEffect will catch the result
					return;
				} else {
					// Re-throw other errors to be handled below
					throw popupError;
				}
			}
		} catch (error) {
			console.error(`${provider} login error:`, error);
			let errorMessage = `Failed to sign in with ${provider}`;

			switch (error.code) {
				case "auth/popup-closed-by-user":
					errorMessage = "Sign in was cancelled. Please try again.";
					break;
				case "auth/popup-blocked":
					errorMessage = "Popup was blocked by your browser. Trying redirect method...";
					break;
				case "auth/cancelled-popup-request":
					errorMessage = "Sign in was cancelled. Please try again.";
					break;
				case "auth/account-exists-with-different-credential":
					errorMessage = "An account already exists with the same email but different sign-in method. Please use your original sign-in method.";
					break;
				case "auth/operation-not-allowed":
					errorMessage = `${provider} sign in is not enabled. Please contact support.`;
					break;
				case "auth/too-many-requests":
					errorMessage = "Too many sign in attempts. Please try again later.";
					break;
				case "auth/network-request-failed":
					errorMessage = "Network error. Please check your connection and try again.";
					break;
				case "auth/unauthorized-domain":
					errorMessage = "This domain is not authorized for OAuth operations. Please contact support.";
					break;
				case "auth/web-storage-unsupported":
					errorMessage = "This browser doesn't support web storage or it's disabled.";
					break;
				default:
					if (error.message.includes("Cross-Origin-Opener-Policy") || error.message.includes("COOP")) {
						errorMessage = "Browser security settings are preventing Google login. Please try using email/password login or a different browser.";
					} else if (error.message.includes("popup")) {
						errorMessage = "Popup was blocked or closed. Please allow popups and try again.";
					} else {
						errorMessage = error.message || `Unknown error occurred during ${provider} sign in`;
					}
			}

			toast.error(errorMessage, { duration: 6000 });
		} finally {
			setLoading(false);
		}
	};

	const toggleMode = () => {
		setIsLogin(!isLogin);
		setShowResendVerification(false);
		setFormData({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
	};

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
					{/* Social Login Buttons */}
					<div className="space-y-3 mb-6">
						<button
							onClick={() => handleSocialLogin("google")}
							disabled={loading}
							className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 rounded-lg text-white hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
						>
							<svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
					<form onSubmit={handleSubmit} className="space-y-4">
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

					{/* Email Verification Message */}
					{showResendVerification && isLogin && (
						<div className="mt-4 p-4 bg-orange-900/20 border border-orange-500/30 rounded-lg">
							<div className="flex items-start">
								<div className="flex-shrink-0">
									<Mail className="h-5 w-5 text-orange-400 mt-0.5" />
								</div>
								<div className="ml-3 flex-1">
									<h3 className="text-sm font-medium text-orange-300">
										Email Verification Required
									</h3>
									<p className="mt-1 text-sm text-orange-200">
										Your email address needs to be verified before you can log in.
									</p>
									<div className="mt-3 flex space-x-3">
										<button
											onClick={handleResendVerification}
											disabled={loading || !formData.password}
											className="inline-flex items-center px-3 py-1.5 border border-orange-500 text-xs font-medium rounded text-orange-300 bg-orange-900/30 hover:bg-orange-900/50 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
										>
											{loading ? (
												<div className="animate-spin rounded-full h-3 w-3 border-b border-orange-300 mr-1"></div>
											) : null}
											Resend Verification Email
										</button>
										<button
											onClick={() => setShowResendVerification(false)}
											className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-gray-300"
										>
											Dismiss
										</button>
									</div>
									{!formData.password && (
										<p className="mt-2 text-xs text-orange-300">
											Please enter your password above to resend verification email.
										</p>
									)}
								</div>
							</div>
						</div>
					)}

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
						<Link to="/terms" className="text-green-400 hover:text-green-300">
							Terms of Service
						</Link>{" "}
						and{" "}
						<Link to="/privacy" className="text-green-400 hover:text-green-300">
							Privacy Policy
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default UserLogin;
