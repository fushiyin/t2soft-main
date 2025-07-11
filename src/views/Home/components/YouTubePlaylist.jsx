import React, { useEffect, useState } from "react";

const DEFAULT_PLAYLIST_ID = "PLsGBXDsQw_r4hwYSS27PqLR4M3lgFs2RE";
const YOUTUBE_API_KEY = "AIzaSyBaTM7Gh3iXcqfDRpxSwbT92o3jVhcMDQg";
const CHANNEL_ID = "UCC-Kp74w4KD6_jl7umkFgzQ";
const MAX_RESULTS = 6;

export default function YouTubePlaylist() {
	const [videos, setVideos] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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
				setError("Failed to fetch YouTube videos.");
				console.error("Failed to fetch YouTube videos:", e);
			} finally {
				setLoading(false);
			}
		}
		fetchVideos();
	}, []);

	return (
		<section className="w-full flex flex-col items-center justify-center py-6 md:py-10 bg-gradient-to-b from-black/70 via-black/30 to-transparent relative z-30 -mt-12 md:-mt-20">
			<h2 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-wide">
				YouTube Playlist
			</h2>
			<div className="w-full max-w-4xl px-2 md:px-0">
				{loading ? (
					<div className="flex items-center justify-center h-40">
						<p className="text-white/80 animate-pulse">Loading videos...</p>
					</div>
				) : error ? (
					<div className="flex items-center justify-center h-40">
						<p className="text-red-400">{error}</p>
					</div>
				) : videos.length > 0 ? (
					<div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto no-scrollbar pb-2">
						{videos.map((video) => (
							<a
								href={`https://www.youtube.com/watch?v=${video.id.videoId}`}
								target="_blank"
								rel="noopener noreferrer"
								key={video.id.videoId}
								className="group flex-shrink-0 w-[85vw] xs:w-64 md:w-auto aspect-video rounded-xl overflow-hidden bg-black/80 border border-white/10 shadow-lg hover:shadow-2xl transition-shadow duration-300 hover:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
							>
								<div className="relative w-full h-full">
									<img
										src={
											video.snippet.thumbnails.high.url ||
											video.snippet.thumbnails.medium.url
										}
										alt={video.snippet.title}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<span className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
										<svg
											className="w-14 h-14 text-white/90 drop-shadow-lg"
											fill="currentColor"
											viewBox="0 0 24 24"
										>
											<path d="M10 17l6-5-6-5v10z" />
										</svg>
									</span>
								</div>
								<div className="p-3 bg-black/70">
									<div className="text-white font-semibold text-base line-clamp-2 mb-1">
										{video.snippet.title}
									</div>
									<div className="text-xs text-gray-300">
										{new Date(video.snippet.publishedAt).toLocaleDateString()}
									</div>
								</div>
							</a>
						))}
					</div>
				) : (
					<div className="text-center text-gray-400 py-8">
						<p>No videos available at the moment.</p>
					</div>
				)}
			</div>
		</section>
	);
}
