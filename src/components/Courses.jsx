import React, { useState, useEffect } from "react";
import { Play, Clock, Users, Star, ArrowRight, ExternalLink } from "lucide-react";
import axios from "axios";
import LoadingSpinner from "@/components/Loading/LoadingSpinner.jsx";
import { PLAYLIST_IDs } from "@/constant/common";

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
		<section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%234f46e5" fill-opacity="0.1"%3E%3Ccircle cx="7" cy="7" r="5"/%3E%3Ccircle cx="53" cy="7" r="5"/%3E%3Ccircle cx="7" cy="53" r="5"/%3E%3Ccircle cx="53" cy="53" r="5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
			</div>

			<div className="container mx-auto px-4 relative z-10">
				{/* Header */}
				<div className="text-center mb-16">
					<h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
						Featured Courses
					</h2>
					<p className="text-xl text-gray-600 max-w-3xl mx-auto">
						Discover our curated collection of trading courses from YouTube, designed to help you master the markets
					</p>
				</div>

				{/* Courses Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
					{courses.map((course, index) => (
						<div
							key={course.id}
							className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 cursor-pointer"
							onClick={() => openPlaylist(course.id)}
						>
							{/* Thumbnail */}
							<div className="relative h-48 overflow-hidden">
								<img
									src={course.thumbnail}
									alt={course.title}
									className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
								/>
								<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
									<Play className="w-16 h-16 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
								</div>
								
								{/* Video Count Badge */}
								<div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white px-3 py-1 rounded-full text-sm font-medium">
									{course.videoCount} videos
								</div>

								{/* Level Badge */}
								<div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
									{course.level}
								</div>
							</div>

							{/* Content */}
							<div className="p-6">
								{/* Title */}
								<h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
									{course.title}
								</h3>

								{/* Description */}
								<p className="text-gray-600 text-sm mb-4 line-clamp-3">
									{course.description}
								</p>

								{/* Stats */}
								<div className="flex items-center justify-between text-sm text-gray-500 mb-4">
									<div className="flex items-center gap-1">
										<Clock className="w-4 h-4" />
										<span>{formatDate(course.publishedAt)}</span>
									</div>
									<div className="flex items-center gap-1">
										<Star className="w-4 h-4 text-yellow-400 fill-current" />
										<span>4.8</span>
									</div>
								</div>

								{/* Action Button */}
								<button
									className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 group-hover:scale-105"
									onClick={(e) => {
										e.stopPropagation();
										openPlaylist(course.id);
									}}
								>
									<span>Watch Course</span>
									<ExternalLink className="w-4 h-4" />
								</button>
							</div>
						</div>
					))}
				</div>

				{/* View All Courses Button */}
				<div className="text-center">
					<button 
						className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-blue-100 hover:border-blue-200 group"
						onClick={() => window.location.href = '/courses'}
					>
						<span>View All Courses</span>
						<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default Courses;