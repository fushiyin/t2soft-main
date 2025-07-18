import React from "react";
import { FaMapMarkerAlt, FaRulerCombined, FaClock } from "react-icons/fa";
import InfinityHorizontalScroll from "./InfinityHorizontalScroll";

const projects = [
	{
		title: "The Business Hub",
		description:
			"A next-gen workspace for modern businesses, blending architecture and technology.",
		image: "/path/to/business-hub.jpg", // Replace with your image path
		location: "New York, USA",
		area: "11,000 sqm",
		duration: "5Y, 3M",
		tags: ["2024-2026", "General Construction"],
	},
	{
		title: "Sky Haven",

		description: "A luxury residential project with smart automation and eco-friendly design.",
		image: "/path/to/sky-haven.jpg",
		location: "San Francisco, USA",
		area: "10,000 sqm",
		duration: "1Y, 2M",
		tags: ["2024-2026", "Smart Living"],
	},
];

const ProjectCard = ({ project }) => (
	<div className="relative flex flex-col md:flex-row bg-[#10131a] border border-cyan-500/60 rounded-lg shadow-2xl overflow-hidden min-w-0 w-full h-full transition-all duration-300 group">
		{/* Image with overlay tags */}
		<div className="relative md:w-56 w-full h-40 md:h-auto flex-shrink-0 z-10">
			<img
				src={project.image}
				alt={project.title}
				className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
			/>
			<div className="absolute bottom-2 left-2 flex gap-2 z-20">
				{project.tags.map((tag, i) => (
					<span
						key={i}
						className="bg-cyan-600 text-black text-xs font-bold uppercase rounded px-2 py-0.5 border border-cyan-400 shadow-sm"
					>
						{tag}
					</span>
				))}
			</div>
		</div>
		{/* Info */}
		<div className="flex flex-col justify-between p-5 md:w-auto w-full z-10">
			<div>
				<h3 className="text-lg font-extrabold text-white mb-1 tracking-wide">
					{project.title}
				</h3>
				<p className="text-cyan-200 text-xs mb-3 font-medium leading-relaxed">
					{project.description}
				</p>
				<ul className="space-y-1">
					<li className="flex items-center gap-2 text-cyan-300 text-xs">
						<FaMapMarkerAlt className="text-orange-400" />
						<span>{project.location}</span>
					</li>
					<li className="flex items-center gap-2 text-cyan-300 text-xs">
						<FaRulerCombined className="text-orange-400" />
						<span>Total Area: {project.area}</span>
					</li>
					<li className="flex items-center gap-2 text-cyan-300 text-xs">
						<FaClock className="text-orange-400" />
						<span>Duration: {project.duration}</span>
					</li>
				</ul>
			</div>
		</div>
	</div>
);

const MyCourses = () => (
	<section className="relative w-full min-h-screen flex flex-col items-center justify-start py-20 bg-[#0a0c12] overflow-x-hidden">
		{/* Aurora Animated Background */}
		<div className="aurora-bg" />
		{/* Section Header */}
		<div className="mb-12 text-center z-10">
			<h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
				<span className="text-cyan-400">Explore</span> Our Projects
			</h2>
			<p className="text-lg text-cyan-200 max-w-2xl mx-auto font-mono">
				Futuristic, technical, and minimal. Swipe to discover our latest work.
			</p>
		</div>
		{/* Horizontal Infinite Scroll of Project Cards */}
		<div className="w-full max-w-[90vw] relative z-10">
			<InfinityHorizontalScroll height={340} scrollSpeed={35000}>
				{projects.map((project, i) => (
					<div
						key={i}
						className="w-80 h-[320px] mx-4 flex-shrink-0 bg-white/10 backdrop-blur-lg border-2 border-cyan-500/40 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl hover:border-cyan-400 transition-all duration-300 group relative overflow-hidden"
					>
						{/* Neon border accent */}
						<div className="absolute -inset-1 rounded-2xl pointer-events-none z-0 bg-gradient-to-br from-cyan-400/30 via-transparent to-violet-500/20 blur-xl opacity-60 group-hover:opacity-90 transition-all" />
						{/* Image */}
						<div className="h-36 w-full overflow-hidden rounded-t-2xl relative">
							<img
								src={project.image}
								alt={project.title}
								className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
							/>
							<div className="absolute bottom-2 left-2 flex gap-2 z-10">
								{project.tags.map((tag, i) => (
									<span
										key={i}
										className="bg-cyan-600/80 text-black text-xs font-bold uppercase rounded px-2 py-0.5 border border-cyan-400 shadow-sm"
									>
										{tag}
									</span>
								))}
							</div>
						</div>
						{/* Info */}
						<div className="flex flex-col justify-between p-5 h-[calc(100%-9rem)] z-10 relative">
							<h3 className="text-lg font-extrabold text-white mb-1 tracking-wide line-clamp-1">
								{project.title}
							</h3>
							<p className="text-cyan-200 text-xs mb-3 font-medium leading-relaxed line-clamp-2">
								{project.description}
							</p>
							<ul className="space-y-1 mb-2">
								<li className="flex items-center gap-2 text-cyan-300 text-xs">
									<FaMapMarkerAlt className="text-orange-400" />
									<span>{project.location}</span>
								</li>
								<li className="flex items-center gap-2 text-cyan-300 text-xs">
									<FaRulerCombined className="text-orange-400" />
									<span>Total Area: {project.area}</span>
								</li>
								<li className="flex items-center gap-2 text-cyan-300 text-xs">
									<FaClock className="text-orange-400" />
									<span>Duration: {project.duration}</span>
								</li>
							</ul>
							<button className="mt-auto bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-2 rounded shadow-lg transition-all text-sm tracking-wide border-2 border-cyan-700 hover:border-orange-400">
								View Project
							</button>
						</div>
					</div>
				))}
			</InfinityHorizontalScroll>
		</div>
	</section>
);

export default MyCourses;

