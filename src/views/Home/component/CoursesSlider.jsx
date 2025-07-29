import React, { useState, useEffect, useRef } from "react";
import { CHANNEL_ID, PLAYLIST_IDs } from "@/constant/common";
import LoadingSpinner from "@/components/Loading/LoadingSpinner.jsx";
import { auth } from "@/lib/firebase";
import FormLogin from "@/views/Login/FormLogin.jsx";
import { fetchPlaylists } from "@/lib/api";
import MobileCourseSlider from "./MobileCourseSlider.jsx";
import TabletCourseSlider from "./TabletCourseSlider.jsx";
import DesktopCourseSlider from "./DesktopCourseSlider.jsx";

function CoursesSlider() {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showLogin, setShowLogin] = useState(false);
	const [user, setUser] = useState(null);
	const [active, setActive] = useState(0);
	const [slideDirection, setSlideDirection] = useState(null);
	const [isAnimating, setIsAnimating] = useState(false);
	const touchStartX = useRef(null);
	const touchEndX = useRef(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
		return () => unsubscribe();
	}, []);

	const fetchCourses = async () => {
		setLoading(true);
		try {
			const res = await fetchPlaylists(PLAYLIST_IDs, 1);

			if (res && res.data && Array.isArray(res.data)) {
				const validPlaylists = res.data.filter(
					(p) => p && p.data && p.data.items && p.data.items.length > 0,
				);

				if (validPlaylists.length > 0) {
					setCourses(validPlaylists);
					console.log("YouTube API data loaded successfully");
					return;
				}
			}

			throw new Error("No valid playlist data received");
		} catch (error) {
			console.warn("YouTube API failed, falling back to mock data:", error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCourses();
	}, []);

	const mappedCourses = courses.map((playlist) => {
		const item = playlist.data.items[0];
		const snippet = item.snippet;
		return {
			id: playlist.playlistId,
			title: snippet.title,
			description: snippet.description,
			thumbnail:
				snippet.thumbnails?.maxres?.url ||
				snippet.thumbnails?.high?.url ||
				snippet.thumbnails?.medium?.url ||
				snippet.thumbnails?.default?.url,
			videoCount: playlist.data.pageInfo?.totalResults || playlist.data.items.length,
			channelTitle: snippet.channelTitle,
			publishedAt: snippet.publishedAt,
			viewCount: null,
			level: "All Levels",
		};
	});

	const handlePrev = () => {
		if (isAnimating) return;
		setSlideDirection("left");
		setIsAnimating(true);
		setTimeout(() => {
			setActive((prev) => (prev === 0 ? mappedCourses.length - 1 : prev - 1));
			setIsAnimating(false);
		}, 350);
	};
	const handleNext = () => {
		if (isAnimating) return;
		setSlideDirection("right");
		setIsAnimating(true);
		setTimeout(() => {
			setActive((prev) => (prev === mappedCourses.length - 1 ? 0 : prev + 1));
			setIsAnimating(false);
		}, 350);
	};

	// Touch/swipe handlers
	const handleTouchStart = (e) => {
		touchStartX.current = e.touches[0].clientX;
	};
	const handleTouchMove = (e) => {
		touchEndX.current = e.touches[0].clientX;
	};
	const handleTouchEnd = () => {
		if (touchStartX.current !== null && touchEndX.current !== null) {
			const diff = touchStartX.current - touchEndX.current;
			if (Math.abs(diff) > 50) {
				if (diff > 0) {
					handleNext();
				} else {
					handlePrev();
				}
			}
		}
		touchStartX.current = null;
		touchEndX.current = null;
	};

	return (
		<section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 relative overflow-hidden">
			{/* Enhanced Animated Background */}
			<div className="absolute inset-0">
				{/* Primary gradient overlay */}
				<div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/10 to-teal-900/20"></div>

				{/* Animated orbs with better colors */}
				<div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-600/15 to-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
				<div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
				<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-teal-600/12 to-blue-600/12 rounded-full blur-3xl animate-pulse delay-500"></div>

				{/* Additional subtle orbs */}
				<div className="absolute top-10 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-600/8 to-blue-500/8 rounded-full blur-2xl animate-pulse delay-700"></div>
				<div className="absolute bottom-10 left-1/3 w-48 h-48 bg-gradient-to-r from-teal-600/10 to-cyan-600/10 rounded-full blur-2xl animate-pulse delay-300"></div>

				{/* Subtle grid pattern */}
				<div className="absolute inset-0 opacity-5">
					<div
						className="absolute inset-0"
						style={{
							backgroundImage:
								"radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
							backgroundSize: "50px 50px",
						}}
					></div>
				</div>
			</div>

			<div className="relative z-10 container mx-auto px-4 md:px-6 py-8 md:py-12 min-h-screen flex flex-col">
				{/* Responsive Header Section */}
				<div className="text-center mb-8 md:mb-16">
					<div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4 md:mb-6 shadow-xl">
						<svg
							className="w-8 h-8 md:w-10 md:h-10 text-white"
							fill="currentColor"
							viewBox="0 0 20 20"
						>
							<path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
						</svg>
					</div>
					<h1 className="text-4xl md:text-5xl lg:text-7xl font-black mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
						Khóa học
					</h1>
				</div>

				{/* Responsive Main Content Area */}
				<div className="flex-1 flex items-center justify-center">
					{mappedCourses.length === 0 && !loading ? (
						<div className="text-center text-white/70 py-12 md:py-20">
							<div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 md:mb-6 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg">
								<svg
									className="w-10 h-10 md:w-12 md:h-12"
									fill="currentColor"
									viewBox="0 0 20 20"
								>
									<path
										fillRule="evenodd"
										d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
										clipRule="evenodd"
									/>
								</svg>
							</div>
							<h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-gray-200">
								No Courses Available
							</h3>
							<p className="text-base md:text-lg text-gray-300">
								Please try again later.
							</p>
						</div>
					) : (
						<>
							{/* Mobile Layout - sm and below */}
							<div className="block md:hidden w-full">
								<MobileCourseSlider
									courses={mappedCourses}
									active={active}
									setActive={setActive}
									handlePrev={handlePrev}
									handleNext={handleNext}
									isAnimating={isAnimating}
									slideDirection={slideDirection}
									handleTouchStart={handleTouchStart}
									handleTouchMove={handleTouchMove}
									handleTouchEnd={handleTouchEnd}
								/>
							</div>

							{/* Tablet Layout - md to lg */}
							<div className="hidden md:block lg:hidden w-full">
								<TabletCourseSlider
									courses={mappedCourses}
									active={active}
									setActive={setActive}
									handlePrev={handlePrev}
									handleNext={handleNext}
									isAnimating={isAnimating}
									slideDirection={slideDirection}
									handleTouchStart={handleTouchStart}
									handleTouchMove={handleTouchMove}
									handleTouchEnd={handleTouchEnd}
								/>
							</div>

							{/* Desktop Layout - lg and above */}
							<div className="hidden lg:block w-full">
								<DesktopCourseSlider
									courses={mappedCourses}
									active={active}
									setActive={setActive}
									handlePrev={handlePrev}
									handleNext={handleNext}
									isAnimating={isAnimating}
									slideDirection={slideDirection}
									handleTouchStart={handleTouchStart}
									handleTouchMove={handleTouchMove}
									handleTouchEnd={handleTouchEnd}
								/>
							</div>
						</>
					)}
				</div>
			</div>

			{loading && (
				<div className="absolute inset-0 bg-gray-900/90 backdrop-blur-sm z-30 flex items-center justify-center">
					<LoadingSpinner />
				</div>
			)}

			{showLogin && (
				<div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-3xl p-0 max-w-lg w-full shadow-2xl relative overflow-hidden transform transition-all duration-300 scale-100">
						<button
							className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 z-10 w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
							onClick={() => setShowLogin(false)}
						>
							<svg
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						<FormLogin />
					</div>
				</div>
			)}
		</section>
	);
}

export default CoursesSlider;
