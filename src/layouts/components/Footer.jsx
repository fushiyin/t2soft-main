import React from "react";
import { Link } from "react-router-dom";
import { TrendingUp, Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
	return (
		<footer className="bg-gray-900 border-t border-gray-800">
			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8">
					{/* Company Info */}
					<div className="space-y-4">
						<Link
							to="/"
							className="flex items-center space-x-2"
						>
							<div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
								<TrendingUp className="h-6 w-6 text-white" />
							</div>
							<span className="text-xl font-bold text-white">TradeMaster</span>
						</Link>
						<p className="text-gray-400 text-sm">
							Master the art of trading with our comprehensive courses and expert
							guidance.
						</p>
						<div className="flex space-x-4">
							<Facebook className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
							<Twitter className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
							<Instagram className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
							<Linkedin className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
							<Youtube className="h-5 w-5 text-gray-400 hover:text-green-400 cursor-pointer transition-colors" />
						</div>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-white">Quick Links</h3>
						<ul className="space-y-2">
							<li>
								<Link
									to="/courses"
									className="text-gray-400 hover:text-green-400 transition-colors"
								>
									Courses
								</Link>
							</li>
							<li>
								<Link
									to="/blog"
									className="text-gray-400 hover:text-green-400 transition-colors"
								>
									Blog
								</Link>
							</li>
							<li>
								<Link
									to="/about"
									className="text-gray-400 hover:text-green-400 transition-colors"
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to="/contact"
									className="text-gray-400 hover:text-green-400 transition-colors"
								>
									Contact
								</Link>
							</li>
						</ul>
					</div>

					{/* Support */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-white">Support</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-green-400 transition-colors"
								>
									Help Center
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-green-400 transition-colors"
								>
									Terms of Service
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-green-400 transition-colors"
								>
									Privacy Policy
								</a>
							</li>
							<li>
								<a
									href="#"
									className="text-gray-400 hover:text-green-400 transition-colors"
								>
									FAQ
								</a>
							</li>
						</ul>
					</div>

					{/* Newsletter */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold text-white">Stay Updated</h3>
						<p className="text-gray-400 text-sm">
							Subscribe to our newsletter for the latest trading insights.
						</p>
						<div className="flex flex-col space-y-2">
							<input
								type="email"
								placeholder="Enter your email"
								className="bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
							/>
							<button className="bg-green-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-green-300 transition-colors">
								Subscribe
							</button>
						</div>
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
					<p>&copy; 2024 TradeMaster. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
