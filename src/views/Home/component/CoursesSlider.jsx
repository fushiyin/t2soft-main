import React, { useState, useEffect } from "react";
import { Search, User } from "lucide-react";
import { CHANNEL_ID, PLAYLIST_IDs } from "@/constant/common";
import axios from "axios";
import LoadingSpinner from "@/components/Loading/LoadingSpinner.jsx";
import CourseCard from "@/components/cards/CourseCard.jsx";
import { auth } from "@/lib/firebase";
import FormLogin from "@/views/Login/FormLogin.jsx";

function App() {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showLogin, setShowLogin] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((u) => setUser(u));
		return () => unsubscribe();
	}, []);

	const fetchCourses = async () => {
		try {
			const res = await axios.post("/api/youtube/playlists", {
				playlistIds: PLAYLIST_IDs,
				maxResults: 1,
			});
			const validPlaylists = res.data.filter(
				(p) => p.data && p.data.items && p.data.items.length > 0,
			);
			setCourses(validPlaylists);
		} catch (e) {
			console.error("Error fetching courses:", e);
			setCourses([]);
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
			thumbnail: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url,
			videoCount: playlist.data.pageInfo?.totalResults || playlist.data.items.length,
			channelTitle: snippet.channelTitle,
			publishedAt: snippet.publishedAt,
			viewCount: null,
			level: "All Levels",
		};
	});

	const totalVideos = mappedCourses.reduce((sum, course) => sum + (course.videoCount || 0), 0);

	const handleSubscribe = () => {
		if (!user) {
			setShowLogin(true);
			return;
		}
		window.open(`https://www.youtube.com/channel/${CHANNEL_ID}/subscribe`, "_blank");
	};

	return (
		<div className="min-h-screen bg-gray-50 text-gray-900">
			{/* Hero section */}
			<section className="bg-white border-b border-gray-200">
				<div className="max-w-7xl mx-auto px-8 py-20">
					<div className="flex items-start space-x-8">
						<div className="w-2 h-20 bg-gray-900"></div>
						<div className="flex-1">
							<h1 className="text-6xl font-bold tracking-tight text-gray-900 mb-8 leading-tight font-mono">
								YOUTUBE
								<br />
								<span className="text-gray-600">COURSES</span>
							</h1>
							<p className="text-xl text-gray-600 leading-relaxed max-w-2xl font-mono">
								Curated YouTube playlists for professional development. Learn from
								industry experts with hands-on video content.
							</p>

							{/* Stats */}
							<div className="flex items-center space-x-12 mt-12">
								<div className="text-center">
									<div className="text-3xl font-bold text-gray-900 font-mono mb-2">
										{loading ? "..." : courses.length}
									</div>
									<div className="text-sm text-gray-500 font-mono tracking-wider">
										PLAYLISTS
									</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold text-gray-900 font-mono mb-2">
										{loading ? "..." : totalVideos}
									</div>
									<div className="text-sm text-gray-500 font-mono tracking-wider">
										VIDEOS
									</div>
								</div>
								<div className="text-center">
									<div className="text-3xl font-bold text-gray-900 font-mono mb-2">
										FREE
									</div>
									<div className="text-sm text-gray-500 font-mono tracking-wider">
										ACCESS
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Main content */}
			<section className="max-w-7xl mx-auto px-8 py-16">
				{loading && <LoadingSpinner />}

				{!loading && (
					<>
						{/* Course grid */}
						{mappedCourses.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
								{mappedCourses.map((course, index) => (
									<CourseCard
										key={course.id}
										course={course}
										index={index}
									/>
								))}
							</div>
						) : (
							!loading && (
								<div className="text-center py-16">
									<div className="text-xl font-mono text-gray-500 mb-4">
										NO COURSES FOUND
									</div>
									<p className="text-gray-400 font-mono">
										Try adjusting your search terms
									</p>
								</div>
							)
						)}
					</>
				)}
			</section>
			{/* CTA section */}
			<section className="text-center">
				<div className="bg-gray-900 text-white p-16 relative overflow-hidden">
					<div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500"></div>

					<div className="relative z-10 max-w-3xl mx-auto">
						<h2 className="text-4xl font-bold mb-6 font-mono">START LEARNING TODAY</h2>
						<p className="text-xl text-gray-300 mb-10 leading-relaxed font-mono">
							Access curated YouTube content from industry experts. All courses are
							free and available immediately.
						</p>

						<div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
							<button
								onClick={handleSubscribe}
								className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg bg-[#ff0000] text-white shadow-lg hover:bg-[#e60000] transition-all border-0"
							>
								<svg
									viewBox="0 0 24 24"
									fill="currentColor"
									className="w-6 h-6"
								>
									<path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.946C18.2 6 12 6 12 6s-6.2 0-7.86.055A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 2 12a28.6 28.6 0 0 0 .2 3.999 2.75 2.75 0 0 0 1.94 1.946C5.8 18 12 18 12 18s6.2 0 7.86-.055a2.75 2.75 0 0 0 1.94-1.946A28.6 28.6 0 0 0 22 12a28.6 28.6 0 0 0-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z" />
								</svg>
								SUBSCRIBE
							</button>
						</div>
						{showLogin && (
							<div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
								<div className="bg-white rounded-xl p-0 max-w-lg w-full shadow-2xl relative overflow-hidden">
									<button
										className="absolute top-4 right-4 text-gray-400 hover:text-black z-10"
										onClick={() => setShowLogin(false)}
									>
										&times;
									</button>
									<FormLogin />
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
		</div>
	);
}

export default App;
