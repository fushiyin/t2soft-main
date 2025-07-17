import React from "react";
import { Play, Clock, Users, Calendar, ExternalLink } from "lucide-react";

const CourseCard = ({ course, index }) => {
	const accentColors = ["bg-emerald-500", "bg-blue-500", "bg-violet-500", "bg-amber-500"];

	const bgColors = ["bg-emerald-50", "bg-blue-50", "bg-violet-50", "bg-amber-50"];

	const colorIndex = index % accentColors.length;

	const formatDate = (dateString) => {
		return new Date(dateString).toLocaleDateString("en-US", {
			year: "numeric",
			month: "short",
		});
	};

	const openPlaylist = () => {
		window.open(`https://www.youtube.com/playlist?list=${course.id}`, "_blank");
	};

	return (
		<div
			className="group relative bg-white border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-xl cursor-pointer"
			onClick={openPlaylist}
		>
			{/* Accent line */}
			<div className={`absolute top-0 left-0 w-full h-1 ${accentColors[colorIndex]}`}></div>

			{/* Background accent */}
			<div
				className={`absolute top-0 right-0 w-32 h-32 ${bgColors[colorIndex]} opacity-20`}
			></div>

			{/* Thumbnail */}
			<div className="relative h-48 overflow-hidden bg-gray-100">
				<img
					src={course.thumbnail}
					alt={course.title}
					className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
					<Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
				</div>

				{/* Video count badge */}
				<div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white px-3 py-1 text-sm font-mono">
					{course.videoCount} videos
				</div>
			</div>

			{/* Card content */}
			<div className="relative p-6">
				{/* Channel and date */}
				<div className="flex items-center justify-end mb-4">
					{/* <div className="text-sm font-mono text-gray-600 tracking-wider">
						{course.channelTitle}
					</div> */}
					<div className="flex items-center space-x-1 text-sm text-gray-500">
						<Calendar className="w-4 h-4" />
						<span className="font-mono">{formatDate(course.publishedAt)}</span>
					</div>
				</div>

				{/* Title */}
				<h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-gray-700 transition-colors line-clamp-2">
					{course.title}
				</h3>

				{/* Description */}
				{/* <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
					{course.description}
				</p> */}

				{/* Stats */}
				{/* <div className="grid grid-cols-2 gap-6 text-sm mb-8">
					<div className="text-center">
						<div className="font-bold text-gray-900 text-lg mb-1 font-mono">
							{course.duration || "N/A"}
						</div>
						<div className="text-gray-500 font-mono tracking-wide">DURATION</div>
					</div>
					<div className="text-center">
						<div className="font-bold text-gray-900 text-lg mb-1 font-mono">
							{formatViewCount(course.viewCount)}
						</div>
						<div className="text-gray-500 font-mono tracking-wide">VIEWS</div>
					</div>
				</div> */}

				{/* Footer */}
				<div className="flex items-center justify-between pt-6 border-t border-gray-100">
					<div className="text-sm font-mono text-gray-600 tracking-wider">
						{course.level || "ALL LEVELS"}
					</div>
					<button
						className="flex items-center space-x-3 px-6 py-3 bg-gray-900 text-white hover:bg-gray-800 transition-all duration-200 group"
						onClick={(e) => {
							e.stopPropagation();
							openPlaylist();
						}}
					>
						<span className="font-mono font-medium">WATCH</span>
						<ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
