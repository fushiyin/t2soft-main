import React, { useEffect, useState } from "react";
import tradingVideo from "@/assets/video/trading.mp4";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaPlay } from "react-icons/fa";

const YOUTUBE_API_KEY = "AIzaSyCWALP3sa9w3zAVnTC_dfbxOEtrbNJPRhA";
const CHANNEL_ID = "UCC-Kp74w4KD6_jl7umkFgzQ";
const MAX_RESULTS = 10;

export default function VideoIntro() {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchVideos() {
			try {
				const res = await fetch(
					`https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`,
				);
				const data = await res.json();
				const videoItems = (data.items || []).filter(
					(item) => item.id.kind === "youtube#video",
				);
				setVideos(videoItems);
			} catch (e) {
				setVideos([]);
				console.error("Failed to fetch YouTube videos:", e);
			} finally {
				setLoading(false);
			}
		}
		fetchVideos();
	}, []);

	return (
		<section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-12 md:py-20">
			<div
				className="absolute top-0 left-0 w-full h-1/4 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(180deg, rgba(15,23,42,0.95) 60%, rgba(15,23,42,0) 100%)",
					filter: "blur(8px)",
				}}
			/>
			<div
				className="absolute bottom-0 left-0 w-full h-1/4 z-10 pointer-events-none"
				style={{
					background:
						"linear-gradient(0deg, rgba(15,23,42,0.95) 60%, rgba(15,23,42,0) 100%)",
					filter: "blur(8px)",
				}}
			/>
			<div className="relative z-20 w-full max-w-6xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center rounded-3xl backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl p-4 md:p-12 animate-fade-in">
					<div className="flex items-center justify-center w-full h-full">
						<div className="relative w-full aspect-video rounded-2xl bg-gradient-to-br from-[var(--accent)] via-blue-500 to-purple-500 p-1 shadow-xl">
							<div className="rounded-xl bg-black overflow-hidden group">
								<video
									src={tradingVideo}
									autoPlay
									loop
									muted
									playsInline
									className="rounded-xl w-full h-full object-cover shadow-2xl border-4 border-white/10"
									style={{ background: "#000" }}
								/>
								<span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
									<span className="bg-black/60 rounded-full p-4">
										<FaPlay className="text-white text-3xl" />
									</span>
								</span>
							</div>
						</div>
					</div>
					<div className="flex flex-col items-center md:items-start justify-center w-full h-full px-2 md:px-0">
						<h1 className="text-white font-extrabold text-3xl md:text-5xl lg:text-6xl mb-4 text-center md:text-left tracking-tight drop-shadow-lg leading-tight">
							Where the world does{" "}
							<span className="text-[var(--accent)]">markets</span>
						</h1>
						<p className="text-white/90 text-lg md:text-2xl mb-6 max-w-xl text-center md:text-left font-medium">
							Join 100 million traders and investors taking the future into their own
							hands.
						</p>
						<button className="bg-gradient-to-r from-[var(--accent)] to-blue-500 text-white text-lg font-bold rounded-xl px-8 py-3 shadow-lg hover:from-blue-500 hover:to-[var(--accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 mb-3">
							Explore features
						</button>
						<div className="text-white text-base opacity-80 text-center md:text-left">
							$0 forever, no credit card needed
						</div>
					</div>
				</div>
				<div className="w-full flex justify-center my-12">
					<div className="h-1 w-2/3 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-40 rounded-full" />
				</div>
				<div className="w-full mx-auto">
					<h2 className="text-white text-2xl font-bold mb-6 text-left pl-2 flex items-center gap-2">
						<svg
							className="w-6 h-6 text-red-500"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M10 17l6-5-6-5v10z" />
						</svg>
						Latest Videos
					</h2>
					{loading ? (
						<div className="text-white">Loading latest videos...</div>
					) : videos.length > 0 ? (
						<>
							<Swiper
								modules={[Navigation, Pagination]}
								slidesPerView={3}
								spaceBetween={32}
								navigation
								pagination={{ clickable: true }}
								breakpoints={{
									320: { slidesPerView: 1 },
									640: { slidesPerView: 2 },
									1024: { slidesPerView: 3 },
								}}
								className="youtube-slider"
							>
								{videos.map((video) => (
									<SwiperSlide key={video.id.videoId}>
										<a
											href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
											target="_blank"
											rel="noopener noreferrer"
											className="group block bg-gradient-to-br from-[#181c24] to-[#23272f] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-white/10"
										>
											<div className="relative w-full aspect-video flex items-center justify-center bg-black">
												<img
													src={
														video.snippet.thumbnails.high.url ||
														video.snippet.thumbnails.medium.url
													}
													alt={video.snippet.title}
													className="w-full h-full object-contain bg-black"
													style={{
														background: "#000",
														display: "block",
														margin: "0 auto",
													}}
												/>
												<span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
													<span className="bg-black/60 rounded-full p-3">
														<FaPlay className="text-white text-xl" />
													</span>
												</span>
											</div>
											<div className="p-4">
												<div className="text-white text-base font-semibold line-clamp-2 min-h-[3em] mb-2">
													{video.snippet.title}
												</div>
												<div className="text-gray-400 text-xs">
													{new Date(
														video.snippet.publishedAt,
													).toLocaleDateString()}
												</div>
											</div>
										</a>
									</SwiperSlide>
								))}
							</Swiper>
							<div className="flex justify-center mt-8">
								<a
									href="https://www.youtube.com/@Tradingneoakathehung"
									target="_blank"
									rel="noopener noreferrer"
									className="bg-gradient-to-r from-[var(--accent)] to-blue-500 text-white font-bold rounded-xl px-8 py-3 shadow-lg hover:from-blue-500 hover:to-[var(--accent)] transition focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
								>
									Xem thêm Video
								</a>
							</div>
						</>
					) : (
						<div className="text-white">No videos found.</div>
					)}
				</div>
			</div>
		</section>
	);
}
