import React, { useState, useEffect } from "react";
import { Play, Clock, Users, Star, ArrowRight, ExternalLink } from "lucide-react";
import axios from "axios";
import LoadingSpinner from "@/components/Loading/LoadingSpinner.jsx";
import { PLAYLIST_IDs } from "@/constant/common";
import classNames from "classnames";

const Courses = () => {
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
			const res = await axios.post("/api/youtube/playlists", {
				playlistIds: PLAYLIST_IDs,
				maxResults: 1,
			});
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
			<section className="py-20 bg-gray-900">
				<div className="container mx-auto px-4">
					<LoadingSpinner />
				</div>
			</section>
		);
	}

	if (error) {
		return (
			<section className="py-20 bg-gray-900">
				<div className="container mx-auto px-4 text-center">
					<p className="text-red-400 text-lg">{error}</p>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 bg-gray-900 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-10">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%2310b981 fill-opacity=0.1%3E%3Ccircle cx=7 cy=7 r=5/%3E%3Ccircle cx=53 cy=7 r=5/%3E%3Ccircle cx=7 cy=53 r=5/%3E%3Ccircle cx=53 cy=53 r=5/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
			</div>

			{/* Gradient overlay */}
			<div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-90"></div>

			<div className="container mx-auto px-4 relative z-10">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
						KHÓA HỌC
					</h2>
					<div className="h-1 w-20 mx-auto bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-6"></div>
					<p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
						Khám phá bộ sưu tập khóa học giao dịch được tuyển chọn từ YouTube, được thiết kế để giúp bạn làm chủ thị trường
					</p>
				</div>

				{/* Courses Grid */}
				<div className="space-y-16 mb-16">
					{courses.map((course, index) => (
						<div
							key={course.id}
							className={classNames(
								"group grid md:grid-cols-2 gap-8 items-center transition-all duration-500 cursor-pointer",
								index % 2 !== 0 && "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
							)}
							onClick={() => openPlaylist(course.id)}
						>
							{/* Thumbnail */}
							<div className="relative h-80 md:h-96 overflow-hidden rounded-2xl shadow-2xl">
								<img
									src={course.thumbnail}
									alt={course.title}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
								/>
								<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
								<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
									<div className="transform scale-75 group-hover:scale-100 transition-transform duration-300">
										<Play className="w-20 h-20 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-2xl" />
									</div>
								</div>

								{/* Video Count Badge */}
								<div className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold">
									{course.videoCount} videos
								</div>

								{/* Level Badge */}
								<div className="absolute top-6 left-6 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
									{course.level}
								</div>
							</div>

							{/* Content */}
							<div className="space-y-6 p-2">
								{/* Title */}
								<h3 className="text-2xl md:text-3xl font-bold text-white mb-4 line-clamp-2 group-hover:text-green-400 transition-colors duration-300 leading-tight">
									{course.title}
								</h3>

								{/* Description */}
								<p className="text-gray-300 text-lg mb-6 line-clamp-4 leading-relaxed">
									{course.description}
								</p>

								{/* Stats */}
								<div className="flex items-center gap-6 text-gray-400 mb-8">
									<div className="flex items-center gap-2">
										<Clock className="w-5 h-5" />
										<span className="text-sm">{formatDate(course.publishedAt)}</span>
									</div>
									<div className="flex items-center gap-2">
										<Star className="w-5 h-5 text-yellow-400 fill-current" />
										<span className="text-sm">4.8</span>
									</div>
								</div>

								{/* Action Button */}
								<button
									className="group/btn bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
									onClick={(e) => {
										e.stopPropagation();
										openPlaylist(course.id);
									}}
								>
									<span>XEM KHÓA HỌC</span>
									<ExternalLink className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
								</button>
							</div>
						</div>
					))}
				</div>

				{/* View All Courses Button */}
				<div className="text-center">
					<button 
						className="inline-flex items-center gap-3 bg-gradient-to-r from-white to-gray-100 text-gray-900 px-10 py-5 rounded-full font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 border-2 border-white/20 hover:border-green-400/50 group transform hover:scale-105"
						onClick={() => window.location.href = '/courses'}
					>
						<span>XEM TẤT CẢ KHÓA HỌC</span>
						<ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Courses;