import React, { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import GoogleLogin from "@/components/auth/GoogleLogin";
import { ArrowLeft } from "lucide-react";

const Login = () => {
	const { user } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	useEffect(() => {
		if (user) {
			navigate(from, { replace: true });
		}
	}, [user, navigate, from]);

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center p-4">
			{/* Background Elements */}
			<div className="absolute inset-0">
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-cyan-900/20"></div>
				<div className="absolute top-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
				<div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl"></div>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="relative w-full max-w-md"
			>
				{/* Back Button */}
				<button
					onClick={() => navigate("/")}
					className="absolute -top-16 left-0 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
				>
					<ArrowLeft className="w-5 h-5" />
					<span>Quay lại trang chủ</span>
				</button>

				{/* Login Card */}
				<div className="bg-gray-800/80 backdrop-blur-xl rounded-2xl p-8 border border-gray-700 shadow-2xl">
					{/* Header */}
					<div className="text-center mb-8">
						<h1 className="text-3xl font-bold text-white mb-2">
							Chào mừng trở lại
						</h1>
						<p className="text-gray-400">
							Đăng nhập để tiếp tục với TradeMaster
						</p>
					</div>

					{/* Google Login */}
					<div className="space-y-4">
						<GoogleLogin />

						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-gray-600"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-gray-800 text-gray-400">hoặc</span>
							</div>
						</div>

						{/* Email Login Placeholder */}
						<button
							disabled
							className="w-full bg-gray-700/50 text-gray-500 rounded-xl px-6 py-3 cursor-not-allowed"
						>
							Đăng nhập với Email (Sắp ra mắt)
						</button>
					</div>

					{/* Footer */}
					<div className="mt-8 text-center text-sm text-gray-500">
						Bằng việc đăng nhập, bạn đồng ý với{" "}
						<a
							href="#"
							className="text-blue-400 hover:underline"
						>
							Điều khoản dịch vụ
						</a>{" "}
						và{" "}
						<a
							href="#"
							className="text-blue-400 hover:underline"
						>
							Chính sách bảo mật
						</a>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default Login;
