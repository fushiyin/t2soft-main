import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, TrendingUp, User, LogIn, LogOut, Settings } from "lucide-react";
import { useTranslation } from "react-i18next";
import { AuthContext } from "@/contexts/AuthContext";
import { toast } from "react-hot-toast";

const LANGUAGES = [
	{ code: "en", label: "EN" },
	{ code: "vi", label: "VI" },
	{ code: "ko", label: "KO" },
];

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const location = useLocation();
	const { i18n, t } = useTranslation();
	const [langDropdown, setLangDropdown] = useState(false);
	const { user, userProfile, logout, isAdmin } = useContext(AuthContext);
	const [userDropdown, setUserDropdown] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ name: t("menu.home", "Home"), path: "/" },
		{ name: t("menu.courses", "Courses"), path: "/courses" },
		{ name: t("menu.blog", "Blog"), path: "/blog" },
		{ name: t("menu.documents", "Documents"), path: "/document" },
		{ name: t("menu.about", "About"), path: "/about" },
		{ name: t("menu.contact", "Contact"), path: "/contact" },
		{ name: t("menu.forum", "Forum"), path: "/forum" },
	];

	const isActive = (path) => location.pathname === path;

	const handleChangeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		localStorage.setItem("language", lng);
		setLangDropdown(false);
	};

	const handleLogout = async () => {
		try {
			await logout();
			setUserDropdown(false);
		} catch (error) {
			console.error("Logout error:", error);
			toast.error("Failed to logout");
		}
	};

	return (
		<header
			className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
				scrolled || location.pathname !== "/"
					? "bg-[#070e20] shadow-lg backdrop-blur-md"
					: "bg-transparent"
			}`}
		>
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<Link
						to="/"
						className="flex items-center space-x-2"
					>
						<div className="bg-gradient-to-r from-green-400 to-blue-500 p-2 rounded-lg">
							<TrendingUp className="h-6 w-6 text-white" />
						</div>
						<span className="text-xl font-bold text-white">TradeMaster</span>
					</Link>

					<nav className="hidden lg:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.name}
								to={item.path}
								className={`text-sm font-medium transition-colors duration-200 ${
									isActive(item.path)
										? "text-green-400"
										: "text-gray-300 hover:text-white"
								}`}
							>
								{item.name}
							</Link>
						))}
					</nav>

					<div className="hidden lg:flex items-center space-x-4">
						{/* User Authentication */}
						{user ? (
							<div className="relative">
								<button
									className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
									onClick={() => setUserDropdown(!userDropdown)}
								>
									<User className="h-5 w-5" />
									<span className="text-sm font-medium">
										{user.displayName || user.email?.split("@")[0] || "User"}
									</span>
								</button>
								{userDropdown && (
									<div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
										<div className="p-3 border-b border-gray-700">
											<p className="text-white font-medium truncate">
												{user.displayName || "User"}
											</p>
											<p className="text-gray-400 text-sm truncate">
												{user.email}
											</p>
											{userProfile?.role && (
												<p className="text-blue-400 text-xs uppercase tracking-wide mt-1">
													{userProfile.role}
												</p>
											)}
										</div>
										<div className="py-1">
											{isAdmin && (
												<Link
													to="/admin"
													onClick={() => setUserDropdown(false)}
													className="w-full text-left px-4 py-2 text-sm text-blue-400 hover:bg-gray-700 transition-colors duration-150 flex items-center"
												>
													<Settings className="h-4 w-4 mr-2" />
													Admin Dashboard
												</Link>
											)}
											<button
												onClick={handleLogout}
												className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700 transition-colors duration-150 flex items-center"
											>
												<LogOut className="h-4 w-4 mr-2" />
												Sign Out
											</button>
										</div>
									</div>
								)}
							</div>
						) : (
							<Link
								to="/user-login"
								className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
							>
								<LogIn className="h-5 w-5" />
								<span className="text-sm font-medium">Sign In</span>
							</Link>
						)}
						
						{/* Language Switcher */}
						<div className="relative">
							<button
								className="flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
								onClick={() => setLangDropdown((v) => !v)}
								aria-label="Change language"
							>
								<span className="mr-2">
									{LANGUAGES.find((l) => l.code === i18n.language)?.label || "EN"}
								</span>
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							{langDropdown && (
								<div className="absolute right-0 mt-2 w-28 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
									{LANGUAGES.map((lang) => (
										<button
											key={lang.code}
											onClick={() => handleChangeLanguage(lang.code)}
											className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-150 ${i18n.language === lang.code ? "text-green-400" : "text-white"}`}
										>
											{lang.label}
										</button>
									))}
								</div>
							)}
						</div>
					</div>

					<button
						className="lg:hidden text-white"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
					</button>
				</div>

				{isMenuOpen && (
					<nav className="md:hidden mt-4 pt-4 border-t border-gray-800">
						{navItems.map((item) => (
							<Link
								key={item.name}
								to={item.path}
								className={`block py-2 text-sm font-medium transition-colors duration-200 ${
									isActive(item.path)
										? "text-green-400"
										: "text-gray-300 hover:text-white"
								}`}
								onClick={() => setIsMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
						<div className="mt-4 pt-4 border-t border-gray-800 space-y-2">
							{/* User Authentication for mobile */}
							{user ? (
								<div className="space-y-2">
									<div className="px-4 py-2 border-b border-gray-700">
										<p className="text-white font-medium truncate">
											{user.displayName || "User"}
										</p>
										<p className="text-gray-400 text-sm truncate">
											{user.email}
										</p>
									</div>
									<button
										onClick={handleLogout}
										className="w-full text-left text-red-400 hover:text-red-300 transition-colors duration-200 flex items-center px-4 py-2"
									>
										<LogOut className="h-4 w-4 mr-2" />
										Sign Out
									</button>
								</div>
							) : (
								<Link
									to="/user-login"
									className="block text-gray-300 hover:text-white transition-colors duration-200"
									onClick={() => setIsMenuOpen(false)}
								>
									<div className="flex items-center">
										<LogIn className="h-4 w-4 mr-2" />
										Sign In
									</div>
								</Link>
							)}
							
							{/* Language Switcher for mobile */}
							<div className="relative">
								<button
									className="w-full flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors duration-200 focus:outline-none"
									onClick={() => setLangDropdown((v) => !v)}
									aria-label="Change language"
								>
									<span className="mr-2">
										{LANGUAGES.find((l) => l.code === i18n.language)?.label ||
											"EN"}
									</span>
									<svg
										className="w-4 h-4"
										fill="none"
										stroke="currentColor"
										strokeWidth="2"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M19 9l-7 7-7-7"
										/>
									</svg>
								</button>
								{langDropdown && (
									<div className="absolute right-0 mt-2 w-28 bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-50">
										{LANGUAGES.map((lang) => (
											<button
												key={lang.code}
												onClick={() => handleChangeLanguage(lang.code)}
												className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-150 ${i18n.language === lang.code ? "text-green-400" : "text-white"}`}
											>
												{lang.label}
											</button>
										))}
									</div>
								)}
							</div>
						</div>
					</nav>
				)}
			</div>
		</header>
	);
};

export default Header;
