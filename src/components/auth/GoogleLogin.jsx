import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const GoogleLogin = () => {
	const [loading, setLoading] = useState(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleGoogleLogin = async () => {
		setLoading(true);
		try {
			// Check if Firebase is properly configured
			if (!auth.app.options.projectId) {
				throw new Error("Firebase project not configured properly");
			}

			const provider = new GoogleAuthProvider();
			provider.addScope("email");
			provider.addScope("profile");

			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			const userData = {
				id: user.uid,
				name: user.displayName,
				email: user.email,
				avatar: user.photoURL,
				provider: "google",
				emailVerified: user.emailVerified,
			};

			login(userData);
			navigate("/");
		} catch (error) {
			console.error("Google login error:", error);
			if (error.code === "auth/configuration-not-found") {
				alert("Cấu hình Firebase chưa đúng. Vui lòng liên hệ quản trị viên.");
			} else {
				alert("Đăng nhập thất bại. Vui lòng thử lại.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<motion.button
			onClick={handleGoogleLogin}
			disabled={loading}
			className="w-full flex items-center justify-center space-x-3 bg-white border border-gray-300 rounded-xl px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			{loading ? (
				<div className="w-5 h-5 border-2 border-gray-300 border-t-gray-700 rounded-full animate-spin" />
			) : (
				<svg
					className="w-5 h-5"
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
			)}
			<span>{loading ? "Đang đăng nhập..." : "Đăng nhập với Google"}</span>
		</motion.button>
	);
};

export default GoogleLogin;
