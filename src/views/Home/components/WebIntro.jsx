import React from "react";
import heroVideo from "@/assets/video/hero.mp4";

const WebIntro = () => {
    return (
        <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <video
                className="absolute inset-0 w-full h-full object-cover z-0"
                src={heroVideo}
                autoPlay
                loop
                muted
                playsInline
            />
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black/70 z-10" />
            {/* Content with Glassmorphism */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full">
                <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl shadow-xl px-8 py-10 sm:px-16 sm:py-16 max-w-4xl w-full flex flex-col items-center">
                    {/* ĐỪNG */}
                    <div className="uppercase font-extrabold text-center leading-none text-white tracking-tight text-6xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-lg fade-in-up fade-in-up-delay-1">
                        ĐỪNG
                    </div>
                    {/* MÃI MÃI */}
                    <div className="italic font-semibold text-center mt-3 bg-gradient-to-r from-cyan-400 via-blue-400 to-yellow-300 bg-clip-text text-transparent text-3xl sm:text-5xl md:text-6xl lg:text-7xl animated-gradient fade-in-up fade-in-up-delay-2">
                        MÃI MÃI
                    </div>
                    {/* làm TRADER */}
                    <div className="flex flex-row items-end justify-center mt-4 fade-in-up fade-in-up-delay-3">
                        <span className="text-center font-medium text-white text-2xl sm:text-3xl md:text-4xl mr-3">
                            làm
                        </span>
                        <span className="uppercase font-extrabold bg-gradient-to-r from-orange-500 via-yellow-400 to-yellow-300 bg-clip-text text-transparent text-5xl sm:text-7xl md:text-8xl lg:text-9xl drop-shadow-lg animated-gradient">
                            TRADER
                        </span>
                    </div>
                </div>
            </div>
            <div className="absolute left-0 bottom-0 w-full h-32 pointer-events-none z-30 bg-gradient-to-b from-transparent to-[#01070c]" />
        </section>
    );
};

export default WebIntro; 