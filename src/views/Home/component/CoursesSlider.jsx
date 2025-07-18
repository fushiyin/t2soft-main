import React, { useState, useEffect } from "react";
import { CHANNEL_ID, PLAYLIST_IDs } from "@/constant/common";
import axios from "axios";
import LoadingSpinner from "@/components/Loading/LoadingSpinner.jsx";
import { auth } from "@/lib/firebase";
import FormLogin from "@/views/Login/FormLogin.jsx";

function CoursesSlider() {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [showLogin, setShowLogin] = useState(false);
	const [user, setUser] = useState(null);
	const [active, setActive] = useState(0);

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

	const handlePrev = () =>
		setActive((prev) => (prev === 0 ? mappedCourses.length - 1 : prev - 1));
	const handleNext = () =>
		setActive((prev) => (prev === mappedCourses.length - 1 ? 0 : prev + 1));

	return (
		<section className="w-full h-[80vh] flex items-center justify-center bg-white">
			<div className="w-full mx-auto flex flex-col md:flex-row overflow-hidden h-full">
				{/* Left Info Panel */}
				<div className="md:w-2/5 w-full bg-teal-800/95 text-white flex flex-col justify-center items-center relative">
					<div className="w-full">
						<h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight">
							PREMIUM <span className="text-5xl align-top font-extrabold">7</span>
						</h2>
						<p className="text-lg font-light mb-8">
							업계최초 프리미엄 7선정
							<br />
							최고의 가치를 선사합니다
						</p>
						<div className="flex gap-3 mt-8">
							<button
								onClick={handlePrev}
								className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${active === 0 ? "opacity-50" : "hover:bg-white hover:text-teal-800"} transition`}
							>
								&lt;
							</button>
							<button
								onClick={handleNext}
								className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center ${active === mappedCourses.length - 1 ? "opacity-50" : "hover:bg-white hover:text-teal-800"} transition`}
							>
								&gt;
							</button>
						</div>
						{/* Dots */}
						<div className="flex gap-2 mt-6 justify-center">
							{mappedCourses.slice(0, 3).map((_, idx) => (
								<span
									key={idx}
									className={`w-3 h-3 rounded-full border-2 border-white ${active === idx ? "bg-white" : "bg-transparent"}`}
								></span>
							))}
						</div>
					</div>
				</div>
				{/* Right Cards Panel */}
				<div className="md:w-3/5 w-full bg-white flex items-center justify-center px-2 py-10 md:py-0 absolute md:relative top-0 left-0">
					<div className="flex gap-4 w-full max-w-3xl justify-center items-center">
						{/* Left Card */}
						{mappedCourses[active - 1] && (
							<div className="w-56 h-72 bg-gray-100 rounded-xl shadow-md flex flex-col items-center justify-center p-4 opacity-80 scale-95 z-0 transition-all duration-300">
								<img
									src={mappedCourses[active - 1].thumbnail}
									alt=""
									className="w-14 h-14 object-cover rounded-full mb-3"
								/>
								<div className="text-teal-700 font-semibold mb-1 text-xs">
									PREMIUM 0{active}
								</div>
								<div className="text-gray-700 text-sm font-bold mb-1 line-clamp-2 text-center">
									{mappedCourses[active - 1].title}
								</div>
								<div className="text-gray-500 text-xs text-center line-clamp-2">
									{mappedCourses[active - 1].description}
								</div>
							</div>
						)}
						{/* Center Card */}
						{mappedCourses[active] && (
							<div className="w-80 h-96 bg-teal-900 rounded-2xl shadow-2xl flex flex-col items-center justify-center p-8 z-10 border-4 border-white scale-105 transition-all duration-300">
								<img
									src={mappedCourses[active].thumbnail}
									alt=""
									className="w-20 h-20 object-cover rounded-full mb-6 border-4 border-white"
								/>
								<div className="text-white font-bold mb-2 text-lg">
									PREMIUM 0{active + 1}
								</div>
								<div className="text-white text-xl font-extrabold mb-3 text-center line-clamp-2">
									{mappedCourses[active].title}
								</div>
								<div className="text-teal-100 text-base text-center mb-4 line-clamp-3">
									{mappedCourses[active].description}
								</div>
								<button className="mt-auto bg-white text-teal-900 font-bold px-6 py-2 rounded shadow hover:bg-teal-100 transition">
									View Course
								</button>
							</div>
						)}
						{/* Right Card */}
						{mappedCourses[active + 1] && (
							<div className="w-56 h-72 bg-gray-100 rounded-xl shadow-md flex flex-col items-center justify-center p-4 opacity-80 scale-95 z-0 transition-all duration-300">
								<img
									src={mappedCourses[active + 1].thumbnail}
									alt=""
									className="w-14 h-14 object-cover rounded-full mb-3"
								/>
								<div className="text-teal-700 font-semibold mb-1 text-xs">
									PREMIUM 0{active + 2}
								</div>
								<div className="text-gray-700 text-sm font-bold mb-1 line-clamp-2 text-center">
									{mappedCourses[active + 1].title}
								</div>
								<div className="text-gray-500 text-xs text-center line-clamp-2">
									{mappedCourses[active + 1].description}
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			{loading && <LoadingSpinner />}
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
		</section>
	);
}

export default CoursesSlider;
