import React, { useState, useEffect } from "react";
import { Play, Clock, Users, Star, ArrowRight, ExternalLink } from "lucide-react";
import LoadingSpinner from "@/components/Loading/LoadingSpinner.jsx";
import { PLAYLIST_IDs } from "@/constant/common";
import classNames from "classnames";
import { fetchPlaylists } from "@/lib/api";

const MyCourses = () => {
	const [courses, setCourses] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		fetchCourses();
	}, []);

	const fetchCourses = async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await fetchPlaylists(PLAYLIST_IDs, 1);
			const validPlaylists = res.data.filter(
				(p) => p.data && p.data.items && p.data.items.length > 0,
			);
			const mapped = validPlaylists.map((playlist) => {
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
					level: "All Levels",
				};
			});
			setCourses(mapped);
		} catch (e) {
			console.error("Failed to fetch courses:", e);
			setError("Failed to fetch courses.");
			setCourses([]);
		} finally {
			setLoading(false);
		}
	};

	const openPlaylist = (playlistId) => {
		window.open(`https://www.youtube.com/playlist?list=${playlistId}`, "_blank");
	};

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	if (loading) {
		return (
			<section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
				<div className="container mx-auto px-4">
					<LoadingSpinner />
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
				<div className="container mx-auto px-4 text-center">
					<p className="text-red-600 text-lg">{error}</p>
				</div>
			</section>
		);
	}

	return (
		// <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
		<section className="py-16 bg-white relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%234f46e5 fill-opacity=0.1%3E%3Ccircle cx=7 cy=7 r=5/%3E%3Ccircle cx=53 cy=7 r=5/%3E%3Ccircle cx=7 cy=53 r=5/%3E%3Ccircle cx=53 cy=53 r=5/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">KHÓA HỌC</h2>
					<div className="h-2 w-14 mx-auto bg-gradient-to-r from-green-400 to-blue-500"></div>
				</div>

				{/* Courses Grid */}
				<div className="grid grid-cols-1 gap-20 mb-12">
					{courses.map((course, index) => (
						<div
							key={course.id}
							className={classNames(
								"group grid md:grid-cols-2 bg-white/5 overflow-hidden transition hover:scale-[1.01] duration-300 cursor-pointer",
								index % 2 !== 0 &&
									"md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1",
							)}
							onClick={() => openPlaylist(course.id)}
						>
							{/* Thumbnail */}
							<div className="relative h-100 overflow-hidden">
								<img
									src={course.thumbnail}
									alt={course.title}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
									<Play className="w-16 h-16 text-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
								</div>

								{/* Video Count Badge */}
								<div className="absolute top-4 right-4 bg-black bg-opacity-80 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
									{course.videoCount} videos
								</div>

								{/* Level Badge */}
								<div className="absolute top-4 left-4 bg-green-500 text-gray-900 px-3 py-1 rounded-full text-sm font-medium">
									{course.level}
								</div>
							</div>

							{/* Content */}
							<div className="px-6 flex flex-col items-center justify-center h-full">
								<div>
									<h3 className="text-4xl text-center font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-500 transition-colors">
										{course.title}
									</h3>
									{/* <p className="text-gray-100 text-xl mb-4 line-clamp-3">
										{course.description}
									</p> */}
									<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
										<div className="flex items-center gap-1">
											<Clock className="w-4 h-4" />
											<span>{formatDate(course.publishedAt)}</span>
										</div>
									</div>
								</div>

								<div className="flex items-center justify-center">
									<button
										className="w-fit bg-green-500 text-gray-900 p-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 group-hover:scale-105"
										onClick={(e) => {
											e.stopPropagation();
											openPlaylist(course.id);
										}}
									>
										<span>XEM THÊM</span>
										<ExternalLink className="w-4 h-4" />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center">
					<button
						className="inline-flex items-center gap-3 bg-white text-green-500 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200 group"
						onClick={() => (window.location.href = "/courses")}
					>
						<span>Xem Tất Cả</span>
						<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default MyCourses;
