import React from "react";
import { Link } from "react-router-dom";
import {
	Code,
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
	Youtube,
	Mail,
	Phone,
	MapPin,
	ArrowUp,
} from "lucide-react";

const Footer = () => {
	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<footer className="relative bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 border-t border-white/20 overflow-hidden">
			{/* Background Elements */}
			<div className="absolute inset-0">
				{/* Geometric pattern background */}
				<div className="absolute inset-0 opacity-10">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage: `
								linear-gradient(45deg, transparent 40%, rgba(59, 130, 246, 0.1) 50%, transparent 60%),
								linear-gradient(-45deg, transparent 40%, rgba(168, 85, 247, 0.1) 50%, transparent 60%)
							`,
							backgroundSize: "60px 60px",
						}}
					></div>
				</div>

				{/* Subtle gradient orbs */}
				<div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/8 to-cyan-500/8 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-pink-500/8 rounded-full blur-3xl"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-emerald-500/6 to-teal-500/6 rounded-full blur-2xl"></div>
			</div>

			<div className="relative z-10 container mx-auto px-6 py-16">
				{/* Main Footer Content */}
				<div className="w-full">
					{/* Company Info */}
					<div className="lg:col-span-2 space-y-6 flex flex-col items-center">
						<Link
							to="/"
							className="flex items-center space-x-3 group"
						>
							<div className="bg-gradient-to-r from-green-400 to-blue-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
								<Code className="h-7 w-7 text-white" />
							</div>
						</Link>

						<p className="text-gray-300 text-lg leading-relaxed max-w-md uppercase">
							Đừng mãi mãi làm trader
						</p>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t grid w-full items-center justify-center border-white/10">
					<div className="flex flex-col md:flex-row w-full items-center justify-between space-y-6 md:space-y-0">
						{/* Social Links */}
						<div className="flex items-center space-x-4 w-full">
							<div className="flex items-center justify-center w-full space-x-3">
								{[
									{ Icon: Facebook, color: "hover:text-blue-500" },
									{ Icon: Twitter, color: "hover:text-cyan-400" },
									{ Icon: Instagram, color: "hover:text-pink-500" },
									{ Icon: Linkedin, color: "hover:text-blue-600" },
									{ Icon: Youtube, color: "hover:text-red-500" },
								].map(({ Icon, color }, index) => (
									<a
										key={index}
										href="#"
										className={`w-10 h-10 bg-white/10 backdrop-blur-md rounded-lg flex items-center justify-center text-gray-400 ${color} transition-all duration-300 hover:scale-110 hover:bg-white/20`}
									>
										<Icon className="h-5 w-5" />
									</a>
								))}
							</div>
						</div>
					</div>

					{/* Copyright */}
					<div className="mt-8 text-center">
						<div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-full px-6 py-3 border border-white/10">
							<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
							<p className="text-gray-300 text-sm">
								&copy; 2024{" "}
								<span className="font-semibold text-white">TradeMaster</span>. All
								rights reserved.
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
