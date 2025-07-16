import React from "react";
import { FaMapMarkerAlt, FaRulerCombined, FaClock } from "react-icons/fa";

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
    
    description:
      "A luxury residential project with smart automation and eco-friendly design.",
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
  <div className="w-full min-h-screen flex flex-col items-center justify-start py-12 relative overflow-x-hidden px-2 bg-[#07090e]">
    {/* Section Header */}
    <div className="mb-8 text-center z-10">
      <div className="flex flex-col items-center mb-2">
        <div className="w-8 h-1 bg-cyan-500 rounded mb-2" />
        <span className="text-cyan-400 text-xs tracking-widest uppercase font-mono">Recent Projects</span>
      </div>
      <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
        Our <span className="text-cyan-400">High-Tech Projects</span>
      </h2>
    </div>
    {/* Main Sharp Container with Cards */}
    <div className="relative w-full max-w-3xl mx-auto rounded-xl bg-[#131926] border-2 border-cyan-700 shadow-[0_8px_40px_0_rgba(0,255,255,0.15)] p-6 md:p-10 flex flex-col items-center">
      {/* Cards Row */}
      <div className="flex flex-col md:flex-row gap-6 w-full relative z-10">
        {projects.map((project, i) => (
          <div key={i} className="flex-1 min-w-0">
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </div>
    {/* View All Projects Button */}
    <div className="mt-10 flex justify-center">
      <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-10 py-3 rounded shadow-xl transition-all text-lg tracking-wide border-2 border-cyan-700 hover:border-orange-400">
        View All Projects
      </button>
    </div>
  </div>
);

export default MyCourses; 